const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users"); // Correct import
const ProductModel = require("./models/Product");
const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mykytatishkin:Gqn88CkKvjpDMZy6@cluster0.3n2k1.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Get Users
app.get("/getUsers", (req, res) => {
  UserModel.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("Error fetching users:", err);
      res.status(500).json(err);
    });
});

// Create User
app.post("/createUser", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json(err);
  }
});

// Update User
app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndUpdate(id, req.body);
    res.status(200).send("User Updated");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Failed to update user");
  }
});

// Delete User
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).send("User Deleted");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Failed to delete user");
  }
});

// Get Products
app.get("/getProducts", (req, res) => {
  ProductModel.find()
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      res.status(500).json(err);
    });
});

// Create Product
app.post("/createProduct", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = new ProductModel(product);
    await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json(err);
  }
});

// Start Server
app.listen(3001, () => {
  console.log("Server works on port 3001");
});
