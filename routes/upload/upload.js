var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

const UPLOAD_PATH = './uploads';

var upload = multer({
	dest: UPLOAD_PATH
});

//<pre name="code" class="javascript">//单个文件上传
//upload.single("image") //image为文件name
//获得文件:req.file
//多个相同name文件上传
//upload.array("image",maxCount) //image为多个相同文件name ，maxCount则为最大上传个数 ，也可以不设置
//获得文件 req.files
//多个不同name文件上传
//upload.fields([{name:'image',maxCount:'1'},{name:'txt',maxCount:'2'}])
//name 则为上传文件name  ,maxCount为该name文件最大上传个数 ,可以不设置
//获得文件 req.files.image   req.files.txt
//多文件上传
router.post('/upload', upload.fields([{
	name: 'ss'
}, {
	name: 'sss'
}, {
	name: 'ssss'
}, {
	name: 'fileUpload'
}, {
	name: 'sssss'
}]), function(req, res, next) {
	var files = [];
	for (var key in req.files) {
		for (var i = 0; i < req.files[key].length; i++) {
			files.push(req.files[key][i]);
		}
	};
	console.log(files)
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
						console.log()
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
				}
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
