const amqp = require('amqplib')

connect();
async function connect() {
    try {

        const connection = await amqp.connect("amqp://localhost:5672") /// tcp connection
        const channel = await connection.createChannel(); //used to trasmit amqp commands to the broker like queue create

        const result = await channel.assertQueue("jobs") //if job exist then skip otherwise crreate the queue

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())

            console.log(`Recieved job with number ${input.number}`)
        })
    } catch (er) {
        console.error(er)
    }
}