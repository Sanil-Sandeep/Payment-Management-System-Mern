import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        paymentID:{
            type: String,
          //required: true,
        },
        productName:{
            type: String,
            required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        totalPrice:{
            type: Number,
            required: true,
        },
        cardHolderName:{
            type: String,
            required: true,
        },
        cardNumber:{
            type: Number,
            required: true,
        },
        cvv:{
           type: Number,
           required: true,
        },
        email:{
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Payment = mongoose.model('Payment', paymentSchema);