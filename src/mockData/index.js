const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
  createUsers: async () => {
    console.log('Creating users...')
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = await prisma.user.create({
        data: {
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      });
      users.push(user);
    }
    return users;
  }

}
