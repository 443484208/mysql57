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
			let originalname=req.files[key][i].originalname;
			let data=req.files[key][i];
			// fs.exists('uploads/' + originalname, function(exists) {
			// 	if (exists == true) {
			// 		console.log('已有重复文件:' +originalname);
			// 	} else {
			// 		files.push(data);
			// 	}
			// });
			files.push(data);
		}
	};
	const response = [];
	const result = new Promise((resolve, reject) => {
		var exceed=[];
		files.map((v,i) => {
			fs.readFile(v.path, function(err, data) {
				if (((v.size / 1024) / 100).toFixed(2) > 50) {
					exceed=v;
					console.log('exceedkk',exceed)
				} else {
					fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
						const result = {
							file: v,
						};
						if (err) {
							reject(err);
						} else {
							// resolve('成功');
						};
					});
				}
				if((i+1)==files.length){
					console.log('exceedkkk',exceed)
					resolve(exceed);
				}
				fs.unlink(`${UPLOAD_PATH}/${v.filename}`, (err) => {
					if (err) {
						console.log(err);
					} else {
						console.log('delete ok:' + v.filename);
					}
				});
			});
		});
	});
	result.then(r => {
		console.log('r:',r)
		res.json({
			msg: '上传成功',
			code: '200'
		});
	}).catch(err => {
		console.log("err:",err)
		res.json({
			err
		});
	});
})

module.exports = router;