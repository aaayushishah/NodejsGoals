import mongoose from "mongoose";
const CartSchema = mongoose.Schema({
  userId: String,
  productId: mongoose.Types.ObjectId,
  quantity: Number,
  price: Number,
  amount: Number,
  isActive: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("Cart", CartSchema);
