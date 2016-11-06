var gulp = require("gulp");

//	Copy the unmodified Normalize CSS file from node_modules to public
gulp.task("normalize", () => {
	return gulp.src("node_modules/normalize.css/normalize.css")
		.pipe(gulp.dest("public/css"));
});

//	Copy the unmodified, minified Tachyons CSS file from node_modules to public
gulp.task("tachyons", () => {
	return gulp.src("node_modules/tachyons/css/tachyons.min.css")
		.pipe(gulp.dest("public/css"));
});

gulp.task("default", [
	"normalize",
    "tachyons"
]);
