const mongoose = require('mongoose');

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.log("Error connecting to MongoDB: ", err));

// Define the schema and model
const userSchema = new mongoose.Schema({
  name: String,
  luckyNumber: Number,
  message: String,
});
const User = mongoose.model('User', userSchema);

// API route handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, luckyNumber, message } = req.body;
    const newUser = new User({ name, luckyNumber, message });

    try {
      await newUser.save();
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Handle other HTTP methods (e.g., GET not allowed)
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
