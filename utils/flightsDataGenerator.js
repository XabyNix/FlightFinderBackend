import fetchApi from "./fetchApi.js";

function dataProcessing(response) {
	const dataArray = response.data.data.map((flight) => ({
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
	return dataArray;
}

const flightsDataGenerator = async (req, res) => {
	console.log("sono entrato qui");
	const { from, to, departureDate, adults } = req.query;
	console.log(req.query);

	const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${req.query.from}&destinationLocationCode=${req.query.to}&departureDate=${req.query.departureDate}&adults=${req.query.adults}&max=20`;
	if (from && to && departureDate && adults) {
		const response = await fetchApi(url);
		//res.json(response.data);
		res.json(dataProcessing(response));
	} else {
		res.send("Make sure parameters url are correct");
	}
};

export default flightsDataGenerator;
