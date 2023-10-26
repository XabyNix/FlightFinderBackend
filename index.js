import express from "express";
import connectDb, { client as mongoClient } from "./connection.js";
import cors from "cors";
import flightsRouter from "./routes/flightsRouter.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello!");
});

app.use("/flights", flightsRouter);

connectDb().then(
	app.listen(port, () => {
		console.log("Server is Listening on port 3000");
	})
);
