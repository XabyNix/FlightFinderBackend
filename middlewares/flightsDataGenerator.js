import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";

async function cityProcessing(response) {
	const codeDict = response.dictionaries.locations;
	for (const code in codeDict) {
		const url = endpoints.locationCode + codeDict[code].cityCode;

		try {
			const cityResponse = await fetchApi(url);

			cityResponse && (codeDict[code].cityName = cityResponse.data.data.name);
		} catch (err) {
			console.log(err);
		}
	}
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
		const response1 = await fetchApi(url);
		if (response1 && response1.data.meta.count !== 0) {
			const { data, dictionaries } = response1.data;
			await cityProcessing(response1.data);
			const orazio = { data, dictionaries };
			console.log(dictionaries);
			res.json(orazio);
		} else res.status(200).send({});
	} catch (error) {
		console.log(error);
	}
};

export default flightsDataGenerator;
