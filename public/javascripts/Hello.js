$.ajax({
				type: "POST", //提交方式 
				url: "http://127.0.0.1:3000/login", 
				  contentType: "application/x-www-form-urlencoded", //路径
				data: {
					user:'pigWei222',
					age:'19',
					password:'123456',
					email:'55555@qq.com',
					lastTime: '2018-10-10',
				}, //数据，这里使用的是Json格式进行传输
				success: function(result) { //返回数据根据结果进行相应的处理 
					console.log(result)
				},
				err:function(err){
				
				}
			});
