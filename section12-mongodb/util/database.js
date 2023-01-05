const { MongoClient, ServerApiVersion } = require("mongodb");

let _db;

const connectMongodb = async callback => {
  const password = "byo8A220Al1sTtnS";
  const uri = `mongodb+srv://oscarchankalung:${password}@cluster0.vccxw.mongodb.net/shop?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  client
    .connect()
    .then(() => {
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};

exports.connectMongodb = connectMongodb;
exports.getDb = getDb;
