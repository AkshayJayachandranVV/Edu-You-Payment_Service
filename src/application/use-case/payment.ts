import { IOrder } from "../../domain/entities/IOrder";
import dotenv from 'dotenv';
dotenv.config()



import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!)   

export class PaymentService {
    // private orderService: OrderService;

    // constructor() {
    //     this.orderService = new OrderService();
    // }
     


    async createStripeSession(orderData: IOrder) {
        try {
            console.log(orderData);
            console.log('Reached use case for purchasing order');
    
            // Ensure the courseDiscountPrice is valid and convert it to cents
            const discountPriceInCents = orderData.courseDiscountPrice && !isNaN(parseFloat(orderData.courseDiscountPrice))
                ? Math.round(parseFloat(orderData.courseDiscountPrice) * 100)
                : 0;
    
            // Create a Stripe Checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: orderData.courseName,
                                images: [orderData.thumbnail],
                            },
                            unit_amount: discountPriceInCents, // Use the calculated value
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `https://eduyou.site/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `https://eduyou.site`,
                metadata: {
                    userId: orderData.userId,  // Example of extra value
                    courseId: orderData.courseId, // Another example
                    tutorId: orderData.tutorId,
                    category: orderData.courseCategory,
                    thumbnail: orderData.thumbnail,
                    title: orderData.courseName,
                    price: orderData.coursePrice,
                    discountPrice: orderData.courseDiscountPrice,
                    level: orderData.courseLevel,
                    // Add any additional key-value pairs as needed
                },
            });
    
            // Save the order in the database
            const priceAsNumber = parseFloat(orderData.courseDiscountPrice);

            console.log()
    
            // orderData.transactionId = session.id;
            // orderData.paymentStatus = true;
            // orderData.adminShare = (priceAsNumber * 0.10).toString();
            // orderData.tutorShare = (priceAsNumber * 0.90).toString();
            console.log('hyyy', orderData);
    
            return {
                success: true,
                message: "Order successfully created",
                sessionId: session.id,
                orderData,
            };
        } catch (error) {
            console.log("Error in purchasing course (use-case):", error);
            return { success: false, message: "Failed to create order." };
        }
    }

    
}

