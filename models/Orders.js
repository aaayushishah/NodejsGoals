import mongoose from "mongoose";
const OrdersSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  orderItems: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Orders", OrdersSchema);
