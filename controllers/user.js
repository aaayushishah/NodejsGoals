import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
export const getUsers = async (req, res, next) => {
  try {
    const limit = req.query.limit || 2;
    const skip = req.query.skip || 0;
    const findClause = req.query.search
      ? { name: new RegExp(req.query.search, "i") }
      : {};
    // console.log("search: ", findClause);
    const userList = await Users.find(findClause)
      .sort({
        _id: 1,
      })
      .limit(limit)
      .skip(skip);
    res.json(userList);
  } catch (error) {
    next(error);
  }
};
export const createUser = async (req, res, next) => {
  try {
    const {
      email,
      password,
      name,
      age,
      address: { addressLine, area },
      isAdmin,
    } = req.body;
    // check if email exists
    const emailExist = await Users.findOne({ email });
    if (emailExist) {
      return res.status(400).send("Email already exist!");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new Users({
      email: email,
      password: hashPassword,
      name,
      age: age,
      address: {
        addressLine: addressLine,
        area: area,
      },
      isAdmin,
    });
    try {
      const { _id } = await user.save();
      const token = await loginProcess({ body: { email, password } }, null);
      res.json({ id: _id, token });
    } catch (error) {
      res.json({ message: error });
    }
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.findOneAndDelete({ _id: id });
    res.json({ message: "User Deleted" });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await Users.findOneAndUpdate({ _id: id }, body);
    res.json(data);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const token = await loginProcess(req, res);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};
const loginProcess = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  console.log("UseR: ", user);
  if (!user) return res.status(400).send({ message: "Email does not exist!" });
  const validPassword = await bcrypt.compare(password, user.password);
  console.log("validPassword: ", validPassword);
  if (!validPassword)
    return res.status(400).send({ message: "Invalid Password" });
  const token = await jwt.sign(
    { _id: user._id, email: user.email, isAdmin: user.isAdmin },
    process.env.TOKEN_SECRET
  );
  return token;
};
