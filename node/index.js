//  官方提供的module
const http= require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const querystring = require("querystring");
// 自定义的module
const mime = require("./mime.js");
const getApi = require("./getApi.js");
const  getApb = require('./getApb.js');
// 自定义param
// const param = {
// 	callback:"JSON_CALLBACK",
// 	page:1
// }
// 主机名
const hostname ="10.3.131.240";
// 端口号
const port = 8888;
var i = 0;
//启动服务
http.createServer(function(req,res){
	// 获取浏览器地址
	// 浏览器完整地址------->http://10.3.131.240:8888/getApi?callback=JSON_CALLBACK&page=2
	// req.url--------------->getApi?callback=J&page=2&rows=1
	//提取路径
	console.log(i++)
	var pathname = url.parse(req.url).pathname;
	// pathname---------------->/getApi
	//拿url的参数
	var paramStr = url.parse(req.url).query;
	//把url拿回来的参数处理成对象
	console.log('paramStr------------------>'+paramStr)
	//paramStr------------------->callback=J&page=2&rows=1
	var param = querystring.parse(paramStr);
	//param=====================>[{callback:J},{page:2}]
	//拼接成绝对本地路径（__dirname === F:/node）
	var abs_path = __dirname +"/webroot"+pathname;

	
	// 此时需要作出判断，
	// fs 读取 本地的文件  还是 jsonp 数据
	// 因此 需要查看浏览器地址有没有输入本地的文件（例如：index.html）
	fs.exists(abs_path,function(exists){
		// exists 返回一个布尔值，如果为true 则说明存在
		if(exists){
			fs.readFile(abs_path,'binary',function(err,data){
				// 获取pathname的扩展名
				var ext = path.extname(pathname);
				//细节：去掉  . ext----->.html
				    ext = ext.slice(1);
				// 获取Content-Type的类型 mime是mime.js
				var contentType = mime.types[ext];
				//  res 请求文件头
				res.writeHead(200,{
					"Content-Type":contentType
				});
				//输出数据
				res.end(data,"binary")
				console.log("进入webroot的文件")
			})
		}
	});
	// 根据路由决定分支是进入webroot文件夹还是作为数据接口
	// 通过此处可以绑定多个接口
	switch(pathname){
		case '/getApi':
			getApi.getApi(param,res);
			
			// param------>[{callback:J},{page:2}]
			// 服务器请求数据得到两个参数
			break;
		case '/getApb':
			getApb.getApb(param,res);
			break;
		default :
			break;
	}
	// 用fs读取本地webroot中文件,通过二进制binary
}).listen(port,hostname,function(){
	console.log("在浏览器输入http://"+hostname+":"+port+"/getApi")
})
