const express = require('express'); 
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());  // Allow cross-origin requests from your frontend
app.use(bodyParser.json());  // Parse JSON body from frontend

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB Atlas"))
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
  console.log(req.headers); // Log headers
  console.log(req.body); // Log body
  const { name, luckyNumber, message } = req.body;
  const newUser = new User({ name, luckyNumber, message });
  
  try {
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Default route to handle root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Posi-Fortune Server!');
});

// Export the app (no need for app.listen)
module.exports = app;
