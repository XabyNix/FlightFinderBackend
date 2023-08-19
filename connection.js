import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://user1:pjSsg7yTcQZx88kG@airlineproject.p253yhl.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export default async function run() {
	try {
		await client.connect();
		await client.db().command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} catch {
		console.dir;
	}
}
