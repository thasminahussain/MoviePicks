import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReviewSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  title: {
    type: String,
    ref: "Movie",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
});

export default model("Review", ReviewSchema);
