let through = require('through2'),
	gutil = require('gulp-util');

module.exports = function(opts) {

	opts = opts || {};

	opts.source = opts.source || '';

	opts.id = opts.id || '';
	opts.api = opts.api || '';
	opts.families = opts.families || '';
	opts.urls = opts.urls || '';
	opts.text = opts.text || '';
	opts.version = opts.version || '';
	opts.loadAllFonts = opts.loadAllFonts === false ? false : true;

	opts.classes = opts.classes === false ? false : true;
	opts.events = opts.events === false ? false : true;
	opts.context = opts.context || '';
	opts.timeout = opts.timeout || '';

	opts.tag = opts.tag || 'head';

	let arrayItemsFamilies = "'" + opts.families.join("','") + "'",
		arrayItemsUrls = "'" + opts.urls.join("','") + "'",
		arrayItemsContext = "'" + opts.context.join("','") + "'";


	return through.obj(function(file, enc, cb) {

		if(file.isNull()) return cb(null, file);
		if(file.isStream()) return cb(new Error("Custom plugin: streams not supported."));


		////////////////////////////////////////////////////////////////////////////////////////////////////

		var webfontloaderScript = "<script>\n"+

				"WebFontConfig = {\n";

					if ( opts.source === "custom" ) { webfontloaderScript += 'custom: { families: ['+arrayItemsFamilies+'], urls: ['+arrayItemsUrls+'] }\n'; }

					if ( opts.source === "fontdeck" ) { webfontloaderScript += 'fontdeck: { id: "'+opts.id+'" }\n'; }

					if ( opts.source === "googlefonts" ) { webfontloaderScript += 'google: { families: ['+arrayItemsFamilies+'], text: "'+opts.text+'" }\n'; }

					if (opts.source === "monotype") { webfontloaderScript += 'monotype: { projectId: "'+opts.id+'", version: '+opts.version+', loadAllFonts: '+opts.loadAllFonts+' }\n'; }

					if (opts.source === "typekit") { webfontloaderScript += 'typekit: { id: "'+opts.id+'", api: "'+opts.api+'" }\n'; }


				webfontloaderScript += ", classes: "+opts.classes+"\n";
				webfontloaderScript += ", events: "+opts.events+"\n";
				webfontloaderScript += ", context: frames["+arrayItemsContext+"]\n";
				webfontloaderScript += ", timeout: "+opts.timeout+"\n";

				webfontloaderScript += "};\n"+


				"(function(d) {\n"+

					'"use strict";\n'+
					
					'var wf = d.createElement("script"), s = d.scripts[0];\n'+

						'wf.src = "https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js";\n'+

						'wf.async = "true";\n'+

						"s.parentNode.insertBefore(wf, s);\n"+

				"})(document);";

			webfontloaderScript += "</script>\n  </"+opts.tag+">\n";

		////////////////////////////////////////////////////////////////////////////////////////////////////


		var content = file.contents.toString()
		content = content.replace('<\/' + opts.tag + '>', webfontloaderScript);
		file.contents = new Buffer(content)
		cb(null, file)
	})

}
