var http=require("http")
var qstr = require("queryString");
var url = require("url");
var server = http.createServer(function(req,res)
{
    res.setHeader("content-type","text/html");
    var purl = url.parse(req.url);
    var query = purl.query;
    var p_query = qstr.parse(query);
    
    res.sendFile(__dirname+"\\C:\\Users\\JITHIN V J\\OneDrive\\Desktop\\WUID\\Web Project\\loginpage.html")
    res.end();

});
server.listen(5050);
console.log("@5050 hi jijin");