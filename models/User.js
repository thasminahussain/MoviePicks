import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 watchlist: [
  {
    movieId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true 
    },
    movieName: { 
      type: String
    }
  }
]

});

export default model("User", UserSchema);
