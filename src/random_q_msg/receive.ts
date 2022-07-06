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

        // it will only be created if it doesn't exist already
        channel.assertQueue(queue, {
            durable: false,
            autoDelete: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });

    });

});


