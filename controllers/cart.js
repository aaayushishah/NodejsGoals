import Cart from "../models/Cart.js";
export const getCartList = async (req, res, next) => {
  const { userId } = req.query;
  // console.log("userId: ", userId)
  try {
    let cartList = await Cart.aggregate([
      {
        $match: {
          userId: userId,
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $project: {
          amount: 1,
          quantity: 1,
          price: 1,
          userId: 1,
          productId: 1,
          productDetails: {
            $arrayElemAt: ["$productDetails", 0],
          },
        },
      },
    ]);
    if (cartList.length > 0) {
      cartList = cartList.map((val) => {
        return {
          _id: val._id,
          userId: val.userId,
          productId: val.productId,
          quantity: val.quantity,
          price: val.price,
          amount: val.amount,
          productName: val.productDetails?.name,
          productDesc: val.productDetails?.description,
        };
      });
    }
    res.json(cartList);
  } catch (error) {
    next(error);
  }
};
export const addToCart = async (req, res, next) => {
  const cartItems = req.body;
  try {
    const cart = await Cart.insertMany(cartItems);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
export const deleteCartProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Cart.findOneAndDelete({ _id: id });
    res.json({ message: "Item Deleted" });
  } catch (error) {
    next(error);
  }
};
