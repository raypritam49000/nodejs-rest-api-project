const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

mongoose.set('debug', true);
mongoose.set('strictQuery', false);

mongoose.connect(DB_URL).then(() => {
  console.log("Database are Connected Successfully");
}).catch((err) => {
   console.log(err);
})