import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function POST(request: NextRequest) {
  try {
    const { ip, username, password, dbName = 'postgres', port = 5432 } = await request.json();

    // 创建连接池
    const pool = new Pool({
      host: ip,
      user: username,
      password,
      database: dbName,
      port: Number(port),
      // 缩短连接超时时间，用于测试
      connectionTimeoutMillis: 5000,
    });

    // 测试连接
    await pool.connect();
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
