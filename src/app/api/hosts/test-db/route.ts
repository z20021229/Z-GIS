import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
export async function POST(request: NextRequest) {
  const pool = new Pool({ host: '127.0.0.1', port: 5432, user: 'root', password: 'Dataknown!234', database: 'postgres' });
  try {
    await pool.query('SELECT 1');
    return NextResponse.json({ success: true, message: '数据库连接成功！' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  } finally { await pool.end(); }
}