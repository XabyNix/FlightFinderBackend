import express from "express";
import detailedDataGenerator from "../detailedDataGenerator.js";
import flightsDataGenerator from "../flightsDataGenerator.js";

const router = express.Router();

router.get("/", flightsDataGenerator, (req, res) => {
	try {
		res.status(200).json(res.locals);
	} catch (error) {
		res.status(500).send("Error", error);
	}
});

router.get("/flights/data/:id", detailedDataGenerator, (req, res) => {
	try {
		res.status(200).json(res.locals);
	} catch (error) {
		res.status(500).send("Error", error);
	}
});

export default router;
