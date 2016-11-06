var gulp = require("gulp");

//	Copy the unmodified, minified Tachyons CSS file from node_modules to public
gulp.task("tachyons", () => {
	return gulp.src("node_modules/tachyons/css/tachyons.min.css")
		.pipe(gulp.dest("public/css"));
});

gulp.task("default", [
	"tachyons"
]);
