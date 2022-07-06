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

        const queue = 'line';
        const msg = Math.random().toString();

        // it will only be created if it doesn't exist already
        channel.assertQueue(queue, {
            durable: false,
            autoDelete: false
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });

    setTimeout(function () {
        connection.close();
        process.exit(0)
    }, 500);
});


