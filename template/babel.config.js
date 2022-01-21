const path = require('path');
const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    root: [path.resolve('./')],
    alias: {
      "@assets": "./src/assets",
      "@config": "./src/config",
      "@libLavie": "./src/libLavie",
      "@module": "./src/module",
      "@service": "./src/service",


      "@service-api": "./src/service/api",
      "@navigation": "./src/config/navigation",
      "@utils": "./src/config/utils",
      "@images": "./src/assets/images",
      "@module-redux": "./src/module/redux",
      "@module-saga": "./src/module/saga",

      "@libLavie/component": "./src/libLavie/component",

      // "@lib-rn-uicore": "./src/lib/rn-uicore",
      // "@lib-rn-action": "./src/lib/rn-action",
      // "@lib-rn-uipattern": "./src/lib/rn-uipattern",
      // "@lib-rn-utils": "./src/lib/rn-utils",

    }
  },
];

const WILDCARD = ['wildcard', {
  'exts': ["js"]
}]

module.exports = {
  // plugins: [MODULE_RESOLVER, WILDCARD],
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      exclude: /node_modules/,
      plugins: [MODULE_RESOLVER, WILDCARD]
    }
  ]
};
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
