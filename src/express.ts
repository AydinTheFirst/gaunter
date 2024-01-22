import express from "express";
import cors from "cors";
import { router } from "./routers/router";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
