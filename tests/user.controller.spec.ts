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
  })
  it('should make post request to create user', async function(){
    const userInfo = userData(UserRole.STUDENT)
    try {
      const res = await server.post(`${apiBase}/users`).send({ ...userInfo });
  
      if (res.error) console.log('Error: ', res.error)
      console.log('body: ', res.body);
      console.log('stat ', res.statusCode);
   
      assert.equal(res.body.statusCode, 201);
      
    } catch (error) {
      console.log('error ', error)
      assert.fail('error occured')
    }
  });
})