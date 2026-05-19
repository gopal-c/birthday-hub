import { NextResponse } from "next/server";

export async function GET() {
  const hasDb = !!process.env.POSTGRES_URL;

  if (!hasDb) {
    return NextResponse.json({ db: false, message: "POSTGRES_URL is not set — using in-memory fallback" });
  }

  try {
    const { sql } = await import("@vercel/postgres");

    // Verify connectivity and list tables
    const { rows: tables } = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name IN ('employees', 'send_logs')
    `;

    const { rows: empRows } = await sql`SELECT COUNT(*) AS count FROM employees`;
    const { rows: logRows } = await sql`SELECT COUNT(*) AS count FROM send_logs`;

    return NextResponse.json({
      db: true,
      tables: tables.map((t) => t.table_name),
      employees: Number(empRows[0]?.count ?? 0),
      logs: Number(logRows[0]?.count ?? 0),
    });
  } catch (e) {
    return NextResponse.json({ db: true, error: String(e) }, { status: 500 });
  }
}
