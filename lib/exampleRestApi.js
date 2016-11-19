var http = require("http");

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

exports.addElement = (element, callback) => {
	var options = {
		hostname: "localhost",
		port: 3000,
		method: "POST",
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
