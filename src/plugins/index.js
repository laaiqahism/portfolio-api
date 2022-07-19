`use strict`;

const { HomePlugin } = require('./home');
const { UsersPlugin } = require('./users');
const { UserRolePlugin } = require('./userrole');
const { RoleIDPlugin } = require('./roleid');

module.exports = [ HomePlugin, UsersPlugin, UserRolePlugin, RoleIDPlugin ]