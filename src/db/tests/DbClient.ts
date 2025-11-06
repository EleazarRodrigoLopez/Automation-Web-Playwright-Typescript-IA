
import mysql from 'mysql2/promise';
import pg from 'pg';

export class DbClient {
  static async testMySQLConnection() {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'test_db'
    });
    const [rows] = await connection.execute('SELECT 1');
    await connection.end();
    return rows;
  }

  static async testPostgresConnection() {
    const client = new pg.Client({
      host: 'localhost',
      user: 'postgres',
      password: 'password',
      database: 'test_db'
    });
    await client.connect();
    const res = await client.query('SELECT 1');
    await client.end();
    return res.rows;
  }
}
