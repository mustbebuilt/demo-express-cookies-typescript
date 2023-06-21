import express from "express";
import path from "path";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";

const app = express();

// for post on form
app.use(express.urlencoded({ extended: false }));

// switch cookie parser on
app.use(cookieParser());

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("./public"));

app.use("/", routes);

// remove for sample files
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(3000);

console.log("Express on 3000");

export default app;