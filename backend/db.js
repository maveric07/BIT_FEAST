const mongoose = require("mongoose");
require("dotenv").config()
mongoose.set("strictQuery", true); // if not want to retain the current behavior then do false
const mongoURI = process.env.Mongo_URL;
const mongoDB = async () => {
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      //when ever async then use await
      if (err) console.log("---", err);
      else {
        console.log("connected successfully");
        const fetched_data = await mongoose.connection.db.collection(
          "food_items"
        ); //to connect data with the mongodb server
        fetched_data.find({}).toArray(async function (err, data) {
          //to fetch all data of food_itmes
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.food_items = data;
              global.foodCategory = catData;
            }
          });

          // if (err) console.log(err);
          // else {
          //   global.food_items = data;
          // }
        });
      }
    }
  );
};

module.exports = mongoDB;
