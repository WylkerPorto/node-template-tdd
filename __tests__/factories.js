const faker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../api/models');

factory.define('User', User, () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    status: 0
}));

module.exports = factory;