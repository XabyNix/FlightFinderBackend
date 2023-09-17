import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";

async function cityProcessing(response) {
	const codeDict = response.dictionaries.locations;
	const obj = {};
	for (const code in codeDict) {
		const url = endpoints.locationCode + codeDict[code].cityCode;

		try {
			const cityResponse = await fetchApi(url);
			cityResponse && (obj[code] = cityResponse.data.data.name);
		} catch (err) {
			console.log(err);
		}
	}
	console.log(obj);
	return obj;
}

const flightsDataGenerator = async (req, res) => {
	const { from, to, departureDate, returnDate, adults, children } = req.query;

	console.log("RICHIESTA RICEVUTA: \n");
	console.log(req.query);

	const url =
		endpoints.flightData +
		`originLocationCode=${from}` +
		`&destinationLocationCode=${to}` +
		`&departureDate=${departureDate}` +
		(returnDate ? `&returnDate=${returnDate}` : "") +
		`&adults=${adults}` +
		`&children=${children}` +
		"&max=20";
	try {
		console.log(url);
		const response1 = await fetchApi(url);
		if (response1 && response1.data.meta.count !== 0) {
			const flightsInfo = response1.data.data;
			const city = await cityProcessing(response1.data);
			const orazio = { data: flightsInfo, city };
			console.log("Invio dati.\n");
			res.json(orazio);
		} else res.status(200).send({});
	} catch (error) {
		console.log(error);
	}
};

export default flightsDataGenerator;
