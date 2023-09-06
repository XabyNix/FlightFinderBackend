import fetchApi from "../utils/fetchApi.js";

function dataProcessing(response2) {
	const dataArray = response2.map((flight) => ({
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
	const { from, to, departureDate, adults } = req.query;
	console.log(req.query);

	if (from && to && departureDate && adults) {
		const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&adults=${adults}&children=&max=20`;
		const response1 = await fetchApi(url);
		const orazio = dataProcessing(response1.data.data);

		res.json(orazio);
	} else {
		res.status(400).send("Make sure parameters url are correct");
	}
};

export default flightsDataGenerator;
