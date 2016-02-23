# Install nodejs packages
npm install express --save
npm install socket.io --save
npm install rethinkdb --save
npm install cors --save

# Run the server in the background in ubuntu
nodejs server.js >> out.log 2>&1 &
