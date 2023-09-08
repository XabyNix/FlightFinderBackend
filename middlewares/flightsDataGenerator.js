import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";
//fare richieste a altra api per la ricerca della citta

async function dataProcessing(response) {
	console.log("PROCESSO I DATI DEI VOLI.\n");
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
	console.log("DATI VOLI PROCESSATI.\n");
	return dataArray;
}

async function cityProcessing(response) {
	console.log("PROCESSO I DATI DELLE CITTA.\n");
	const cityCodes = Object.entries(response.dictionaries.locations);
	const myArray = [];
	for (const [airportCode, cityInfo] of cityCodes) {
		const url = endpoints.locationCode + cityInfo.cityCode;

		const cityResponse = await fetchApi(url).catch((err) => console.log(err));

		if (cityResponse !== null) {
			const cityName = cityResponse.data.data.name;
			myArray.push({
				[airportCode]: { name: cityName, country: cityInfo.countryCode },
			});
		}
	}
	console.log("DATI CITTA PROCESSATI\n");
	return myArray;
}

const flightsDataGenerator = async (req, res) => {
	const { from, to, departureDate, returnDate, adults, children } = req.query;

	console.log("RICHIESTA RICEVUTA: " + req.query + "\n");
	//console.log(req.query);

	if (Object.keys(req.query).length === 6) {
		const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&children=${children}&max=20`;
		const response1 = await fetchApi(url).catch((err) => console.log(err));
		const flightsInfo = await dataProcessing(response1.data);
		const city = await cityProcessing(response1.data);
		const orazio = { data: flightsInfo, city };
		console.log("Invio dati.\n");
		res.json(orazio);
	} else {
		res.status(400).send("Make sure parameters url are correct");
		throw new Error("Parameter missing");
	}
};

export default flightsDataGenerator;

async function cityFromCode(code) {
	const asd = await fetchApi(url);
	return asd;
}
