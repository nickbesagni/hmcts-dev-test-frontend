import { app } from '../../main/app';
import { expect } from 'chai';
import request from 'supertest';
import 'jest';

describe('Home page', () => {
  describe('on GET', () => {
    it('should return sample home page', async () => {
      await request(app)
        .get('/')
        .expect(res => expect(res.status).to.equal(200));
    });
  });
});
