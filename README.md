# webpack-proficient


webpack 优化


1. 打包速度优化 ( 开发或者构建时优化打包速度 exclude cache-loader)


2. 打包产物优化  (分包处理 减小包体积 cdn服务)



<1> 代码分离 code splitting

  将代码分离到不同的bundle中，之后我们可以按需加载，或者并行加载这些文件

  默认会在首页加载所有js代码 (业务代码、第三方依赖、暂时没有用到的模块) 影响首页速度

  分出更小的bundle 能够做缓存 减少服务端请求流量 ???

   理解:  首先网页实现按需加载  那些延迟加载的模块js不会去请求 代码层面上
  使用 ```import()``` 来定义按需加载的模块, 这是动态倒入的语法, 那代码分割有什么用呢? 首页按需加载的模块只需要请求需要的js 到按需加载的地方 也只需要
  对应需要的chunks 这样请求的流量体积就减小了 速度就能变快

  Webpack中常用的代码分离有三种：
  1.1 入口起点：使用entry配置手动分离代码
  如果index.js 和 main.js入口逻辑独立 就可以采取多入口entry

  防止重复：使用Entry Dependencies或者SplitChunksPlugin去重和分离代码；
  动态导入：通过模块的内联函数调用来分离代码；


  1.2 动态导入
  import() 

  btn.onclick = function () {
    import('xxxx').then((res) => {
      //
    })
  }


 
q1: 分块是不是分的越小越好 通常的策略是什么呢?
并不是 分的越小就代表着请求越多的代码块 可能会降低性能
通常主要路由功能的作为主代码块 占有比较大的体积 大概是几十到几百kb
按需加载模块应该代码比较小 几十kb
共享代码块也比较小 几十kb




2. cdn

一些三方库 引入cdn umd 包去加载 速度比较快



3. 提取css文件 


4. 打包文件命名

  contenthash 根据文件内容去计算 文件特征值 md4



5. 代码压缩

terser (紧凑的)


压缩js
压缩css

6. tree shaking
在optimization中配置usedExports为true，来帮助Terser进行优化；

在package.json中配置sideEffects，直接对模块进行优化；


7. 作用域提升 ? prod模式下会启用

8. 文件压缩 gzip

9. html 代码压缩