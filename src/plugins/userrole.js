//@ts-check
'use strict';
const Joi = require('@hapi/joi');
const userroleController = require('../controllers/userrole');

exports.UserRolePlugin = {

    name: 'User Role',
    version: '1.0.0',
    register: async function (server, options){
        server.route({
            path: '/userrole/healthcheck',
            method: 'GET',
            options: {
                handler: userroleController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api', 'UserRole']
            }
        });
    },
}

