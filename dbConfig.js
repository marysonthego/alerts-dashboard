require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.PGuser}:${process.env.PGpassword}@${process.env.PGhost}:${process.env.PGport}/${process.env.PGdatabase}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.PGhost : connectionString
});

module.exports = { pool };