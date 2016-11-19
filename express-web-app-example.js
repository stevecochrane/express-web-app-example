var compression = require("compression");
var express     = require("express");
var handlebars  = require("express-handlebars");

//	Include the local exampleRestApi library
var exampleRestApi = require("./lib/exampleRestApi.js");

//	Initialize Express
var app = express();

//	Treat "/foo" and "/Foo" as different URLs
app.set("case sensitive routing", true);

//	Treat "/foo" and "/foo/" as different URLs
app.set("strict routing", true);

//	Default to port 3001
app.set("port", process.env.PORT || 3001);

//	Compress all requests
app.use(compression());

//	Set Handlebars as the default template language
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//	Serve static contents from the public directory
app.use(express.static(__dirname + "/public"));

//	Default app view, which displays all elements from the API
app.get("/", function(req, res) {
	exampleRestApi.viewAllElements(function(elements) {
		res.locals.elements = elements;
		res.render("home");
	});
});

//	View a specific element
app.get("/element/:elementId", function(req, res) {
	exampleRestApi.viewElement(req.params.elementId, function(element) {
		res.locals.element = element;
		res.render("element");
	});
});

//	Handle 404 errors
app.use(function(req, res) {
	res.type("text/plain");
	res.status(404);
	res.send("404 - Not Found");
});

//	Handle 500 errors
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type("text/plain");
	res.status(500);
	res.send("500 - Server Error");
});

app.listen(app.get("port"), function() {
	console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
