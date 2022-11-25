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
        const carCollection = client.db('usedProductsResale').collection('usedCars');
        console.log(carCollection);

        //category items
        app.get('/categoryNames', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const categoryNames = await cursor.toArray();
            res.send(categoryNames);
        })

        //experiment
        app.get('/usedCars', async (req, res) => {
            const query = {}
            const cursor = carCollection.find(query);
            const usedCars = await cursor.toArray();
            res.send(usedCars);
        })

        //trying
        app.get('/usedCars/:id', async (req, res) => {
            const id = req.params.cat_id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const car = await carCollection.findOne(query);

            res.send(car);
        })

        //([0-9a-fA-F]{24})

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