let Router = require('koa-router');
let router = new Router();
let adminControl = require('../controllers/admin');

router.post('/api/getCheckCode', adminControl.getCheckCode);

module.exports = router;