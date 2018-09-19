const helpers = require('../utils/helpers');
const polyfill = require('../utils/polyfill');
const alaCarte = require('../utils/alaCarte');
const fonts = require('./fonts');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));
  lines.splice(lastImportIndex += 1, 0, `import '@babel/polyfill';`);
  return lines;
}

/**
 * If you switch from partial import to full import.
 * You need to remove the `transform-imports` configuration added for the partial import in the `babel.config.js` file.
 * Finally, you need to rerun the service.
 */
function removeTransformImports(api) {
  // ~~vuetify.preventFullImport = false;~~
  helpers.updateBabelConfig(api, cfg => {
    if (cfg.plugins) {
      for (let i = 0, len = cfg.plugins.length; i < len; i += 1) {
        const temp = cfg.plugins[i];
        if (temp[0] === 'transform-imports' && temp[1] && temp[1].vuetify) {
          const vuetify = temp[1].vuetify;
          if (vuetify.transform === 'vuetify/es5/components/${member}' && vuetify.preventFullImport) {
            cfg.plugins.splice(i, 1);
            return cfg;
          }
        }
      }
    }

    return cfg;
  });
}

module.exports = (api, opts) => {
  api.extendPackage({
    dependencies: {
      vuetify: '^1.2.3',
    },
    devDependencies: {

    },
  });

  polyfill.addDependencies(api);
  opts.import === 'partial'&& alaCarte.addDependencies(api)
  opts.installFonts && fonts.addDependencies(api, opts.iconFont);
  opts.installFonts && fonts.addImports(api, opts.iconFont);

  api.injectImports(api.entryFile, `import './plugins/vuetify';`);
  const files = {
    './src/plugins/vuetify.js': '../plugins/vuetify/index.js',
    './src/components/snackbar/index.js': '../plugins/vuetify/components/snackbar/index.js',
    './src/components/snackbar/src/main.js': '../plugins/vuetify/components/snackbar/src/main.js',
    './src/components/snackbar/src/Main.vue': '../plugins/vuetify/components/snackbar/src/Main.vue',
  };

  api.render(files, { opts });
  if (opts.customTheme) {
    const files = {
      './src/stylus/main.styl': '../plugins/vuetify/template/stylus/main.styl',
    };

    api.render(files, opts);
    api.extendPackage({
      dependencies: {

      },
      devDependencies: {
        'css-loader': '^1.0.0',
        'stylus': '^0.54.5',
        'stylus-loader': '^3.0.2',
      },
    });
  }

  api.onCreateComplete(() => {
    polyfill.updateBabelConfig(api);
    polyfill.updateBrowsersList(api);
    polyfill.addImports(api);
    opts.import === 'partial' && alaCarte.updateBabelConfig(api);
    !opts.installFonts && fonts.addLinks(api, opts.iconFont);

    // hack
    opts.import === 'full' && removeTransformImports(api);
  });
};
