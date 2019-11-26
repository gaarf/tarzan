module.exports = function(config) {
  config.externals = [
    ...config.externals,
    'react',
    'react-dom'
  ];
  return config;
}