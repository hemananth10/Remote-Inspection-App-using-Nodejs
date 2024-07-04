const express = require('express');
const app = express();
const path = require('path');

//console.dir(argv);
const port = 3000;
const hostname = "192.168.40.134"; //'192.168.56.134';
const fs = require('fs');
const config = {
    hostname: hostname,    
};
const protocal = 'http';
const server = require(protocal).createServer(config, app);
const SkyRTC = require('./public/dist/js/SkyRTC.js').listen(server);

app.use(express.static(path.join(__dirname, 'public')), null);

server.listen(port, hostname, function () {
    console.log(`Server running at ${protocal}://${hostname}:${port}/`);
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/demo', function (req, res) {
    res.sendfile(__dirname + '/demo.html');
});

SkyRTC.rtc.on('new_connect', function (socket) {
    console.log('New Connection Established');
});

SkyRTC.rtc.on('remove_peer', function (socketId) {
    console.log('User[remove_peer]: ' + socketId + ' Left');
});

SkyRTC.rtc.on('new_peer', function (socket, room) {
    console.log('User[new_peer]: ' + socket.id + ' Joined to Room: ' + room);
});

SkyRTC.rtc.on('socket_message', function (socket, msg) {
    console.log('User[message]: ' + socket.id + ' Message: ' + msg);
});

SkyRTC.rtc.on('ice_candidate', function (socket, ice_candidate) {
    console.log('User[ice_candidate]: ' + socket.id + ' ICE Candidated');
});

SkyRTC.rtc.on('offer', function (socket, offer) {
    console.log('User[offer]: ' + socket.id + ' offered');
});

SkyRTC.rtc.on('answer', function (socket, answer) {
    console.log('User[answer]: ' + socket.id + ' answered');
});

SkyRTC.rtc.on('error', function (error) {
    console.log('Error: ' + error.message);
});