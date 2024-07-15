import {Kafka} from 'kafkajs'

const kafka= new Kafka({
    clientId: 'User-service',
    brokers:['localhost:9092']
})

const producer= kafka.producer()

export const sendMessageToKafka= async(topic: string, message:any)=>{
    try{
        await producer.connect()
        await producer.send({
            topic,
            messages:[{value:JSON.stringify(message)}]
        })
        console.log("message send successfully form producer");  
    }catch(err){
        console.log('error message in userProducer', err);
    }finally{
        await producer.disconnect()
    }
}