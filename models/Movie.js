import mongoose from "mongoose";

const { Schema, model } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
    required: true,
  },
  release_date: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  averageRating: {
    type: Number,
  },
  tmdb_id: {
    type: Number,
    required: true,
    unique: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

export default model("Movie", MovieSchema);
