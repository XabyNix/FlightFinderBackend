import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";
//fare richieste a altra api per la ricerca della citta
function dataProcessing(response2) {
	const dataArray = response2.map((flight) => ({
		departure: {
			code: flight.itineraries[0].segments[0].departure.iataCode,
			time: flight.itineraries[0].segments[0].departure.at,
			//city: cityFromCode(flight.itineraries[0].segments[0].departure.iataCode),
		},
		arrival: {
			code: flight.itineraries[0].segments.at(-1).arrival.iataCode,
			time: flight.itineraries[0].segments.at(-1).arrival.at,
			//city: cityFromCode(flight.itineraries[0].segments.at(-1).arrival.iataCode),
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
	const { from, to, departureDate, returnDate, adults, children } = req.query;
	console.log(req.query);

	if (Object.keys(req.query).length === 6) {
		const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}&max=20`;
		const response1 = await fetchApi(url);
		const orazio = dataProcessing(response1.data.data);

		res.json(orazio);
	} else {
		res.status(400).send("Make sure parameters url are correct");
		throw new Error("Parameter missing");
	}
};

export default flightsDataGenerator;

async function cityFromCode(code) {
	const url = endpoints + "C" + code;
	const asd = await fetchApi(url);
	console.log(asd);
	return asd.data.data.name;
}
