'use strict';

// 認証を確かめるハンドラ関数 githubの
function ensure(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = ensure;
