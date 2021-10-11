const amqp = require('amqplib')
const payload = {
    number: 5
}
connect();
async function connect() {
    try {

        const connection = await amqp.connect("amqp://localhost:5672") /// tcp connection
        const channel = await connection.createChannel(); //used to trasmit amqp commands to the broker like queue create

        const result = await channel.assertQueue("jobs") //if job exist then skip otherwise crreate the queue

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(payload)))
        console.log("job send successful");

    } catch (er) {
        console.error(er)
    }
}