// 配置文件
const devConfig = require('./dev.config');
const proConfig = require('./pro.config');
const commonConfig = require('./common.config');

module.exports = Object.assign({}, commonConfig, global.__DEV__ ? devConfig : proConfig);
