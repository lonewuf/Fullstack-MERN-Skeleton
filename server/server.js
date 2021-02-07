import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import config from "../config/config";
import mongoose from "mongoose";
import Template from "../template";
import template from "../../mern-setup/template";

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("error", () => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send(Template());
});

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server is started on port: ${config.port}`);
});

export default app;
