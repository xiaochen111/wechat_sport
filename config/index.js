import path from 'path';
const config = {
  projectName: 'wechat',
  date: '2020-12-26',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/components/vant-weapp/dist/wxs', to: 'dist/components/vant-weapp/dist/wxs' },
      // { from: 'src/components/vant-weapp/dist/common/style', to: 'dist/components/vant-weapp/dist/common/style' },
      // { from: 'src/components/vant-weapp/dist/common/index.wxss', to: 'dist/components/vant-weapp/dist/common/index.wxss' },
      // { from: 'src/components/vant-weapp/dist/calendar', to: 'dist/components/vant-weapp/dist/calendar' },
      { from: 'src/components/vant-weapp/dist/datetime-picker', to: 'dist/components/vant-weapp/dist/datetime-picker' },
      { from: 'src/components/vant-weapp/dist/picker-column', to: 'dist/components/vant-weapp/dist/picker-column' },
      { from: 'src/components/vant-weapp/dist/dropdown-menu', to: 'dist/components/vant-weapp/dist/dropdown-menu' },
      // { from: 'src/components/vant-weapp/dist/search', to: 'dist/components/vant-weapp/dist/search' },
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/^.van-.*?$/, ],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
