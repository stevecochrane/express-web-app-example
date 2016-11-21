# express-web-app-example

An example of a web application built with Express, for self-education. This is a front-end client for
[express-rest-api-example](https://github.com/stevecochrane/express-rest-api-example). I didn't have a clever idea this
time like with [andy-wowhol](https://github.com/stevecochrane/andy-wowhol) so instead, this is a boring ol' list of
HTML elements. You can add, edit, and delete elements from the list, and all that's stored and displayed for each
element is a name and a description.

### Preview

![Home](/static/images/preview-home.png?raw=true)

![Add a New Element](/static/images/preview-add.png?raw=true)

### Setup

This expects there to be an API running on http://localhost:3000 (which is what express-rest-api-example runs on by
default), so to use this, that should be running first.

Once you've done that, and assuming you already have [Node](https://nodejs.org/) installed, navigate to the base
directory with a command line interface and do this:

```bash
npm install
gulp
node express-web-app-example.js
```

### Notes

There is still a lot that could be done to optimize things here. The error handling could probably be handled in a more
optimal way, there's a lot of repetition in the exampleRestApi module, the router could be separated out from the main
app file, etc.

Also I took this as an opportunity to try out some different tech, so instead of Jade/Pug, this uses Handlebars, and
this also uses [Tachyons](http://tachyons.io/) for styles. There are actually no new classes in here at all;
everything is done with default Tachyons styles. I'm not sure how I feel about this style yet (there is also a ton of
repetition here in the way the classes are currently declared in the templates) but it's definitely something to
think about.
