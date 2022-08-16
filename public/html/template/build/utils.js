"use strict";
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === "production" ? "./dist/" : "/dist/";

  return path.posix.join(assetsSubDirectory, _path);
};

exports.cssLoaders = function(options) {
  options = options || {};

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap
    }
  };

  function resolveResouce(name) {
    return path.resolve(__dirname, "../src/assets/scss/" + name);
  }
  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + "-loader",
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: "vue-style-loader",
        publicPath: "../"
      });
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }

  function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      postcssLoader,
      "sass-loader?outputStyle=expanded",
      {
        loader: "sass-resources-loader",
        options: {
          // it need a absolute path
          resources: [resolveResouce("function.scss")]
        }
      },
      {
        loader: "autoprefixer-loader"
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: "vue-style-loader",
        publicPath: "../"
      });
    } else {
      return ["vue-style-loader"].concat(loaders);
    }
  }
  // console.log(generateSassResourceLoader())
  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
    // css: generateLoaders(),
    // postcss: generateLoaders(),
    // less: generateLoaders('less'),
    // sass: generateLoaders('sass', { indentedSyntax: true ,outputStyle:'expanded' }),
    // scss: generateLoaders('sass'),
    // stylus: generateLoaders('stylus'),
    // styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp("\\." + extension + "$"),
      use: loader
    });
  }

  return output;
};
