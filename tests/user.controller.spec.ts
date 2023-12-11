import supertest from 'supertest';
import { assert } from 'chai';
import app, { apiBase } from '../src/app';
import { UserRole } from '../src/db/enums/index';
import { userData } from '../src/utils/generators';
import { connect } from 'mongoose';

const createMongodbConnection = async () => {
    try {
        const dbConnect = await connect('mongodb://localhost:27017/knowlearn');
        if (dbConnect) console.log('- Connected to MongoDB server')
    } catch (error) {
        console.log(`- Database Error:: ${error}`)
    }
}

const server = supertest.agent(app);

describe('USER CONTROLLER TEST SUITE', () => {
  before(() => {
    createMongodbConnection()
  });
  describe('GET ACTIONS TEST SUITE', () => {
    it('should make a get request to all users', async () => {
        const res = await server.get(`${apiBase}/users`);

        if (res.error) console.log('Error: ', res.error);

        assert.isOk(res.body);
        assert.equal(res.body.statusCode, 200);
    });

    it('should make a get request to get one user', async () => {
        const res = await server.get(`${apiBase}/users/65707dfa90780d25725513ae`);

        if (res.error) console.log('Error: ', res.error);

        assert.isOk(res.body);
        assert.equal(res.body.statusCode, 200);
    });
  });

  describe.skip('POST ACTIONS TEST SUITE', () => {
    it('should make post request to create user', async function(){
      
      const userInfo = userData(UserRole.STUDENT);
      const res = await server.post(`${apiBase}/users`).send({ ...userInfo });
  
      if (res.error) console.log('Error: ', res.error);
      
      assert.isOk(res.body);
      assert.equal(res.body.statusCode, 201);
    });
  });

  describe('PUT ACTIONS TEST SUITE', () =>  {
    it('should make a put request to update a user', async () => {
      const userUpdateInfo = {
        is_phone_verified: false
      }
      const res = await server.put(`${apiBase}/users/65707dfa90780d25725513ae`).send({ ...userUpdateInfo });

      if (res.error) console.log(res.error);

      assert.isOk(res.body);
      assert.equal(res.body.statusCode, 200);
    })
  })
})