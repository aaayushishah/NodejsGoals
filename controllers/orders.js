import Orders from "../models/Orders.js";
import Cart from "../models/Cart.js";
export const placeOrder = async (req, res, next) => {
  const { billAmount, userId, orderItems } = req.body;
  console.log("cartIds: ", orderItems);
  try {
    const order = new Orders({
      billAmount,
      userId,
      orderItems,
    });
    // console.log("order: ", order);
    let { _id } = await order.save();
    console.log("_id: ", _id);
    const cartVal = await Cart.updateMany(
      { _id: { $in: orderItems } },
      { $set: { isActive: false } },
      { multi: true }
    );
    console.log("cartVal: ", cartVal);
    res.json({ _id });
  } catch (error) {
    next(error);
  }
};
