import { ClientConfig } from "pg";

/**
 * Portable PostgreSQL Connection Configuration for Integration Testing
 * Evaluates in order:
 * 1. TEST_DATABASE_URL
 * 2. PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE
 * 3. TEST_PG_HOST, TEST_PG_PORT, TEST_PG_USER, TEST_PG_PASSWORD, TEST_PG_DATABASE
 * 4. Local ephemeral unix socket / port 54338 fallback
 */
export function getPgTestConfig(): ClientConfig {
  if (process.env.TEST_DATABASE_URL) {
    return { connectionString: process.env.TEST_DATABASE_URL };
  }

  const host = process.env.PGHOST || process.env.TEST_PG_HOST;
  const port = process.env.PGPORT
    ? Number(process.env.PGPORT)
    : process.env.TEST_PG_PORT
    ? Number(process.env.TEST_PG_PORT)
    : undefined;
  const user = process.env.PGUSER || process.env.TEST_PG_USER;
  const password = process.env.PGPASSWORD || process.env.TEST_PG_PASSWORD;
  const database = process.env.PGDATABASE || process.env.TEST_PG_DATABASE;

  if (host || port || user || database) {
    return {
      host: host || "127.0.0.1",
      port: port || 5432,
      user: user || "postgres",
      password: password || undefined,
      database: database || "postgres",
    };
  }

  // Local ephemeral cluster fallback
  return {
    host: "/tmp",
    port: 54338,
    user: process.env.USER || "postgres",
    database: "postgres",
  };
}

export function formatPgUnavailableError(err: Error): Error {
  return new Error(
    `[PostgreSQL Test Database Unavailable]\n` +
    `Failed to connect to PostgreSQL test database: ${err.message}\n\n` +
    `SETUP INSTRUCTIONS FOR DISPOSABLE POSTGRESQL 16 TEST DATABASE:\n` +
    `  Option A (Docker):\n` +
    `    docker run --name cuet-pg-test -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:16\n` +
    `    export TEST_DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/postgres"\n\n` +
    `  Option B (Direct Environment Variables):\n` +
    `    export PGHOST=127.0.0.1\n` +
    `    export PGPORT=5432\n` +
    `    export PGUSER=postgres\n` +
    `    export PGPASSWORD=postgres\n` +
    `    export PGDATABASE=postgres\n`
  );
}
