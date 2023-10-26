import { endpoints } from "../endpoints.js";
import fetchApi from "../utils/fetchApi.js";

export default function citySearchMiddleware(cityCode) {
	const codeDict = response.dictionaries.locations;
	const obj = {};
	for (const code in codeDict) {
		const url = endpoints.locationCode + cityCode;

		try {
			const cityResponse = fetchApi(url);
			cityResponse && (obj[code] = cityResponse.data.data.name);
		} catch (err) {
			console.log(err);
		}
	}
	console.log(obj);
	return obj;
}
