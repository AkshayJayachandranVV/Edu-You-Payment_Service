import {PaymentService} from "../../application/use-case/payment"
import {  IOrder} from "../../domain/entities/IOrder";

class PaymentController {
    private paymentService: PaymentService

    constructor() {
        this.paymentService = new PaymentService()
    }

    
    async createStripeSession(orderData: IOrder) {
        try {
            console.log("Received order data from API Gateway:", orderData);
            const result = await this.paymentService.createStripeSession(orderData);
            if (result.success) {
                console.log("Order placed successfully:", result);
                return result
            } else {
                console.log("Order placement failed:", result.message);
                return { success: false, message: result.message };
            }
        } catch (error) {
            console.log("Error in purchasing the course:", error);
            return { success: false, message: "An error occurred while creating the order." };
        }
    }


}

export const paymentController = new PaymentController()