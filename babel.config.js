
module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    'react-native-worklets/plugin',
    ["module-resolver", 
      {
        extensions: [
          ".ios.js",
          ".android.js",
          ".ios.jsx",
          ".android.jsx",
          ".js",
          ".jsx",
          ".json",
          ".ts",
          ".tsx",
          ".d.ts"
        ],
        root: ["."],
        alias: {
          "@src": "./src"
        }
      }
    ],
    [
      'module:react-native-dotenv', 
      {
        envName: 'MY_APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        // blacklist: null,
        // whitelist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      }
    ],
  ]
};