var http = require("http"),
    url = require("url"),
    mysql = require("mysql"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    async = require("async"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

// var connect = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password : 'kaito',
//     database : 'test'
// });
// connect.connect();
var catchFirstUrl = 'https://movie.douban.com/subject/1295644/',
    deletRepeat = {},
    urlArray = [],
    catchDate = [],
    pageUrl = [],
    pageNum = 10,
    startDate = new Date(),
    endDate = false;

for(var i = 1; i<pageNum; i++){
    pageUrl.push('http://www.cnblogs.com/?CategoryId=808&CategoryType=%22SiteHome%22&ItemListActionName=%22PostList%22&PageIndex='+ i +'&ParentCategoryId=0');
}

function start(){
    function onRequset(req, res){
        // pageUrl.forEach(function(pageUrl){
            superagent.get(catchFirstUrl).end(function(err, pres){
                var $ = cheerio.load(pres.text);
                var curPageUrls = $('.bs li a');
                for(var i = 0; i< curPageUrls.length; i++){
                console.log(curPageUrls.eq(i).attr('href'));                
                
                //     console.log(curPageUrls.eq(i).text());
                //     // var sql = 'INSERT INTO info(name,url) VALUE("'+curPageUrls.eq(i).text()+'","'+curPageUrls.eq(i).attr('href')+'")';
                //     // var sql = 'SELECT * FROM `info`';
                //     // connect.query(sql, function(err, result, fields){
                //     //     if(err){
                //     //         console.log('err:'+err);
                //     //         return;
                //     //     }
                //     //     console.log(result);
    
                //     // })
                //     // res.write('<p>'+curPageUrls.eq(i).attr('href')+'<p/>');
                //     // curPageUrls.eq(i).text();
                }
                
                // res.end(curPageUrls.text);
            })
        // })
        
        // pageUrl.forEach(function(pageUrl){
        //     superagent.get(pageUrl)
        //         .end(function(err, pres){
        //             var $ = cheerio.load(pres.text);
        //             var curPageUrls = $('.titlelink');
        //             for(var i = 0; i<curPageUrls.length; i++){
        //                 var articleUrl = curPageUrls.eq(i).attr('href');
        //                 urlArray.push(articleUrl);
        //                 ep.emit('BlogArticleHtml', articleUrl);
        //             }
        //         });
        // });
        // ep.after('BlogArticleHtml', pageUrl.length*20, function(articleUrl){
        //     res.write('<br/>');
        //     res.wirte('articleUrl.length is'+articleUrl.length+'<br/>');
        //     for(var i = 0, len = articleUrl.length; i<len; i++){
        //         res.write('articleUrl is'+articleUrl[i]+'<br/>');
        //     }
        // })
    }
    http.createServer(onRequset).listen(8888);
    console.log('server start');
}
exports.start = start;