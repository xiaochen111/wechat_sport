module.exports = {
  'extends': ['taro/react'],
  ignorePatterns:['config/*','babel.config.js','src/components/vant-weapp'],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "jsx-quotes":0
  }
}
// 使用ESLint运行Prettier  https://www.jianshu.com/p/d6a69eb08f07