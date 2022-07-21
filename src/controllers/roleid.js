const boom = require('@hapi/boom');

module.exports = {

    async healthcheck(request, reply) {
        var data = {
            message: true
        };
        return data;
    },

    async createRole(request, reply) {
        try {
            const db = request.server.app.db;
            const createRole = await db.porfolio.roleid.insert({
                rolename: request.payload.rolename,
                isactive: request.payload.isactive
            });

            if(Object.keys(createRole).length > 0) {
                return createRole;
            }
            else {
                return boom.conflict("Cannot create role")
            }

            } catch (e) {
                return boom.conflict(e);
            }
        },

    async getRole(request, reply) {
            try {
                const db = request.server.app.db;

                let getRole = null;
                if(request.query.rolename != null) {
                    getRole = await db.porfolio.roleid.find({
                        rolename: request.query.rolename
                    });
                } 
                else if(request.query.isactive != null) { 
                    getRole = await db.porfolio.roleid.find({
                        isactive: request.query.isactive
                    });
                } else if(request.query.roleid != null) {
                    getRole = await db.porfolio.roleid.find({
                        roleid: request.query.roleid
                    });
                }
                else {
                    result = await db.porfolio.roleid.find();
                }

                if (Object.keys(getRole).length > 0) {
                    return getRole;
                } else {
                    return boom.conflict("cannot get role");
                }
            } 
            catch(e) {
                return boom.conflict(e);
            }
        },


};