import mongoose from "mongoose";
const ImagesSchema = mongoose.Schema({
  filename: String,
  path: String,
  userId: String,
  uploadedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Images", ImagesSchema);
