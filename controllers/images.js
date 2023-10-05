import Images from "../models/Images.js";

export const getFiles = async (req, res) => {
  try {
    console.log("req.user: ", req.user);
    const imagesList = await Images.find({ userId: req.user._id }).sort({
      _id: 1,
    });
    res.json(imagesList);
  } catch (error) {
    res.json({ message: error });
  }
};
export const uploadFiles = async (req, res, next) => {
  try {
    console.log("req.file.path: ", req.file);
    let file = new Images({
      filename: req.file.filename,
      path: req.file.path,
      userId: String(req.user._id),
      uploadedDate: new Date(),
    });
    // console.log("file: ", req.file);
    const id = await file.save();
    // console.log("id: ", id);
    res.json(id);
  } catch (error) {
    next(error);
  }
};

export const uploadFilesS3 = async (req, res, next) => {
  try {
    // console.log("req.file.path: ", req.file);
    let file = new Images({
      filename: req.file.key,
      path: req.file.location,
      userId: String(req.user._id),
      uploadedDate: new Date(),
    });
    // console.log("file: ", req.file);
    const id = await file.save();
    // console.log("id: ", id);
    res.json(id);
  } catch (error) {
    next(error);
  }
};
