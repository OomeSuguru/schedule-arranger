'use strict';
const request = require('supertest');
// app.jsを取得
const app = require('../app');
const passportStub = require('passport-stub');

describe('/login', () => {
  // テスト前に実行　(ログイン)
  before(() => {
    passportStub.install(app);
    passportStub.login({ username: 'testuser' });
  });
  // テスト後に実行　（ログアウト）
  after(() => {
    passportStub.logout();
    passportStub.uninstall(app);
  });

  it('ログインのためのリンクが含まれる', (done) => {
    //  GETリクエスト
    request(app)
      .get('/login')
      .expect('Content-Type', 'text/html; charset=utf-8')
      // HTMLの記述があるか確認
      .expect(/<a href="\/auth\/github"/)
      .expect(200, done);
  });


  it('ログイン時はユーザー名が表示できる', (done) => {
    request(app)
      .get('/login')
      .expect(/testuser/)
      .expect(200, done);
  });
})
// ログアウト時のリダイレクトテスト
describe('/logout', () => {
  it('/logout にアクセスした際に / にリダイレクトされる', (done) => {
    request(app)
      .get('/logout')
      .expect('Location', '/')
      .expect(302, done);
  });
});