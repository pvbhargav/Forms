const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const user = require("./models/Usermodel");

app.use(cors());
app.use(express.json());

// Correct connection logging
mongoose.connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Home route
app.get('/api/home', (req, res) => {
  res.json({ message: 'Welcome to the Home page from the backend!' });
});

// About route
app.get('/api/about', (req, res) => {
  res.json({ message: 'This is the About page from the backend!' });
});

// Create a new user using async/await
app.post("/form/create", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new user({ name, email });

  try {
    await newUser.save(); // Save the user to the database
    res.status(201).json({ name, email }); // Respond with success
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Fetch all users using async/await
app.get("/api/users", async (req, res) => {
  try {
    const users = await user.find(); // Fetch all users from the database
    res.json(users); // Return users as JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Fetch a user by ID using async/await
app.get('/api/users/:id', async (req, res) => {
  try {
    const userFound = await user.findById(req.params.id); // Find the user by ID

    if (!userFound) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(userFound); // Return the user if found
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Delete a user by ID using async/await
app.delete('/api/users/:id', async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id); // Delete the user by ID
    res.json({ message: 'User deleted successfully' }); // Respond with success
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Update a user by ID using async/await
app.put('/api/users/:id', async (req, res) => {
  const { name, email } = req.body;

  try {
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id, 
      { name, email }, 
      { new: true } // This ensures the updated user is returned
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser); // Respond with the updated user data
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
