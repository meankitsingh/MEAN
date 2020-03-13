const express = require('express');
const asyncHandler = require('express-async-handler');
const articleCtrl = require('../controllers/article.controller');
const extractFile = require('../middleware/file');
const router = express.Router();
module.exports = router;

router.route('/create/').post(extractFile,asyncHandler(insert));
router.route('/list/').get(asyncHandler(list));
router.route('/detail/:id').get(asyncHandler(read));
router.route('/update/:id').put(extractFile,asyncHandler(update));
router.route('/remove/:id').delete(asyncHandler(remove));


async function insert(req, res) {
  let article = await articleCtrl.insert(req);
  res.json(article);
}

async function read(req, res) {
    let article = await articleCtrl.read(req);
    res.json(article);
}

async function update(req, res) {
    let article = await articleCtrl.update(req);
    res.json(article);
  }

async function remove(req, res) {
    let article = await articleCtrl.remove(req);
    res.json(article);
  }

async function list(req, res) {
    let article = await articleCtrl.list(req);
    res.json(article);
  }

