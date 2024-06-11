import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDb } from "./config/dbCon";
import router from "./routes";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes());

dotenv.config();

app.listen(process.env.PORT, async () => {
  connectToDb();
  console.log(`Server started on port ${process.env.PORT}`);
});
