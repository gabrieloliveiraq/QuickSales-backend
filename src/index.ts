import path from "node:path";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@quick-sales.yqhxnv0.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log("falha ao se conectar no MongoDb: ", error));
