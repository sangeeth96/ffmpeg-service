const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const rawBodyParser = bodyParser.raw({type: '*/*', limit: '200mb'});

const consts = require('../constants.js');
const encoder = require('../encoder.js');

router.post('/mp3', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.MP3_CODEC, function(val) {
		if (val != consts.FFMPEG_ERROR) {
			res.download(val);
			// fs.unlinkSync(__dirname + '/' + val);
		} else {
			res.statusCode = 500;
			res.send();
		}
	});
});
router.post('/m4a', rawBodyParser, function(req, res) {
	encoder.encode(req.body, consts.M4A_CODEC, function(val) {
		if (val != consts.FFMPEG_ERROR) {
			res.download(val);
		} else {
			res.statusCode = 500;
			res.send();
		}
	});
});

module.exports = router;
