const bcrypt = require('bcryptjs');
const factory = require('../factories');
const truncate = require('../utils/truncate');
const { User } = require('../../api/models');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    });

    it('Cryptograph user password', async () => {
        const user = await User.create({
            name: 'teste2',
            email: 'teste2@teste.com',
            password: '123456'
        });

        const compareHash = await bcrypt.compare('123456', user.password);
        expect(compareHash).toBe(true);
    });

    it('Verify password with user instance', async () => {
        const user = await User.create({
            name: 'teste2',
            email: 'teste2@teste.com',
            password: '123456'
        });

        const compareHash = await user.checkPassword('123456');
        expect(compareHash).toBe(true);
    });

    it('Verify invalid password with user instance', async () => {
        const user = await User.create({
            name: 'teste2',
            email: 'teste2@teste.com',
            password: '123456'
        });

        const compareHash = await user.checkPassword('654321');
        expect(compareHash).toBe(false);
    });
})