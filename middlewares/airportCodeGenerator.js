import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";
export default async function airportCodeGenerator(req, res, next) {
	const { keyword } = req.query;
	console.log("Keyword is: " + keyword);
	const url = endpoints.keywordSearch + keyword;
	try {
		const responseData = await fetchApi(url);
		res.locals.data = dataProcessing(responseData.data.data);
	} catch (err) {
		console.log(err);
	}

	next();
}

function dataProcessing(data) {
	const airports = data;
	const formattedJson = airports.map((airport, index) => ({
		key: index + 1,
		name: airport.name,
		iataCode: airport.iataCode,
		city: airport.address.cityName,
		countryName: airport.address.countryName,
	}));

	return formattedJson;
}
