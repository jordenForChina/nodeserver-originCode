//获取http模块
const http = require("http");
// param 是参数，在jsonp中用，res是回复
function getApi(param,res){
	// ####此时是node服务器想接口服务器发送请求
	http.request({
	// 主机名
	hostname:'api.avatardata.cn',
	// 端口号
	port:'80',
	// 查询路径
	path:'/HistoryToday/LookUp?key=3870d5bad7c842439ec614869698d04e&yue=1&ri=1&type=1&page='+param.page+'&rows=5',
	method:'GET',
	// api
	headers:{
		'apikey':'3870d5bad7c842439ec614869698d04e'
	},

	},function(request){
		// 设置编码方式
		request.setEncoding('utf-8');
		// 建立一个str接收数据
		var str = "";
		// 开始请求数据，并存到str中
		request.on("data",function(data){
			str += data;

		});
		// 当所有数据请求完，打印数据
		request.on("end",function(data){
			
			// 当数据完全获得的时候。把他们组装成jsonp
			// param.callback是接口的参数，是自定义，但jsonp接收的数据
			// 要写成JSON_CALLBACK()
			res.end(param.callback+"("+str+")")
		})

	// end()是输出数据的方法
	}).end()
};
//导出getApi模块给index.js
exports.getApi = getApi;
