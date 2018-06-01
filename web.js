var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.env.PORT || 8080;
var node_jsdom = require('node-jsdom');

// 서버 생성
http.createServer(function (request, response) {
   // URL 뒤에 있는 디렉토리/파일이름 파싱
   var pathname = url.parse(request.url).pathname;
   var schedule = require('node-schedule');


   console.log("Request for " + pathname + " received.");

   // 파일 이름이 비어있다면 index.html 로 설정
   if(pathname == "/") {
       pathname = "/index.html";
   }

   // 파일을 읽기
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // 페이지를 찾을 수 없음
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }
      else {
         // 페이지를 찾음
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});

         // 파일을 읽어와서 responseBody 에 작성
         response.write(data.toString());
      }
      var job = schedule.scheduleJob('30 * * * * *', function(){
        node_jsdom.env(
          "index.html",
          ["http://code.jquery.com/jquery-3.3.1.min.js"],
          function(errors, window){
            try {
              var primeList = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199];
              var g = Math.floor((Math.random() * 100) + 1);
              var n = primeList[Math.floor(Math.random() * primeList.length)];
              fs.writeFileSync('gn_value.txt', g + '\n' + n, 'utf-8');
              // console.log('WRITE DONE!');
            }
            catch(e) {
              console.log(e);
            }
          }
        );
      });
      // responseBody 전송
      response.end();
   });
}).listen(port);


console.log('Server running at http://127.0.0.1:' + port);
