//获取http模块
const http = require("http");
// param 是参数，在jsonp中用，res是回复
function getApb(param,res){
	http.request({
	// 主机名
	hostname:'apis.baidu.com',
	// 端口号
	port:'80',
	// 查询路径
	path: '/showapi_open_bus/channel_news/search_news?channelId=5572a109b3cdc86cf39001db&channelName=%E5%9B%BD%E5%86%85%E6%9C%80%E6%96%B0&title=%E4%B8%8A%E5%B8%82&page='+param.page+'&needContent=0&needHtml=0',
	method:'GET',
	// api
	headers:{
		'apikey':'0aea38d1a7c4443f2f00adc86c4c3e72'
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
			res.end(param.callback+"("+str+")")
		})

	// end()是输出数据的方法
	}).end()
};
//导出getApi模块给index.js
exports.getApb = getApb;
