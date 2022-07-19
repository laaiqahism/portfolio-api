//@ts-check
'use strict';
const Joi = require('@hapi/joi');
const roleidController = require('../controllers/userrole');

exports.RoleIDPlugin = {

    name: 'Role ID',
    version: '1.0.0',
    register: async function (server, options){
        server.route({
            path: '/roleid/healthcheck',
            method: 'GET',
            options: {
                handler: roleidController.healthcheck,
                description: 'API health check to see if working',
                notes: 'health check',
                tags: ['api', 'roleID']
            }
        });
    },
}

