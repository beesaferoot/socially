const mongoose = require("mongoose");

async function getDB() {
  const mongoUri = process.env.DATABASE_URL;
  return await mongoose.createConnection(mongoUri).asPromise();
}

module.exports = { getDB };
