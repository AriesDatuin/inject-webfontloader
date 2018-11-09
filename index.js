var through = require('through2'),
	gutil = require('gulp-util');

module.exports = function(opts) {

	opts = opts || {};
	opts.fonts = opts.fonts || '';
	opts.tag = opts.tag || 'head';

	var arrayItems = "'" + opts.fonts.join("','") + "'";

	return through.obj(function(file, enc, cb) {

		if(file.isNull()) return cb(null, file);
		if(file.isStream()) return cb(new Error("Custom plugin: streams not supported."));


		////////////////////////////////////////////////////////////////////////////////////////////////////

		var webfontloaderScript = "<script>\n"+

				"WebFontConfig = {\n"+

					"google: {\n"+

						'families: ['+arrayItems+']\n'+

					"}\n"+


				"};\n"+


				"(function(d) {\n"+

					'"use strict";\n'+
					
					'var wf = d.createElement("script"), s = d.scripts[0];\n'+

						'wf.src = "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js";\n'+

						'wf.async = "true";\n'+

						"s.parentNode.insertBefore(wf, s);\n"+

				"})(document);";




				//"</script>"

			webfontloaderScript += "</script>\n  </"+opts.tag+">\n";

		////////////////////////////////////////////////////////////////////////////////////////////////////


		var content = file.contents.toString()
		content = content.replace('<\/' + opts.tag + '>', webfontloaderScript);
		file.contents = new Buffer(content)
		cb(null, file)
	})

}
