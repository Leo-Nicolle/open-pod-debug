import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { existsSync } from "fs";
import espController from "./controllers/espController";

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (existsSync("public")) {
    console.log("server static");
    app.use(express.static("public"));
  }
  espController({ app });

  app.get("/echo2", async (req, res) => {
    res.send('Coucou');
  });
  
  // if (require.main === module) {
  const server = app.listen(+process.env.APP_SERVER_PORT || 3011, () => {
    console.log(
      `server running at port http://localhost:${server.address().port}`
    );
  });
  return {app, server};
}
