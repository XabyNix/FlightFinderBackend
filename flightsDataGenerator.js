//import newData from "./newData.json" assert { type: "json" };
import fetchApi from "./fetchAPI.js";

const flightsDataGenerator = async (req, res, next) => {
	const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${req.query.from}&destinationLocationCode=${req.query.to}&departureDate=${req.query.departureDate}&adults=${req.query.adults}&max=20`;
	const response = await fetchApi(url);
	//console.log(response);
	const dataArray = response.data.map((flight) => ({
		departure: {
			code: flight.itineraries[0].segments[0].departure.iataCode,
			time: flight.itineraries[0].segments[0].departure.at,
		},
		arrival: {
			code: flight.itineraries[0].segments.at(-1).arrival.iataCode,
			time: flight.itineraries[0].segments.at(-1).arrival.at,
		},
		duration: flight.itineraries[0].duration.slice(2).split("H").join("H "),
		price: {
			currency: flight.price.currency,
			total: flight.price.total,
		},
	}));
	res.locals = dataArray;
	next();
};

export default flightsDataGenerator;
