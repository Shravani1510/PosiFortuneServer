const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());



const uri = "mongodb+srv://shravaniss2028:zH61Fq4uYwGnYbgd@clusterposifortune.d0pgv.mongodb.net/?retryWrites=true&w=majority&appName=ClusterPosiFortune";

// Connect to MongoDB
mongoose.connect(uri, {useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error: ", err));
// Define the schema
const userSchema = new mongoose.Schema({
  name: String,
  luckyNumber: Number,
  message: String,
});

// Create a model
const User = mongoose.model('User', userSchema);

// API route to save data
app.post('/api/saveUser', async (req, res) => {
  const { name, luckyNumber, message } = req.body;
  const newUser = new User({ name, luckyNumber, message });
  
  try {
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
