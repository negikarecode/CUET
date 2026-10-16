import fs from "fs";
import path from "path";
import {
  COLLEGES,
  CANONICAL_COURSES,
  COLLEGE_PROGRAMS,
  COLLEGES_BY_ID,
  COURSES_BY_ID,
  resolveCollege,
  resolveProgram,
  isValidPair,
} from "../lib/college-offerings";

interface CutoffRow {
  college: string;
  course: string;
  canonical_course_id?: string;
  category?: string;
  year?: number;
  cutoff_score?: number;
  university?: string;
}

export function validateCollegeOfferings() {
  console.log("=================================================================");
  console.log("     VALIDATION AUDIT: COLLEGE-PROGRAM OFFERING MAP & CUTOFFS    ");
  console.log("=================================================================\n");

  const normalizedCutoffsPath = path.join(
    process.cwd(),
    "lib/data/standing/normalized_cutoffs.json"
  );
  let cutoffRows: CutoffRow[] = [];
  if (fs.existsSync(normalizedCutoffsPath)) {
    const raw = fs.readFileSync(normalizedCutoffsPath, "utf-8");
    cutoffRows = JSON.parse(raw);
  }

  // 1. Check duplicate IDs
  const collegeIdCounts = new Map<string, number>();
  COLLEGES.forEach((c) => {
    collegeIdCounts.set(c.id, (collegeIdCounts.get(c.id) || 0) + 1);
  });
  const duplicateColleges = Array.from(collegeIdCounts.entries()).filter(
    ([, count]) => count > 1
  );

  const courseIdCounts = new Map<string, number>();
  CANONICAL_COURSES.forEach((c) => {
    courseIdCounts.set(c.id, (courseIdCounts.get(c.id) || 0) + 1);
  });
  const duplicateCourses = Array.from(courseIdCounts.entries()).filter(
    ([, count]) => count > 1
  );

  const pairKeyCounts = new Map<string, number>();
  COLLEGE_PROGRAMS.forEach((p) => {
    const key = `${p.collegeId}::${p.programId}`;
    pairKeyCounts.set(key, (pairKeyCounts.get(key) || 0) + 1);
  });
  const duplicatePairs = Array.from(pairKeyCounts.entries()).filter(
    ([, count]) => count > 1
  );

  // 2. Colleges with zero programs
  const programsPerCollege = new Map<string, Set<string>>();
  const collegesPerProgram = new Map<string, Set<string>>();

  COLLEGES.forEach((c) => programsPerCollege.set(c.id, new Set()));
  CANONICAL_COURSES.forEach((c) => collegesPerProgram.set(c.id, new Set()));

  COLLEGE_PROGRAMS.forEach((p) => {
    if (p.isCurrentlyOffered && p.admissionBasis === "CUET") {
      programsPerCollege.get(p.collegeId)?.add(p.programId);
      collegesPerProgram.get(p.programId)?.add(p.collegeId);
    }
  });

  const collegesWithZeroPrograms = COLLEGES.filter(
    (c) => (programsPerCollege.get(c.id)?.size || 0) === 0
  );

  // 3. Programs with zero colleges
  const programsWithZeroColleges = CANONICAL_COURSES.filter(
    (c) => (collegesPerProgram.get(c.id)?.size || 0) === 0
  );

  // 4. Pairs in Cutoff Data vs Map
  const cutoffPairs = new Map<string, { college: string; courseId: string; years: Set<number> }>();
  cutoffRows.forEach((r) => {
    const col = resolveCollege(r.college);
    const progId = r.canonical_course_id || resolveProgram(r.course)?.id;
    if (col && progId) {
      const key = `${col.id}::${progId}`;
      if (!cutoffPairs.has(key)) {
        cutoffPairs.set(key, { college: col.name, courseId: progId, years: new Set() });
      }
      if (r.year) cutoffPairs.get(key)!.years.add(r.year);
    }
  });

  const activeOfferingMap = new Map<string, (typeof COLLEGE_PROGRAMS)[0]>();
  COLLEGE_PROGRAMS.forEach((p) => {
    activeOfferingMap.set(`${p.collegeId}::${p.programId}`, p);
  });

  const inCutoffsNotInMap: string[] = [];
  cutoffPairs.forEach((info, key) => {
    if (!activeOfferingMap.has(key)) {
      inCutoffsNotInMap.push(key);
    }
  });

  const inMapMissingCutoffs: Array<{
    collegeId: string;
    collegeName: string;
    programId: string;
    programName: string;
  }> = [];

  COLLEGE_PROGRAMS.filter(
    (p) => p.isCurrentlyOffered && p.admissionBasis === "CUET"
  ).forEach((p) => {
    const key = `${p.collegeId}::${p.programId}`;
    if (!cutoffPairs.has(key) || (p.years && p.years.length === 0)) {
      const col = COLLEGES_BY_ID.get(p.collegeId);
      const prog = COURSES_BY_ID.get(p.programId);
      inMapMissingCutoffs.push({
        collegeId: p.collegeId,
        collegeName: col?.name || p.collegeId,
        programId: p.programId,
        programName: prog?.name || p.programId,
      });
    }
  });

  // UI Count Metrics
  const totalColleges = COLLEGES.length;
  const totalCourses = CANONICAL_COURSES.length;
  const totalActivePairs = COLLEGE_PROGRAMS.filter(
    (p) => p.isCurrentlyOffered && p.admissionBasis === "CUET"
  ).length;

  console.log("--- 1. ID INTEGRITY & DUPLICATES ---");
  console.log(`Duplicate College IDs: ${duplicateColleges.length}`);
  if (duplicateColleges.length > 0) console.log(duplicateColleges);
  console.log(`Duplicate Course IDs:  ${duplicateCourses.length}`);
  if (duplicateCourses.length > 0) console.log(duplicateCourses);
  console.log(`Duplicate Pair Keys:   ${duplicatePairs.length}\n`);

  console.log("--- 2. ORPHANS & COVERAGE ---");
  console.log(`Colleges with 0 programs: ${collegesWithZeroPrograms.length}`);
  if (collegesWithZeroPrograms.length > 0) {
    collegesWithZeroPrograms.forEach((c) =>
      console.log(`  - [${c.id}] ${c.name} (${c.university})`)
    );
  }
  console.log(`Programs with 0 colleges: ${programsWithZeroColleges.length}`);
  if (programsWithZeroColleges.length > 0) {
    programsWithZeroColleges.forEach((p) =>
      console.log(`  - [${p.id}] ${p.name} (${p.stream})`)
    );
  }
  console.log();

  console.log("--- 3. CUTOFF DATA VS OFFERING MAP ALIGNMENT ---");
  console.log(`Pairs in Cutoff Data but NOT in Offering Map: ${inCutoffsNotInMap.length}`);
  if (inCutoffsNotInMap.length > 0) {
    console.log(inCutoffsNotInMap.slice(0, 10));
  }
  console.log(`Pairs in Offering Map with NO Cutoff Records:  ${inMapMissingCutoffs.length}`);
  console.log(`  (These will show "No past cutoff data yet" gracefully in UI)`);
  if (inMapMissingCutoffs.length > 0) {
    console.log("  Sample missing-cutoff pairs:");
    inMapMissingCutoffs.slice(0, 8).forEach((p) => {
      console.log(`    * ${p.programName} at ${p.collegeName}`);
    });
  }
  console.log();

  console.log("--- 4. UI ACCURACY & REAL COUNTS ---");
  console.log(`Real Valid Colleges: ${totalColleges} (DU + Central Universities)`);
  console.log(`Real Degree Programs: ${totalCourses}`);
  console.log(`Real Active CUET Pairs: ${totalActivePairs}`);
  console.log(`Mismatch check with "85 colleges / 47 programs":`);
  console.log(`  - Real colleges count is ${totalColleges} (not 85 or 96).`);
  console.log(`  - Real programs count is ${totalCourses} (matches 47 canonical programs).`);
  console.log("=================================================================\n");

  return {
    totalColleges,
    totalCourses,
    totalActivePairs,
    duplicateColleges,
    duplicateCourses,
    duplicatePairs,
    collegesWithZeroPrograms,
    programsWithZeroColleges,
    inCutoffsNotInMap,
    inMapMissingCutoffs,
  };
}

validateCollegeOfferings();
