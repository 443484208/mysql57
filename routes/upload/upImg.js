var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

const UPLOAD_PATH = './image';

var upload = multer({
	dest: UPLOAD_PATH
});

router.post('/upload', upload.array("uploadImage"), function(req, res, next) {
	var files = req.files;
	console.log(files);
	const response = [];
	const result = new Promise((resolve, reject) => {
		files.map((v) => {
			fs.readFile(v.path, function(err, data) {
				fs.unlink(`${UPLOAD_PATH}/${v.filename}`, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log('delete ok:' + v.filename);
					}
				});
				if (((v.size / 1024) / 100).toFixed(2) > 50) {
					reject("文件超过50M")
				} else {
					fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
						const result = {
							file: v,
						};
						if (err) {
							reject(err);
						} else {
							console.log(data);
							console.log(err);
						};
						resolve('成功');
					});
				};
			});
		});
	});
	result.then(r => {
		res.json({
			msg: '上传成功',
		});
	}).catch(err => {
		res.json({
			err
		});
	});
})

module.exports = router;
