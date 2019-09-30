var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

const UPLOAD_PATH = './uploads';
//获取项目工程里的图片
var fs = require('fs'); //引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块

function readFileList(path, filesList) {
	var files = fs.readdirSync(path);
	files.forEach(function(itm, index) {
		var stat = fs.statSync(path + itm);
		if (stat.isDirectory()) {
			//递归读取文件
			readFileList(path + itm + "/", filesList)
		} else {
			var obj = {}; //定义一个对象存放文件的路径和名字
			obj.path = path; //路径
			obj.filename = itm //名字
			filesList.push(obj);
		}
	})
}
var getFiles = {
	//获取文件夹下的所有文件
	getFileList: function(path) {
		var filesList = [];
		readFileList(path, filesList);
		console.log("filesList:",filesList)
		return filesList;
	},
	//获取文件夹下的所有图片
	getImageFiles: function(path) {
		var imageList = [];
		this.getFileList(path).forEach((item) => {
			var ms = image(fs.readFileSync(item.path + item.filename));
			ms.mimeType && (imageList.push(item.filename))
		});
		return imageList;
	}
};
var upload = multer({
	dest: UPLOAD_PATH
});
var getFf = getFiles.getFileList("./uploads/");
// var bigSize
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
	var files=[];
	var fileArray =[];
	for (var key in req.files) {
		for (var i = 0; i < req.files[key].length; i++) {
			let originalname = req.files[key][i].originalname;
			let data = req.files[key][i];
			getFf.map(i => {
				if (i.filename == data.originalname) {
					data.originalname = '-' + data.originalname
				}
			})
			console.log('data:', data)
			if (((data.size / 1024) / 100).toFixed(2) > 50) {
				let a={'name':data.originalname}
				fileArray.push(a);
			} else {
				files.push(data);
			}
			fs.unlink(`${data.destination}/${data.filename}`, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('delete ok:' + data.filename);
				}
			});
		}
	};
	if(fileArray.length>0){
		console.log('fileArray:',fileArray)
		res.json({
			fileArray
		});
	}else{
		const response = [];
		const result = new Promise((resolve, reject) => {
			console.log('5')
			files.map((v, i) => {
				fs.readFile(v.path, function(err, data) {
					fs.writeFile(`${UPLOAD_PATH}/${v.originalname}`, data, function(err, data) {
						const result = {
							file: v,
						};
						if (err) {
							reject(err);
						} else {
							resolve('成功');
						};
					});
				});
			});
		});
		result.then(r => {
			res.json({
				msg: '上传成功',
				code: '200'
			});
		}).catch(err => {
			console.log("err:", err)
			res.json({
				err
			});
		});
	}
	
})

module.exports = router;



// //获取文件夹下的所有图片
// getFiles.getImageFiles("./public/");
//获取文件夹下的所有文件

