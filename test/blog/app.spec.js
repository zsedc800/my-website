var request = require('supertest');
var expect = require('chai').expect;
var app = require('../../app/blog');
var config = require('../../config');

describe('test/blog/app.spec.js', function () {
  it('should / status 200', function (done) {
    request(app).get('/').end(function (err, res) {
      expect(res.status).to.equal(200);
      done();
    });
  });
});