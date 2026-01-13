import { Request, Response } from 'node:http';
import { Pool } from 'pg';

export async function POST(req: Request) {
  try {
    // 解析请求体
    const body = await new Response(req.body).json();
    const { ip, username, password, dbName = 'zgis_db', port = 5432 } = body;

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
    const client = await pool.connect();
    await client.query('SELECT 1'); // 执行简单查询测试连接
    await client.release();
    await pool.end();

    return new Response(JSON.stringify({
      success: true,
      message: '数据库连接成功'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('数据库连接错误:', error);
    
    let errorMessage = '数据库连接失败';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({
      success: false,
      message: errorMessage
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
