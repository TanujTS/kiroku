import { app } from './app.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();


app.on("error", (err) => {
  console.log("Failed while initialising express server, err: ", err);
  throw err;
}) 

app.listen(process.env.port || 3000, () => {
  console.log("App is listening on port 3000");
})


