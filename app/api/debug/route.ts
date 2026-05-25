import { getEmployees } from "@/lib/storage";
import { NextResponse } from "next/server";

export async function GET() {
  const employees = await getEmployees();
  return NextResponse.json(employees);
}
