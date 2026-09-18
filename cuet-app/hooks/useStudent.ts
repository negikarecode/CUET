"use client";

import { useState, useEffect, useCallback } from "react";
import { Student } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function useStudent() {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadStudent = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Check local storage for active student mock/cached profile
      const localProfile = typeof window !== "undefined" ? localStorage.getItem("cuet_student_profile") : null;
      if (localProfile) {
        setStudent(JSON.parse(localProfile));
        setIsLoading(false);
        return;
      }

      // 2. Fetch from API
      const res = await fetch("/api/auth");
      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          setStudent(data.student);
          if (typeof window !== "undefined") {
            localStorage.setItem("cuet_student_profile", JSON.stringify(data.student));
          }
        }
      }
    } catch (e) {
      console.warn("Could not load remote student session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const updateStudent = async (updatedFields: Partial<Student>) => {
    if (!student) return;
    const updated = { ...student, ...updatedFields };
    setStudent(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("cuet_student_profile", JSON.stringify(updated));
    }

    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } catch (e) {
      console.error("Failed to sync profile:", e);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    if (typeof window !== "undefined") {
      localStorage.removeItem("cuet_student_profile");
    }
    setStudent(null);
  };

  return {
    student,
    isLoading,
    updateStudent,
    logout,
    refreshStudent: loadStudent,
  };
}
