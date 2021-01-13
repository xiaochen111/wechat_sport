module.exports = {
  'extends': ['taro/react'],
  ignorePatterns:['config/*','babel.config.js','src/components/vant-weapp'],
  "rules": {
    "prettier/prettier": "error",
    "jsx-quotes": 0,
    "import/first":0,
    "import/order":1
  },
  "plugins": ["prettier"],
}
// 使用ESLint运行Prettier  https://www.jianshu.com/p/d6a69eb08f07