import {paymentController} from '../../interface/controllers/paymentController';
import RabbitMQClient from './client';


export default class MessageHandlers{
     static async handle(operations:string,data : any, correlationId:string,replyTo:string){
        let response
        switch(operations){
            case 'course-payment' :
                console.log('Handling operation',operations,data);
                response = await paymentController.createStripeSession(data)
                console.log("data reached ",response);
                break;
        }

        await RabbitMQClient.produce(response,correlationId,replyTo)
     }
}