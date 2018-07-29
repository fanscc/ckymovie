//1、引入模块  使用的http服务协议是RFC2616  nodejs的作者已经写好了，直接引入就行
var http = require('http');
//引入文件读写模块fs
var fs = require('fs');
var cp = require('child_process');  // 可自动打开浏览器模块
var startindex = require('./index'); 
startindex()  
//2、创建服务器    函数的参数req是发送给服务器的请求，res是服务器的相应
var httpObj = http.createServer(function(req,res){
    //编写url  其中index.html是要服务器读取的文件
    var url = req.url=='/'?'index.html':'.'+req.url;
    console.log(url);  
        //开始文件读取，参数分别是完整的url 编码 和读取完毕执行的函数，注意前后台编码需要一致
        fs.readFile(url,'utf-8', function(err,data){
            //res.write服务器的相应，当成功的时候，服务器会传输一个data数据，相应结束需要end
            if(err){ 
                res.write('404,您访问的页面不存在');
                res.end();    
            }else{
                res.write(data);
                res.end();    
            }
        }); 
});
//监听端口
httpObj.listen(8989);
console.log('服务已启动');
cp.exec('start http://127.0.0.1:8989');  // 自动打开默认浏览器