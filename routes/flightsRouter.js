import express from "express";
import flightsDataGenerator from "../middlewares/flightsDataGenerator.js";
import airportCodeGenerator from "../middlewares/airportCodeGenerator.js";
import apicache from "apicache";

const cache = apicache.middleware;
const router = express.Router();

router.get("/", flightsDataGenerator);

router.get("/airport_code/", cache("15 minutes"), airportCodeGenerator, (req, res) => {
	console.log("Send Response");
	res.send(res.locals.data);
});

export default router;
