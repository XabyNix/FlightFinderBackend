import express from "express";
import flightsDataGenerator from "../middlewares/flightsDataGenerator.js";
import airportCodeGenerator from "../middlewares/airportCodeGenerator.js";
import citySearchMiddleware from "../middlewares/citySearchMiddleware.js";
import apicache from "apicache";

const cache = apicache.middleware;
const router = express.Router();

router.get("/data", flightsDataGenerator);

router.get("/airport_code/", cache("15 minutes"), airportCodeGenerator, (req, res) => {
	console.log("Send Response");
	if (res.locals.data) res.send(res.locals.data);
	else res.status(400).send();
});

/* router.get("/city-search/", cache("15 minutes"), citySearchMiddleware(), (req, res) => {}); */

export default router;
