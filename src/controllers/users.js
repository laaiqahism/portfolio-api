const boom = require('@hapi/boom');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    async healthcheck(request, reply) {
        var data = {
            message: true
        };
        return data;
    },

    async dbtest(request, h) {
        try {
            var id = request.params.id;

            if(!id){
                return boom.conflict('Values did not pass');
            }
    
            return true;
        } catch (error) {
            return boom.conflict(error);
        }

    },

    async createUser(request, reply) {
        try {
            const db = request.server.app.db;
            const createUser = await db.porfolio.users.insert({
                userid: uuidv4(),
                firstname: request.payload.firstname,
                surname: request.payload.surname,
                phonenumber: request.payload.phonenumber,
                email: request.payload.email,
                gender: request.payload.gender,
                isactive: request.payload.isactive
            });

            if(Object.keys(createUser).length > 0) {
                return createUser;
            }
            else {
                return boom.conflict("Cannot create user")
            }
   

            } catch (e) {
                return boom.conflict(e);
            }
        },

        async getUsers(request, reply) {
            try {
                const db = request.server.app.db;
                let userid = request.params.userid;

                let getUser = null;
                if(request.query.firstname != null) {
                    getUser = await db.porfolio.users.find({
                        firstname: request.query.firstname
                    });
                } 
                else if(request.query.surname != null) { 
                    getUser = await db.porfolio.users.find({
                        surname: request.query.firstname
                    });
                }
                else if(request.query.phonenumber) {
                getUser = await db.porfolio.users.find({
                    phonenumber: request.query.phonenumber
                    });
                }
                else if(request.query.email) {
                    getUser = await db.porfolio.users.find({
                        email: request.query.email
                    });
                } else if(request.query.gender) {
                    getUser = await db.porfolio.users.find({
                        gender: request.query.gender
                    });
                }
                else if(request.query.isactive) {
                    getUser = await db.porfolio.users.find({
                        isactive: request.query.isactive
                    });
                }
                else {
                    result = await db.porfolio.users.find();
                }

                if (Object.keys(getUser).length > 0) {
                    return getUser;
                } else {
                    return boom.conflict("cannot get user");
                }
            } 
            catch(e) {
                return boom.conflict(e);
            }
        },

        async putUsers(request, reply) {
            try {
                let userid = request.params.userid; //path params
                const db = request.server.app.db;
                
                //Verify that the user exists
                const putUsers = await db.porfolio.users.find({
                    userid: userid,
                    // firstname: request.payload.firstname,
                    // surname: request.payload.surname,
                    // email: request.payload.email,
                    // gender: request.payload.gender,
                    // isactive: request.payload.isactive
                });
                if (Object.keys(delUsers).length <= 0) {
                    return boom.conflict('user does not exist');
                }

                const result = await db.porfolio.users.update(
                {
                    userid: userid
                }
                );
                return result;
            }
            catch (e) {
                return boom.conflict(e);
            }
        },


        async delUsers(request, reply) {
            try {
                let userid = request.params.userid; //path params
                const db = request.server.app.db;
                
                //Verify that the user exists
                const delUsers = await db.porfolio.users.find({
                    userid: userid,
                    // firstname: request.payload.firstname,
                    // surname: request.payload.surname,
                    // email: request.payload.email,
                    // gender: request.payload.gender,
                    // isactive: request.payload.isactive
                });
                if (Object.keys(delUsers).length <= 0) {
                    return boom.conflict('user does not exist');
                }

                const result = await db.porfolio.users.update(
                {
                    userid: userid
                },
                {
                    isactive: false
                },
                
                );
                return result;
            }
            catch (e) {
                return boom.conflict(e);
            }
        }

};