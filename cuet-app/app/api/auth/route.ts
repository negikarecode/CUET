import { NextResponse } from "next/server";
import { AppDataStore } from "@/lib/data-store";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      student: AppDataStore.student,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch student session" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.email) {
      AppDataStore.student = {
        ...AppDataStore.student,
        ...body,
      };
    }
    return NextResponse.json({
      success: true,
      student: AppDataStore.student,
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: "Failed to update student session" },
      { status: 500 }
    );
  }
}
