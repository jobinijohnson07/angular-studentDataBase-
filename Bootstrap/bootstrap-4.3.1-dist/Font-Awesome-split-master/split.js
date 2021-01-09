var fs = require('fs');
var del = require('del');
var mkdirp = require('mkdirp');
var readline = require('readline');
var yaml = require('yamljs');

var inputFile = './src/icons.yml';
var outputDir = './scss';
var iconsDir = outputDir + '/icons';

console.time('completed in');

// deleting icons dir and creating it again
del.sync(iconsDir);
mkdirp.sync(iconsDir);

fs.exists(inputFile, function (fileok) {
  if(fileok) {
    var icons = yaml.load(inputFile).icons;
    var mainOutput = '';

    for (var i in icons) {
      var icon = icons[i];
      var aliases = [];
      var outputFilename = iconsDir + '/_' + icon.id + '.scss';

      if(icons[i].hasOwnProperty('aliases')) {
        for (var ii in icon.aliases) {
          aliases.push(icon.aliases[ii]);
        }
      }

      var output = '';
      aliases.forEach(function (alias) {
        output += '.#{$fa-css-prefix}-' + alias + ':before,\n';
      });
      output += '.#{$fa-css-prefix}-' + icon.id + ':before {\n';
      output += '  content: $fa-var-' + icon.id + ';\n';
      output += '}\n';

      // {% for icon in icons %}{% for alias in icon.aliases %}
      // .#{$fa-css-prefix}-{{ alias }}:before,{% endfor %}
      // .#{$fa-css-prefix}-{{ icon.id }}:before { content: $fa-var-{{ icon.id }}; }

      fs.writeFile(outputFilename, output);

      mainOutput += '// @include "icons/' + icon.id + '";\n';
    }

    fs.writeFile(outputDir + '/_icons.scss', mainOutput);
  } else {
    console.log("file not found");
  }
});

console.timeEnd('completed in');
