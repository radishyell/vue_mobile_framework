#搭建用于手机端的vue结构

####scss配置
安装依赖`node-sass sass-loader style-loader`

* npm install node-sass --save-dev
* npm install sass-loader --save-dev
* npm install style-loader --save-dev

打开`build`文件夹下面的`webpack.base.config.js`增加scss的规则

```
module: { 
　　　　rules: [{
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
                } 
            ]
        }
```

####vscode中rem配置
安装`cssrem`插件，在右下角设置小图标点击，设置。在拓展里面有一个cssrem configuration。配置 root font size 为100。

####跨域的配置

>在项目目录的`	config/index.js`下的`dev`对象`修改`切记是修改，不是添加。该配置本来就有`proxyTable`这个属性。修改允许跨域。这样我们本地 `0.0.0.0:8080` 也可以请求服务器的地址（很多服务器都会做跨域的限制，做下允许跨域，能节省很多测试的时间）。

```
// 跨域配置
proxyTable: {
    '/api': { //此处并非一定和url一致。
        target: '服务器的接口请求地址',
        changeOrigin: true, //允许跨域
        pathRewrite: {
            '^/api': ''
        }
    }
}
```


####接口的统一管理
* 封装统一的axios请求组件`src/common/config/fetch.js`
* 接口列表`src/common/service/getData.js`
* 创建正式和测试环境地址切换的配置文件`src/common/config/env.js`

####预加载
preloadjs.min.js 必须在index.html里面来引入
```
<script src="./static/preloadjs.min.js"></script>
```


####页面显示和隐藏状态控制


