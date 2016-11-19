var http        = require("http");
var querystring = require("querystring");

exports.viewAllElements = (callback) => {
	var options = {
		hostname: "localhost",
		port: 3000,
		method: "GET",
		path: "/api/elements"
	};
	http.request(options, (res) => {
		var data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			callback(JSON.parse(data));
		});
	}).end();
};

exports.viewElement = (elementId, callback) => {
	var options = {
		hostname: "localhost",
		port: 3000,
		method: "GET",
		path: "/api/element/" + elementId
	};
	http.request(options, (res) => {
		var data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			callback(JSON.parse(data));
		});
	}).end();
};

exports.addElement = (elementData, callback) => {
	var postData = querystring.stringify(elementData);
	var options = {
		hostname: "localhost",
		port: 3000,
		method: "POST",
		path: "/api/elements",
		headers: {
			"Content-Type":   "application/x-www-form-urlencoded",
			"Content-Length": Buffer.byteLength(postData)
		}
	};
	var req = http.request(options, (res) => {
		res.setEncoding("utf8");
		res.on("data", (chunk) => {
			//	I'm not sure why this event handler is necessary, but if I remove this, the process hangs.
		});
		res.on("end", () => {
			callback();
		});
	});
	req.write(postData);
	req.end();
};

exports.deleteElement = (elementId, callback) => {
	var options = {
		hostname: "localhost",
		port: 3000,
		method: "DELETE",
		path: "/api/element/" + elementId
	};
	http.request(options, (res) => {
		var data = "";
		res.on("data", (chunk) => {
			data += chunk;
		});
		res.on("end", () => {
			callback(JSON.parse(data));
		});
	}).end();
};
