var http = require("http");

exports.viewAll = (callback) => {
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
