require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");
const fs    = require("fs");
const path  = require("path");

async function setup() {
  console.log("");
  console.log("Connecting to MySQL...");

  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST || "localhost",
    port:     parseInt(process.env.DB_PORT || "3306", 10),
    user:     process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  console.log("Connected to MySQL server successfully!");

  await conn.query("CREATE DATABASE IF NOT EXISTS `freshcart` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
  console.log('Database "freshcart" created (or already exists).');

  await conn.query("USE `freshcart`");

  const schemaPath = path.join(__dirname, "..", "models", "db.schema.sql");
  if (fs.existsSync(schemaPath)) {
    const sql = fs.readFileSync(schemaPath, "utf8");
    await conn.query(sql);
    console.log("Schema applied from db.schema.sql");
  } else {
    console.log("No schema file found, skipping...");
  }

  await conn.end();
  console.log("");
  console.log("SUCCESS! Database is ready. Run: node server.js");
  console.log("");
}

setup().catch(err => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
