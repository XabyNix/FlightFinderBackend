import newData from "./newData.json" assert { type: "json" };

const dataGenerator = (req, res, next) => {
	const flightFromId = newData.data.find((element) => element.id == req.params.id);

	const mappedArray = flightFromId.itineraries[0].segments.map((stopover) => ({
		departure: {
			code: stopover.departure.iataCode,
			time: stopover.departure.at.split("T").join(" ").slice(0, -4),
		},
		arrival: {
			code: stopover.arrival.iataCode,
			time: stopover.arrival.at.split("T").join(" ").slice(0, -4),
		},
	}));

	/* const mappedArray = newData.data.map((value) => {
		return value.itineraries[0].segments.map((segment) => ({
			departure: {
				code: segment.departure.iataCode,
				time: segment.departure.at,
			},
			arrival: {
				code: segment.arrival.iataCode,
				time: segment.arrival.at,
			},
		}));
	}); */

	res.locals = mappedArray;
	next();
};
export default dataGenerator;
