## RN 模板

- 网络请求
- 文件目录结构
- redux 状态管理
- redux 数据持久化
- scss 支持
- 页面自适应
- 默认设计稿 750
- 路由
- dayjs

---

## Usage

- 设置 upstream 到 fork
- 添加自己需要的其他库,本地开发
- fork 更新后合并自己的开发
- 需要修改模板请通知模板负责人

## Demo

pages/demo

## src 目录

- assets app 公共资源
- components app 组件库
- config 环境配置
- constant 全局常值
- lib 公共 js 库
- navigator 导航配置
- pages 页面
- reducer 网络请求和 reducer
- reducer/persistReducer 需要持久化的 reducer
- store
- utils 常用工具函数库
- pages/app.scss 全局主题值

## utils/scalePX 和 utils/scaleStyle

```
const style={
    height:scalePX(20)
}
```

```
const style={
    height:20
}
StyleSheet.create(scaleStyle(style));
```

scaleStyle 文件有 themeMap 和 scaleIgnore,开发时请注意更新

## 优先使用图标库

[图标库](https://oblador.github.io/react-native-vector-icons/)
[使用文档](https://github.com/oblador/react-native-vector-icons)
