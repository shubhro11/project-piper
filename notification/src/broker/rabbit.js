import amqp from "amqplib";
import config from "../config/config.js";

let channel, connection;

export async function connect() {
  try {
    connection = await amqp.connect(config.RABBITMQ_URI);

    connection.on("error", (err) => {
      console.error("RabbitMQ connection error:", err.message);
    });
    connection.on("close", () => {
      console.error("RabbitMQ connection closed");
    });

    channel = await connection.createChannel();

    channel.on("error", (err) => {
      console.error("RabbitMQ channel error:", err.message);
    });
    channel.on("close", () => {
      console.error("RabbitMQ channel closed");
    });

    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Failed to connect RabbitMQ:", error.message);
  }
}


export async function publishToQueue (queueName, data) {
  try {

    if (!channel) {
      throw new Error("RabbitMQ channel is not initialized");
    }

    await channel.assertQueue(queueName, { durable: true })

    channel.sendToQueue(
      queueName, 
      Buffer.from(JSON.stringify(data)), 
      { persistent: true }
    )


  console.log("Message sent to queue:", queueName)
    
  } catch (error) {
    console.error("Failed to publish message:", error.message);
  }
}


export async function subscribeToQueue(queueName, callback) {
  try {
    if (!channel) {
      throw new Error("RabbitMQ channel is not initialized");
    }

    await channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());

        await callback(data);

        channel.ack(msg);
      } catch (error) {
        console.error("Queue processing failed:", error.message);

        channel.nack(msg, false, false);
      }
    });

    console.log("Subscribed to queue:", queueName);
  } catch (error) {
    console.error("Failed to subscribe to queue:", error.message);
  }
}

