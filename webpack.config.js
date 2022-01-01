const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  // Use babel specifically on victory-native files
  config.module.rules.push({
    test: /.*victory-native[\/\\].*\.js/,
    use: {
      loader: 'babel-loader'
    }
  })
  return config;
};
