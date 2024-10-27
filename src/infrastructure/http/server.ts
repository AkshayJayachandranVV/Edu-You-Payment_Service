import express from 'express'
import config from '../config/config'
import RabbitMQClient from '../rabbitMQ/client'



const app =express();
app.use(express.json())


const startServer = async () =>{
    try{


        console.log(" ADMIN SERVER STARTING ------")

         //rabbitmq initalization
        RabbitMQClient.initialize()

        const port = config.port

        app.listen(port,()=>{
            console.log('user service running on port',port)
        })

    }catch(error){
        console.log("Error in stareting admin service",error)
    }
}

startServer()