import { Order } from '../../models/user/order.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const createOrder = async (req, res) => {
  try {
    const order = req.body;

    const newOrder = await Order.create(order);

    res.status(201).json(new ApiResponse(201, newOrder, 'Order generate successfully'));
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return res
        .status(err.statusCode)
        .json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Some error occurred while generating order'));
    }
  }
};

export { createOrder };
