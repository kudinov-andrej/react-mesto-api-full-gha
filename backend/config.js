const { JWT_SECRET = "JWT_SECRET" } = process.env;
const { DB_ADRESS = "mongodb://127.0.0.1:27017/mestodb" } = process.env;

module.exports = {
  JWT_SECRET,
  DB_ADRESS,
}