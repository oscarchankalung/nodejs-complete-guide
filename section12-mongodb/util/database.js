const { MongoClient } = require("mongodb");

let _database;

const connectMongodb = async callback => {
  const password = "byo8A220Al1sTtnS";
  const uri = `mongodb+srv://oscarchankalung:${password}@cluster0.vccxw.mongodb.net/shop?retryWrites=true&w=majority`;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    _database = client.db();
    callback();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const getDatabase = () => {
  if (_database) {
    return _database;
  } else {
    throw "No database found!";
  }
};

exports.connectMongodb = connectMongodb;
exports.getDatabase = getDatabase;
