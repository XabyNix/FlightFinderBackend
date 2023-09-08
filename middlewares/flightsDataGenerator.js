import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";
//fare richieste a altra api per la ricerca della citta

async function dataProcessing(response) {
	const dataArray = response.data.map((flight) => {
		const firstSegment = flight.itineraries[0].segments[0];
		const lastSegment = flight.itineraries[0].segments.at(-1);

		return {
			departure: {
				code: firstSegment.departure.iataCode,
				time: firstSegment.departure.at,
			},
			arrival: {
				code: lastSegment.arrival.iataCode,
				time: lastSegment.arrival.at,
			},
			duration: flight.itineraries[0].duration.slice(2).split("H").join("H "),
			price: {
				currency: flight.price.currency,
				total: flight.price.total,
			},
		};
	});
	return dataArray;
}

async function cityProcessing(response) {
	const cityCodes = Object.values(response.dictionaries.locations).map((value) => value.cityCode);
	const cityArray = [];
	for (let code of cityCodes) {
		const url = endpoints.locationCode + code;
		const cities = await fetchApi(url);
		cities !== null && cityArray.push(cities.data.data.name);
	}
	return cityArray;
}

const flightsDataGenerator = async (req, res) => {
	const { from, to, departureDate, returnDate, adults, children } = req.query;
	console.log(req.query);

	if (Object.keys(req.query).length === 6) {
		const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}&max=20`;
		const response1 = await fetchApi(url);
		const orazio = await dataProcessing(response1.data);
		const city = await cityProcessing(response1.data);

		res.json(orazio);
	} else {
		res.status(400).send("Make sure parameters url are correct");
		throw new Error("Parameter missing");
	}
};

export default flightsDataGenerator;

async function cityFromCode(code) {
	const url = ``;
	const asd = await fetchApi(url);
	return asd;
}
