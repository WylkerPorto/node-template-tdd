const request = require('supertest');
const app = require('../../api/app');
const truncate = require('../utils/truncate');
const clearing = require('../utils/clearing');
const factory = require('../factories');
const { User } = require('../../api/models');

describe('Manager crud navbar', () => {
    beforeEach(async () => {
        await truncate();
    });

    describe('Read', () => {
        it('descrip', async () => { });
    });
});

describe('admin authentication', () => {
    beforeEach(async () => {
        await truncate();
    });

    describe('Authentication line', () => {
        it('not authentication with invalid email', async () => {
            const user = await factory.create('User', {
                email: 'b@c.d'
            });

            const response = await request(app)
                .post('/sessions')
                .send({
                    email: 'a@b.c'
                });

            expect(response.status).toBe(401);
        });

        it('not authenticate with valid email and invalid password', async () => {
            const user = await factory.create('User', {
                password: '123123'
            });

            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123456'
                });

            expect(response.status).toBe(401);
        });

        it('Authentication with valid password and valid email', async () => {
            const user = await factory.create('User', {
                password: '123456'
            });

            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123456'
                });

            expect(response.status).toBe(200);
        });

    });

    describe('Authentication with token', () => {
        it('return jwt token when authenticated', async () => {
            const user = await factory.create('User', {
                password: '123123'
            });

            const response = await request(app)
                .post('/sessions')
                .send({
                    email: user.email,
                    password: '123123'
                });

            expect(response.body).toHaveProperty("token");
        });

        it('access private routes when authenticated', async () => {
            const user = await factory.create('User', {
                password: '123123',
                status: '2'
            });

            const response = await request(app)
                .get('/accessed')
                .set('Authorization', `Bearer ${user.generateToken()}`);

            expect(response.status).toBe(200);
        });

        it('not access private routes without jwt token', async () => {
            const user = await factory.create('User', {
                password: '123123'
            });

            const response = await request(app).get('/accessed');

            expect(response.status).toBe(401);
        });

        it('not access private routes with invalid jwt token', async () => {
            const user = await factory.create('User', {
                password: '123123'
            });

            const response = await request(app)
                .get('/accessed')
                .set('Authorization', `Bearer 123123`);

            expect(response.status).toBe(401);
        });
    });
});