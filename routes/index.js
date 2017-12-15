const express = require('express');

const router = express.Router();
const Mock = require('mockjs');

const OpportunityList = require('../mock/opportunityListData.json');
const auth = require('../mock/auth.json');

const success = require('../mock/success.json');

router.get('/opportunity/list/', (req, res, next) => {
  res.json(Mock.mock(OpportunityList));
});
router.get('/auth/', (req, res) => {
  res.json(Mock.mock(auth));
});
router.get('/opportunity/request/', (req, res, next) => {
  res.json(Mock.mock(success));
});
router.get('/opportunity/request/num/', (req, res, next) => {
  res.json(Mock.mock(success));
});
router.get('/call_center/out_call/', (req, res, next) => {
  res.json(Mock.mock(success));
});
router.post('/opportunity/create/', (req, res, next) => {
  res.json(Mock.mock(success));
});

module.exports = router;
