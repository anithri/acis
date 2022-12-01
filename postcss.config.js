const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    postcssPresetEnv({ stage: 0, features: { "nesting-rules": false } }),
  ],
};
