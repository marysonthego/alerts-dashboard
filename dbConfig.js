require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGuser}:${process.env.PGpassword}@${process.env.PGhost}:${process.env.PGport}/${process.env.PGdatabase}`;

const pool = new Pool({
      connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
      ssl: {
        rejectUnauthorized: false
      }
  });

// const pool = new Pool({
//     connectionString: isProduction ? process.env.PGhost : connectionString
// });

// pool.connect();

// pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   pool.end();
// });

module.exports = { pool };
