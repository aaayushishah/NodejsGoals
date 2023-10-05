import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

export default mongoose.model("Products", ProductSchema);
