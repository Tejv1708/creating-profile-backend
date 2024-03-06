import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import infoRoutes from "./routes/infoRoutes.js";

import cors from "cors";

const app = express();

app.use(cors());
// app.use(
//   cors({
//     origin: "https://bookcollections.onrender.com",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to MERN Stack Tutorial ");
});

app.use("/profile", infoRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
