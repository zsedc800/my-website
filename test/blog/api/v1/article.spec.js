const expect = require('chai').expect
const app = require('../../../../app/blog');
const request = require('supertest')(app);
describe('test/blog/api/v1/article.spec.js', function () {
  describe('/api/v1/articles', function (done) {
    it('should return articles', (done) => {
      request.get('/api/v1/articles')
        .end(function (err, res) {
          expect(err).not.exist;
          expect(res.body.ret).to.equal(true);
          done();
        });
    });
  });
});