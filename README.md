# Inject Web Font Loader

[Visit this page for more information and in-depth documentation for the WebFontLoader API](https://github.com/typekit)

## Information

<table>
<tr>
<td>Package</td><td>inject-webfontloader</td>
</tr>
<tr>
<td>Description</td>
<td>Injects WebFontLoader with support for Fontdeck, Google Fonts, Monotype, Typekit/Adobe Fonts, and custom fonts.</td>
</tr>
<tr>
<td>Node Version</td>
<td>6.4.1</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>4.x</td>
</tr>
</table>


## Usage
#### Install

```bash
$ npm i --save-dev inject-webfontloader
```


## Modules and Examples
### Adobe Edge Web Fonts
When using Adobe Edge Web Fonts, you can use the typekit module by passing in a catenated list of fonts in the id parameter and set the api parameter to point to the Edge Web Fonts URL. [More info](https://github.com/typekit/webfontloader#adobe-edge-web-fonts)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "typekit",
                                    id: 'adamina;advent-pro',
                                    api: '//use.edgefonts.net'}))
               .pipe(gulp.dest("./"));

}
```


### Fontdeck
To use the Fontdeck module, specify the ID of your website. You can find this ID on the website page within your account settings. [More info](https://github.com/typekit/webfontloader#fontdeck)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "fontdeck",
                                    id: 'xxxxxx'}))
               .pipe(gulp.dest("./"));

}
```


### Fonts.com (Monotype)
When using Fonts.com web fonts specify your Project ID. [More info](https://github.com/typekit/webfontloader#fontscom)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "monotype",
                                    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
                                    version: 12345, // Flushes the CDN cache (optional).
                                    loadAllFonts: true })) // Loads all project fonts (optional).
                                    }))
               .pipe(gulp.dest("./"));

}
```


### Google Fonts
Using Google's Font API, name the font families you'd like to load. You can use the same syntax as in the Font API to specify styles. Please note that the Google module does not support the FVD syntax that is used in the custom module. [More info](https://github.com/typekit/webfontloader#google)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "googlefonts",
                                    families: ['Droid Sans', 'Droid:bold']}))
               .pipe(gulp.dest("./"));

}
```

Sometimes the font you requested doesn't come in the default weight (e.g. 400) and you need to explicitly request the variation you want for font events to work (e.g. 300, 700, etc.):

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "googlefonts",
                                    families: ['Open Sans Condensed:300,700']}))
               .pipe(gulp.dest("./"));

}
```

If you need to specify character subsets other than the default (e.g.: greek script in addition to latin), you must append the subset string to the requested family string after a colon. The subset string should follow the Google documentation (subset names separated by commas):

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "googlefonts",
                                    families: ['Open Sans Condensed:300,700:latin,greek']}))
               .pipe(gulp.dest("./"));

}
```


### Typekit
When using Typekit, specify the Kit to retrieve by its ID. You can find the Kit ID within Typekit's Kit Editor interface. [More info](https://github.com/typekit/webfontloader#typekit)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({source: "typekit",
                                    id: 'xxxxxx'}))
               .pipe(gulp.dest("./"));

}
```


### Custom Fonts
To load fonts from any external stylesheet, use the custom module. Here you'll need to specify the font family names you're trying to load, and optionally the url of the stylesheet that provides the @font-face declarations for those fonts.

You can specify a specific font variation or set of variations to load and watch by appending the variations separated by commas to the family name separated by a colon. Variations are specified using FVD notation. [More info](https://github.com/typekit/webfontloader#custom)

```js
import gulp from "gulp";
import webfontloader from "inject-webfontloader";

export function injectwebfontloader() {
    
    return gulp.src("**/*.html")
               .pipe(webfontloader({families: ['My Font', 'My Other Font:n4,i4,n7'],
                                    urls: ['/fonts.css']}))
               .pipe(gulp.dest("./"));

}
```

In this example, the fonts.css file might look something like this:

```css
@font-face {
    font-family: 'My Font';
    src: ...;
}
@font-face {
    font-family: 'My Other Font';
    font-style: normal;
    font-weight: normal; /* or 400 */
    src: ...;
}
@font-face {
    font-family: 'My Other Font';
    font-style: italic;
    font-weight: normal; /* or 400 */
    src: ...;
}
@font-face {
    font-family: 'My Other Font';
    font-style: normal;
    font-weight: bold; /* or 700 */
    src: ...;
}
```

If your fonts are already included in another stylesheet you can also leave out the urls array and just specify font family names to start font loading. As long as the names match those that are declared in the families array, the proper loading classes will be applied to the html element.

```css
@font-face {
    font-family:"My Font";
    src:url("assets/fonts/my_font.woff") format("woff");
}
```


## Options
### classes
It is possible to disable setting classes on the HTML element by setting the classes configuration parameter to false. [More info](https://github.com/typekit/webfontloader#configuration)

    Type: `Boolean`
    Default: `true`

Example:

```js
.pipe(webfontloader({ classes: false }))
```


### events
You can also disable font events (callbacks) by setting the events parameter to false. [More info](https://github.com/typekit/webfontloader#events)

    Type: `Boolean`
    Default: `true`

Example:

```js
.pipe(webfontloader({ events: false }))
```


### context
Usually, it's easiest to include a copy of Web Font Loader in every window where fonts are needed, so that each window manages its own fonts. However, if you need to have a single window manage fonts for multiple same-origin child windows or iframes that are built up using JavaScript, Web Font Loader supports that as well. Just use the optional context configuration option and give it a reference to the target window for loading. [More info](https://github.com/typekit/webfontloader#iframes)

    Type: `String`

Example:

```js
.pipe(webfontloader({ context: 'my-child' }))
```


### timeout
Since the Internet is not 100% reliable, it's possible that a font will fail to load. The fontinactive event will be triggered after 5 seconds if the font fails to render. If at least one font successfully renders, the active event will be triggered, else the inactive event will be triggered.

You can change the default timeout by using the timeout option on the `WebFontConfig` object. [More info](https://github.com/typekit/webfontloader#timeouts)

    Type: `Number`
    Default: `5000`

Example:

```js
.pipe(webfontloader({ timeout: 2000 }))
```


## LICENSE

(MIT License)

Copyright (c) 2018 Aries Datuin <aries@ariesdatuin.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
