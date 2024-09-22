const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB connection URI
const uri = process.env.MONGODB_URI; // Use your connection string here

// Middleware to connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

// Define the schema and model
const userSchema = new mongoose.Schema({
  name: String,
  luckyNumber: Number,
  message: String,
});

const User = mongoose.model('User', userSchema);

module.exports = async (req, res) => {
  await connectDB(); // Ensure the database is connected

  if (req.method === 'POST') {
    const { name, luckyNumber, message } = req.body;
    const newUser = new User({ name, luckyNumber, message });

    try {
      await newUser.save();
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
