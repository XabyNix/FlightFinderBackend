import fetchApi from "../utils/fetchApi.js";
export default async function airportCodeGenerator(req, res, next) {
	const { keyword } = req.query;
	const url = `https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT&keyword=${keyword}&view=LIGHT`;
	const responseData = await fetchApi(url);

	res.locals.data = dataProcessing(responseData.data.data);

	next();
}

function dataProcessing(data) {
	const airports = data;
	const formattedJson = airports.map((airport) => ({
		name: airport.name,
		iataCode: airport.iataCode,
		city: airport.address.cityName,
		countryName: airport.address.countryName,
	}));

	return formattedJson;
}
