import Order from "../models/orderModel.js";
import Gig from "../models/gigModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: gig.title,
            },
            unit_amount: gig.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:8800/api/orders/confirm/${req.params.id}`,
      cancel_url: `http://localhost:8800/api/orders/cancel/${req.params.id}`,
    });

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
    });

    await newOrder.save();

    res.redirect(303, session.url);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const gig = await Gig.findById(id);

    const order = await Order.findOneAndUpdate(
      { gigId: id },
      { isCompleted: true },
      { new: true }
    );

    await Gig.findByIdAndUpdate(id, {
      sales: gig.sales + 1,
    });

    res.status(302).redirect(`http://localhost:5173/success`);
  } catch (err) {
    next(err);
  }
};

export const cancel = async (req, res, next) => {
  try {
    const id = req.params.id;

    await Order.findOneAndDelete({ gigId: id });

    res.status(302).redirect(`http://localhost:5173/cancel/${id}`);
  } catch (err) {
    next(err);
  }
};
