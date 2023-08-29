const Amadeus = require("amadeus");
import "dotenv/config";

const { CLIENT_ID, CLIENT_SECRET } = process.env;

export default async function amadeusMiddleware(req, res) {
	let amadeus = new Amadeus({
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
	});
	try {
		const flights = await amadeus.shopping.flights_offers_search.get({
			originLocationCode: "SYD",
			destinationLocationCode: "BKK",
			departureDate: "2023-09-01",
			adults: "2",
		});
		console.log(flights);
		res.send(flights);
	} catch (error) {
		console.log(error);
		res.send(error);
	}
}
