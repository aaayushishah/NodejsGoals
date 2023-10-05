import Products from "../models/Product.js";
export const getProducts = async (req, res, next) => {
  try {
    const productsList = await Products.find();
    res.json(productsList);
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  const { name, price, description } = req.body;
  const product = new Products({
    name,
    price,
    description,
  });
  try {
    const { _id } = await product.save();
    res.json({ id: _id });
  } catch (error) {
    next(error);
  }
};
export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Products.findOneAndDelete({ _id: id });
    res.json({ message: "Product Deleted" });
  } catch (error) {
    next(error);
  }
};
