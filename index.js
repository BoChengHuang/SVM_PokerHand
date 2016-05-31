var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 1234;

var fs = require('fs');
var nodesvm = require('node-svm');
var persistedModel = JSON.parse(fs.readFileSync('./model/model_size_all.json'));
var clf = nodesvm.restore(persistedModel);

app.use(express.static(__dirname + "/public"));

function serverOnListen() {
  console.log("Server is listening at port %d ...", port);
}
server.listen(port, serverOnListen);

io.on("connection", function (socket) {
    console.log("A cleint connected...");
    
    socket.on("guess", function (guess) {
        var prediction = clf.predictSync(guess);
        console.log('Predicted: %d}', prediction);
        io.emit("result", prediction);
    });
    
});

