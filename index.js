import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import movieRoutes from "./routes/movies.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const app = express();

app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//global error middlware
app.use((err, req, res, next) => {
  res.send("Something went wrong!");
});

//routes
app.get("/", (req, res) => {
  res.send("Welcome to the User of API"); 
}); 

// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
