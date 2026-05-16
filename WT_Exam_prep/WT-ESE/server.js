const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/wtproject")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Models
const User = require("./models/User");
const Item = require("./models/Item");

// REGISTER
app.post("/register", async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({ success: true });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) return res.json({ success: false });

    res.json({ success: true, user });
});

// GET ITEMS
app.get("/items", async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));