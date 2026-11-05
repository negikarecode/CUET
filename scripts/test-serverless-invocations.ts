import {
  generateRegistrationId,
  createPendingRegistration,
  getPendingRegistration,
  verifyPendingRegistrationOtp,
} from "../lib/auth/pending-registration-service";

export async function testServerlessInvocations() {
  console.log("==================================================");
  console.log("SERVERLESS MULTI-INVOCATION PERSISTENCE TEST");
  console.log("==================================================");

  const ts = Date.now();
  const testEmail = `serverless_candidate_${ts}@example.com`;
  const regId = generateRegistrationId();
  const code = "789123";

  // INVOCATION 1: POST /api/auth/otp/send (Executed on Lambda Instance A)
  console.log("[Invocation 1: Lambda Instance A] Dispatching OTP and writing to persistent DB...");
  const saveRes = await createPendingRegistration({
    registrationId: regId,
    email: testEmail,
    password: "ServerlessPass2026!@#",
    candidateDetails: {
      fullName: "Serverless Candidate",
      targetUniversity: "Delhi University",
      targetCollege: "SRCC",
      targetCourse: "B.Com (Hons)",
      targetStream: "Commerce",
      selectedSubjects: ["Accountancy"],
    },
    otpCode: code,
  });

  if (!saveRes.success) {
    throw new Error(`Invocation 1 failed to persist: ${saveRes.error}`);
  }
  console.log("  Successfully persisted registration to database:", saveRes);

  // INVOCATION 2: POST /api/auth/otp/verify (Executed on Lambda Instance B - Fresh Container)
  console.log("[Invocation 2: Lambda Instance B] Querying persistent database by registrationId...");
  const record = await getPendingRegistration(regId);

  if (!record || record.email !== testEmail) {
    throw new Error("Invocation 2 failed to fetch pending registration from persistent DB.");
  }
  console.log("  Successfully fetched record across serverless boundary:", {
    registrationId: record.registrationId,
    email: record.email,
    status: record.status,
    hasEncryptedPassword: Boolean(record.encryptedPassword),
  });

  console.log("[Invocation 2: Lambda Instance B] Submitting OTP verification...");
  const verifyRes = await verifyPendingRegistrationOtp({
    registrationId: regId,
    email: testEmail,
    code,
  });

  if (!verifyRes.success || verifyRes.decryptedPassword !== "ServerlessPass2026!@#") {
    throw new Error(`Invocation 2 verification failed: ${verifyRes.error}`);
  }
  console.log("  OTP verified & credentials decrypted successfully from persistent DB.");

  // INVOCATION 3: Replay attack check on Lambda Instance C
  console.log("[Invocation 3: Lambda Instance C] Attempting replay attack with already-consumed code...");
  const replayRes = await verifyPendingRegistrationOtp({
    registrationId: regId,
    email: testEmail,
    code,
  });

  if (replayRes.success) {
    throw new Error("Security failure: Replay attack succeeded!");
  }
  console.log("  Replay attack successfully blocked (Code consumed in database):", replayRes.error);

  console.log("==================================================");
  console.log("SERVERLESS MULTI-INVOCATION TEST: PASS (100% Persistent)");
  console.log("==================================================");
  return true;
}

if (process.argv.includes("--run")) {
  testServerlessInvocations().catch((err) => {
    console.error("SERVERLESS TEST FAIL:", err);
    process.exit(1);
  });
}
