/**
* 房源相关路由
*/
const express = require('express');
const router = express.Router();
const api = require('../../api');
const middleware = require('../../middleware');

router.post('/testapi',
  middleware.authToken,
  api.testapi.testapi
);

module.exports = router;
