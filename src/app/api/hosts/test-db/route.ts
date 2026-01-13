import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function POST(request: NextRequest) {
  try {
    // 直接连接到本地Docker数据库
    const pool = new Pool({
      host: '127.0.0.1',
      user: 'root',
      password: 'Dataknown!234',
      database: 'zgis_db',
      port: 5432,
      // 缩短连接超时时间，用于测试
      connectionTimeoutMillis: 5000,
    });

    // 测试连接
    const client = await pool.connect();
    await client.query('SELECT 1'); // 执行简单查询测试连接
    await client.release();
    await pool.end();

    return NextResponse.json({
      success: true,
      message: '数据库连接成功'
    });
  } catch (error) {
    console.error('数据库连接错误:', error);
    
    let errorMessage = '数据库连接失败';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({
      success: false,
      message: errorMessage
    }, {
      status: 500
    });
  }
}
