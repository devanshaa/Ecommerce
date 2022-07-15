// import catchAsyncError from "../middleware/catchAsyncErrors.js";
// import dotenv from "dotenv";
// dotenv.config();
// import Stripe from "stripe";

// // console.log('STRIPE_API_KEY:', process.env.STRIPE_SECRET_KEY)
// const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
//   apiVersion: "2020-03-02",
// });

// export const processPayment = catchAsyncError(async (req, res, next) => {
//   // stripe.paymentIntents.payment_intents = sendStripeApiKey;
//   // console.log('stripe:', stripe);
//   try {
//     var paymentIntent = await stripe.paymentIntents.create({
//       amount: req.body.amount,
//       currency: "inr",
//       // confirm:true,
//       payment_method: "pm_card_visa",
//       payment_method_types: ["card"],
//       payment_method_options: {
//         card: {
//           request_three_d_secure: "any",
//         },
//       },
//       // automatic_payment_methods: {enabled: true},
//       metadata: {
//         company: "Ecommerce",
//       },
//     });
//     paymentIntent = await stripe.paymentIntents.confirm(`${paymentIntent.id}`);
//     // paymentIntent = await stripe.paymentIntents.capture(`${paymentIntent.id}`);
//     // console.log("hello")
//     console.log("client_secret:", paymentIntent);

//     res
//       .status(200)
//       .json({ success: true, client_secret: paymentIntent.client_secret });
//   } catch (err) {
//     console.log(err);
//   }
// });

// export const sendStripeApiKey = catchAsyncError(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });

// export default processPayment;


import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import dotenv from "dotenv";
dotenv.config();
import stripes from "stripe";
const stripe = new stripes(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-03-02",
});
export const processPayment = catchAsyncErrors(async (req, res, next) => {
  try{
  var myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    // payment_method: "pm_card_visa",
    metadata: {
      company: "Ecommerce",
    },
  });
  // myPayment = await stripe.paymentIntents.confirm(`${myPayment.id}`);
  // console.log('myPayment:', myPayment)

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
}catch(err){
  console.log(err);
}
});

export const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});

export default processPayment;