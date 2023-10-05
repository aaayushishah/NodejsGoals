import mongoose from "mongoose";
const UsersSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  age: Number,
  address: {
    addressLine: String,
    area: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

export default mongoose.model("Users", UsersSchema);
