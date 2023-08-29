import express from "express";
import flightsDataGenerator from "../utils/flightsDataGenerator.js";
import apicache from "apicache";

/* import amadeusMiddleware from "../utils/amadeusGet.js"; */

const cache = apicache.middleware;
const router = express.Router();

router.get("/", cache("5 minutes"), flightsDataGenerator);

router.get("/test", cache("5 minutes"), flightsDataGenerator);

export default router;
