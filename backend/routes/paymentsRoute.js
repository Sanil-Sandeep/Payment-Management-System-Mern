import express from 'express';
import { Payment } from '../models/paymentModel.js';

const router = express.Router();

//Route for save a payment
router.post("/", async (request, response) => {
  try {
    if (
      /*!request.body.paymentID ||*/
      !request.body.productName ||
      !request.body.price ||
      !request.body.quantity ||
      !request.body.totalPrice ||
      !request.body.cardHolderName ||
      !request.body.cardNumber ||
      !request.body.cvv ||
      !request.body.email
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: paymentID, productName, price, quantity, totalPrice, cardHolderName, cardNumber, cvv, email",
      });
    }
    const newPayment = {
    //paymentID: request.body.paymentID,
      productName: request.body.productName,
      price: request.body.price,
      quantity: request.body.quantity,
      totalPrice: request.body.totalPrice,
      cardHolderName: request.body.cardHolderName,
      cardNumber: request.body.cardNumber,
      cvv: request.body.cvv,
      email: request.body.email,
    };

    const payment = await Payment.create(newPayment);

    return response.status(201).send(payment);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get all payments from database
router.get("/", async (request, response) => {
  try {
    const payments = await Payment.find({});

    return response.status(200).json({
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for get one payment from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const payment = await Payment.findById(id);

    return response.status(200).json(payment);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a payment
router.put("/:id", async (request, response) => {
  try {
    if (
    //!request.body.paymentID ||
      !request.body.productName ||
      !request.body.price ||
      !request.body.quantity ||
      !request.body.totalPrice ||
      !request.body.cardHolderName ||
      !request.body.cardNumber ||
      !request.body.cvv ||
      !request.body.email
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: paymentID, productName, price, quantity, totalPrice, cardHolderName, cardNumber, cvv, email",
      });
    }

    const { id } = request.params;

    const result = await Payment.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Payment not found" });
    }
    return response
      .status(200)
      .send({ message: "Payment details updated successdully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for delete a payment
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Payment.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Payment not found" });
    }
    return response
      .status(200)
      .send({ message: "Payment deleted successfully " });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
