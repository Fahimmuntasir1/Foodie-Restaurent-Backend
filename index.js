const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// use middleware
app.use(cors());
app.use(express.json());

// mongodb setup

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mvsti6m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const foodCollection = client.db("FoodieRestaurant").collection("food");

    // ---calling APIS

    // get all foods from list
    app.get("/foods", async (req, res) => {
      const query = {};
      const cursor = foodCollection.find(query);
      const foods = await cursor.toArray();
      res.send(foods);
    });

    //get single foods by id
    app.get("/foods/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const food = await foodCollection.findOne(query);
      res.send(food);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// root API calling
app.get("/", (req, res) => {
  res.send("Foodie restaurant server is running");
});

app.listen(port, () => {
  console.log(`Foodie restaurant app listening on port ${port}`);
});
