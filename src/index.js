const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();


const client = new MongoClient("mongodb://mongo-admin:mongo-admin@172.18.0.2:27017/", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const connectMongoDB = async () => {
    try {
        await client.connect();
        console.log("[mongodb] Conecttion successfully stablish");
    } catch (error) {
        console.log(error);
        
    }
}


connectMongoDB();


app.set("port", "3000");
app.set("name", "docker-mongodb-nodejs");


app.get("/", (req, res) => {
    res.send("Testing API with Docker");
});

app.post("/docker-mongodb-nodejs", async (req, res) => {
    const db = await client.db("docker-mongodb-nodejs");
    const adminCollection = await db.collection("admin");
    await adminCollection.insertOne({
        id: "123",
        username: "admin",
        password: "admin"
    });

    res.status(201).json({
        ok: true,
        message: "Hello World!"
    });
});

app.listen(3000);

console.log(`[${app.get("name")}] running in port ${app.get("port")}`);