require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// ========== MONGODB SETUP ==========
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@book-store-mern.8pieseo.mongodb.net/?retryWrites=true&w=majority&appName=Book-Store-Mern`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ========== START SERVER =
async function run() {
  try {
    const database = client.db('carrer-code');
    const scholarshipCollection = database.collection("scholarship");
    const usersCollection = database.collection("users");
    const applicationsCollection = database.collection("applications");
    const reviewsCollection = database.collection("reviews");

    const ADMIN_EMAIL = "admin@scholarship.com";

    // ========== USER ROUTES ==========
    app.post('/users', async (req, res) => {
      try {
        const user = req.body;
        const exists = await usersCollection.findOne({ email: user.email });

        if (exists) return res.send({ message: "User already exists" });

        user.role = "user";
        user.createdAt = new Date();

        const result = await usersCollection.insertOne(user);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

// for testing purpose only 🥺🥺
    app.get("/applications", async (req, res) => {
  const apps = await applicationsCollection.find().toArray();
  res.send(apps);
});
    app.get("/reviews", async (req, res) => {
  const apps = await reviewsCollection.find().toArray();
  res.send(apps);
});
    app.get("/scholarship", async (req, res) => {
  const apps = await scholarshipCollection.find().toArray();
  res.send(apps);
});
    app.get("/users", async (req, res) => {

  const apps = await usersCollection.find().toArray();
  res.send(apps);
});

//end of testing purpose only 🥺


    app.get('/users/:email', async (req, res) => {
      try {
        const user = await usersCollection.findOne({ email: req.params.email });
        res.send(user);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.get('/users', async (req, res) => {
      try {
        const users = await usersCollection.find().toArray();
        res.send(users);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.get('/users/admin/:email', async (req, res) => {
      try {
        const email = req.params.email;

        if (email === ADMIN_EMAIL) return res.send({ admin: true });

        const user = await usersCollection.findOne({ email });
        res.send({ admin: user?.role === "admin" });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.patch('/users/request-moderator/:email', async (req, res) => {
      try {
        const result = await usersCollection.updateOne(
          { email: req.params.email },
          { $set: { moderatorRequest: true, requestDate: new Date() } }
        );
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.patch('/users/approve-moderator/:email', async (req, res) => {
      try {
        const result = await usersCollection.updateOne(
          { email: req.params.email },
          { $set: { role: "moderator", moderatorRequest: false } }
        );
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // ========== SCHOLARSHIP ROUTES ==========
    app.get('/scholarships', async (req, res) => {
      try {
        const data = await scholarshipCollection.find().toArray();
        res.send(data);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.get('/scholarships/:id', async (req, res) => {
      try {
        const data = await scholarshipCollection.findOne({ _id: new ObjectId(req.params.id) });
        res.send(data);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    app.post('/scholarships', async (req, res) => {
      try {
        const scholarship = req.body;
        scholarship.createdAt = new Date();

        const result = await scholarshipCollection.insertOne(scholarship);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // ========== APPLICATION ROUTES ==========
    app.post('/applications', async (req, res) => {
      try {
        const application = req.body;
        application.createdAt = new Date();

        const result = await applicationsCollection.insertOne(application);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // ========== REVIEW ROUTES ==========
    app.post('/reviews', async (req, res) => {
      try {
        const review = req.body;
        review.createdAt = new Date();

        const result = await reviewsCollection.insertOne(review);
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // ========== STRIPE PAYMENT ==========
    app.post('/create-payment-intent', async (req, res) => {
      try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

  } finally {
    // connection stays open
  }
}

run().catch(console.dir);

// DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('Scholarship management server is running smoothly');
});

// START SERVER
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
