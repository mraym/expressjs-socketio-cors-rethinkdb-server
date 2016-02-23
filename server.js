var express = require("express");
var sockio = require("socket.io");
var r = require("rethinkdb");
var cors = require("cors")

var app = express();
// enable cors for everyone
app.use(cors());

var io = sockio.listen(app.listen(9443), {log: true});
console.log("NodeJS SocketIO Server started on port " + 9443);

r.connect({db: "test"}).then(function(c) {

  // Emit new workitem to socket io listeners
  r.table("workitems").filter(r.row("status").eq("new")).changes().run(c)
    .then(function(cursor) {
      cursor.each(function(err, item) {
        //console.log("new workitem detected: " + JSON.stringify(item));
        console.log("new workitem detected: " + JSON.stringify(item.new_val));
        io.sockets.emit("new workitem", item.new_val);
      });
    });
});
