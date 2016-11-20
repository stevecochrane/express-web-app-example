var bodyParser  = require("body-parser");
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

//  Set up processing of forms
app.use(bodyParser.urlencoded({ "extended": true }));

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

//	Add a new element
app.get("/add", function(req, res) {
	res.render("add");
});

//	Form handler for the Add page
app.post("/add", function(req, res) {
	exampleRestApi.addElement(req.body, function(err) {
		if (err) {
			res.redirect(303, "/add-error");
		} else {
			res.redirect(303, "/add-success");
		}
	});
});

//	Success page for adding a new element
app.get("/add-success", function(req, res) {
	res.render("add-success");
});

//	Error page for adding a new element
app.get("/add-error", function(req, res) {
	res.status(500);
	res.render("500");
});

//	Delete an element
app.get("/delete/:elementId", function(req, res) {
	res.locals.elementId = req.params.elementId;
	res.render("delete");
});

//	Form handler for the Delete page
app.post("/delete/:elementId", function(req, res) {
	exampleRestApi.deleteElement(req.params.elementId, function() {
		res.redirect(303, "/delete-success");
	});
});

//	Success page for deleting an element
app.get("/delete-success", function(req, res) {
	res.render("delete-success");
});

//	Edit an element
app.get("/edit/:elementId", function(req, res) {
	exampleRestApi.viewElement(req.params.elementId, function(element) {
		res.locals.element = element;
		res.render("edit");
	});
});

//	Form handler for the Edit page
app.post("/edit/:elementId", function(req, res) {
	exampleRestApi.editElement(req.params.elementId, req.body, function() {
		res.redirect(303, "/edit-success");
	});
});

//	Success page for editing an element
app.get("/edit-success", function(req, res) {
	res.render("edit-success");
});

//	Handle 404 errors
app.use(function(req, res) {
	res.status(404);
	res.render("404");
});

//	Handle 500 errors
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render("500");
});

app.listen(app.get("port"), function() {
	console.log("Express started on http://localhost:" + app.get("port") + "; press Ctrl-C to terminate.");
});
