#!/usr/bin/env node

import { Connection } from 'amqplib/callback_api';
import amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (error0: any, connection: Connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'task_queue';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {

            const secs = msg.content.toString().split('.').length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
            }, secs * 10);
        }, {
            // automatic acknowledgment mode,
            // see ../confirms.html for details
            noAck: false
        });

    });

});


