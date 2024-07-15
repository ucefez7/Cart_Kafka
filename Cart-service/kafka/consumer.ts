import { Kafka } from "kafkajs";
import {createCart} from '../controller/cartController'


const kafka= new Kafka({
    clientId: 'Cart-service',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({groupId: 'cart-group'});

export const initConsumer = async ()=>{
    try{
        await consumer.connect();
        console.log('Kafka consumer connected');

        await consumer.subscribe({topic: 'user-created-topic'});
        console.log('Subscribed to topic: user-created-topic');
        
        await consumer.run({
            eachMessage: async ({topic, partition, message})=>{
                try{
                    const { userId }= JSON.parse(message?.value?.toString() ||'{}');
                    console.log(`Recieved userId: $userId`); 

                    await createCart(userId)
                }catch(err){
                    console.error('Error processing Kafka message:', err)
                }
            }
        });
        console.log('Kafka consumer is running');
    }catch(err){
        console.error('Error while initializing the consumer', err);
    }
};

initConsumer();