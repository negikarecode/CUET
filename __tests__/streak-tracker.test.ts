import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getLocalDateString,
  getDaysBetweenCalendarDates,
  calculateStreakFromAttempts,
  calculateActiveStreak,
  calculateNextStreakOnPractice,
} from "../lib/gamification";

describe("Daily Practice Streak Tracking Logic", () => {
  describe("getLocalDateString", () => {
    it("formats dates as YYYY-MM-DD", () => {
      const d = new Date(2026, 9, 12);
      assert.equal(getLocalDateString(d), "2026-10-12");
    });
  });

  describe("getDaysBetweenCalendarDates", () => {
    it("returns 0 for the exact same date", () => {
      assert.equal(getDaysBetweenCalendarDates("2026-10-12", "2026-10-12"), 0);
    });

    it("returns 1 for consecutive calendar days", () => {
      assert.equal(getDaysBetweenCalendarDates("2026-10-11", "2026-10-12"), 1);
    });

    it("handles month boundary transitions accurately", () => {
      assert.equal(getDaysBetweenCalendarDates("2026-03-31", "2026-04-01"), 1);
      assert.equal(getDaysBetweenCalendarDates("2026-02-28", "2026-03-01"), 1);
    });

    it("handles leap year February boundaries", () => {
      assert.equal(getDaysBetweenCalendarDates("2024-02-28", "2024-02-29"), 1);
      assert.equal(getDaysBetweenCalendarDates("2024-02-29", "2024-03-01"), 1);
    });

    it("handles year boundary transitions", () => {
      assert.equal(getDaysBetweenCalendarDates("2025-12-31", "2026-01-01"), 1);
    });

    it("returns negative numbers if second date is in the past", () => {
      assert.equal(getDaysBetweenCalendarDates("2026-10-12", "2026-10-10"), -2);
    });
  });

  describe("calculateActiveStreak (Passive Dashboard / Profile view before practicing today)", () => {
    it("returns 0 if user has never practiced", () => {
      assert.equal(calculateActiveStreak(0, null, "2026-10-12"), 0);
      assert.equal(calculateActiveStreak(1, null, "2026-10-12"), 0);
    });

    it("maintains active streak if user already practiced today", () => {
      assert.equal(calculateActiveStreak(3, "2026-10-12", "2026-10-12"), 3);
    });

    it("maintains active streak if user practiced yesterday (awaiting today's session)", () => {
      assert.equal(calculateActiveStreak(5, "2026-10-11", "2026-10-12"), 5);
    });

    it("resets to 0 if 2 or more days have elapsed without practice", () => {
      assert.equal(calculateActiveStreak(10, "2026-10-10", "2026-10-12"), 0);
      assert.equal(calculateActiveStreak(4, "2026-10-05", "2026-10-12"), 0);
    });
  });

  describe("calculateNextStreakOnPractice (Active CBT Mock Test Submission)", () => {
    it("starts streak at 1 on user's first ever test", () => {
      assert.equal(calculateNextStreakOnPractice(0, null, "2026-10-12"), 1);
    });

    it("maintains current streak when practicing multiple times on the same calendar day", () => {
      // First test of the day: streak was 1, practiced today -> stays 1
      assert.equal(calculateNextStreakOnPractice(1, "2026-10-12", "2026-10-12"), 1);
      // Tenth test of the day: streak was 5, practiced today -> stays 5
      assert.equal(calculateNextStreakOnPractice(5, "2026-10-12", "2026-10-12"), 5);
    });

    it("increments streak by exactly 1 on consecutive calendar days", () => {
      // Practiced yesterday with streak 1 -> today becomes 2
      assert.equal(calculateNextStreakOnPractice(1, "2026-10-11", "2026-10-12"), 2);
      // Practiced yesterday with streak 6 -> today becomes 7
      assert.equal(calculateNextStreakOnPractice(6, "2026-10-11", "2026-10-12"), 7);
      // Consecutive across month boundary
      assert.equal(calculateNextStreakOnPractice(3, "2026-03-31", "2026-04-01"), 4);
    });

    it("resets streak to 1 when a day was missed (broken streak)", () => {
      // Practiced 2 days ago (missed yesterday) -> streak breaks, resets to 1
      assert.equal(calculateNextStreakOnPractice(15, "2026-10-10", "2026-10-12"), 1);
      // Practiced 7 days ago -> resets to 1
      assert.equal(calculateNextStreakOnPractice(30, "2026-10-05", "2026-10-12"), 1);
    });
  });

  describe("calculateStreakFromAttempts (Authoritative attempts history evaluation)", () => {
    it("returns 0 for empty attempt list", () => {
      assert.equal(calculateStreakFromAttempts([], "2026-10-12"), 0);
    });

    it("returns 1 for single attempt submitted today", () => {
      const attempts = [{ submittedAt: "2026-10-12T10:30:00Z" }];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 1);
    });

    it("deduplicates multiple attempts on the same calendar day to 1 day streak", () => {
      const attempts = [
        { submittedAt: "2026-10-12T08:00:00Z" },
        { submittedAt: "2026-10-12T12:00:00Z" },
        { submittedAt: "2026-10-12T18:30:00Z" },
      ];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 1);
    });

    it("correctly counts 3 consecutive calendar days", () => {
      const attempts = [
        { submittedAt: "2026-10-12T09:00:00Z" },
        { submittedAt: "2026-10-11T14:00:00Z" },
        { submittedAt: "2026-10-10T11:00:00Z" },
      ];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 3);
    });

    it("maintains active streak when last test was yesterday awaiting practice today", () => {
      const attempts = [
        { submittedAt: "2026-10-11T14:00:00Z" },
        { submittedAt: "2026-10-10T11:00:00Z" },
      ];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 2);
    });

    it("returns 0 if last test was 2 or more days ago", () => {
      const attempts = [
        { submittedAt: "2026-10-10T11:00:00Z" },
        { submittedAt: "2026-10-09T10:00:00Z" },
      ];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 0);
    });

    it("stops counting at the first missing day gap", () => {
      const attempts = [
        { submittedAt: "2026-10-12T10:00:00Z" }, // today
        { submittedAt: "2026-10-11T10:00:00Z" }, // yesterday (day 2)
        // 2026-10-10 was missed!
        { submittedAt: "2026-10-09T10:00:00Z" },
        { submittedAt: "2026-08-01T10:00:00Z" },
      ];
      assert.equal(calculateStreakFromAttempts(attempts, "2026-10-12"), 2);
    });
  });
});
