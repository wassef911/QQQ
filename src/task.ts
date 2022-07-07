#!/usr/bin/env node

import { Connection } from 'amqplib/callback_api';
import amqp = require('amqplib/callback_api');
import { queryDatabase } from './utils';

amqp.connect('amqp://localhost:5672', function (error0: any, connection: Connection) {
    connection.createChannel(async function (error1, channel) {

        const agency = await queryDatabase('A', 'agency_id');
        const user = await queryDatabase('A', 'user');
        const queueOfPeople: [] = await queryDatabase('B', agency.id);
        const subscription = await queryDatabase('B', user.id)

        const queue = 'queue_' + agency.id;
        channel.assertQueue(queue, {
            durable: true
        });
        const payload = {
            sub: subscription,
            // @ts-ignore
            text: 'you are number: ' + queueOfPeople.indexOf(user.id) + ' in row of ' + agency.name
        }

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), {
            persistent: true
        });
    });
});


