#!/usr/bin/env node

import { Connection } from 'amqplib/callback_api';
import * as amqp from "amqplib/callback_api";
import webpush from "web-push";
import { queryDatabase } from './utils';


amqp.connect('amqp://localhost:5672', function (error0: any, connection: Connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(async function (error1, channel) {

        const agency = await queryDatabase('A', 'agency_id');
        const queue = 'queue_' + agency.id;

        channel.assertQueue(queue, {
            durable: true
        });

        channel.consume(queue, function (buff) {
            const payload = JSON.parse(buff.content.toString());

            webpush
                .sendNotification(payload.sub, { title: payload.text })
                .catch(err => console.error(err));
        }, {
            // automatic acknowledgment mode,
            // see ../confirms.html for details
            noAck: false
        });

    });

});


