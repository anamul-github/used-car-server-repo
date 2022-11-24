const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2lc9zml.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoryCollection = client.db('usedProductsResale').collection('categoryNames');
        // console.log(categoryCollection);
        // const reviewCollection = client.db('fitnessTraining').collection('reviews');

        app.get('/categoryNames', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const categoryNames = await cursor.toArray();
            res.send(categoryNames);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Used products resale server is running');
})

app.listen(port, () => {
    console.log(`Used products resale running on: ${port}`);
})