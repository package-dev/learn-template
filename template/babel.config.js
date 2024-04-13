const path = require('path')
const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    root: [path.resolve('./')],
    alias: {
      '@assets': './src/assets',
      '@api': './src/api',
      '@screens': './src/screens',
      '@services': './src/services',
      '@navigation': './src/navigation',
      '@utils': './src/utils',
      '@stores': './src/stores',
      '@components': './src/components',

    },
  },
]

const WILDCARD = [
  'wildcard',
  {
    exts: ['js'],
  },
]

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      exclude: /node_modules/,
      plugins: [MODULE_RESOLVER, WILDCARD,
        'react-native-reanimated/plugin'
      ],
    },
  ],
}
