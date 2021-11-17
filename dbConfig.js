require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
let pool;
const connectionString = `postgresql://${process.env.PGuser}:${process.env.PGpassword}@${process.env.PGhost}:${process.env.PGport}/${process.env.PGdatabase}`;

if(isProduction) {
pool = new Pool({
      connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
      ssl: {
        rejectUnauthorized: false
      }
  });
} else {
  pool = new Pool({
    connectionString: isProduction ? process.env.PGhost : connectionString
 });
}
console.log(`\n\nconnectionString: `, connectionString);

pool.connect();

pool.query('SELECT count(*) FROM pg_database;', (err, res) => {
   if (err) throw err;
   for (let row of res.rows) {
     console.log(JSON.stringify(row));
   }
});

module.exports = { pool };
