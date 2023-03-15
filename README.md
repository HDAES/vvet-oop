# Vue3 + Vite + ElementPlus + TypeScript 基于面向对象（oop）模块



## 1：安装

```javascript
npm i vvet-oop
```

`Vvet-oop`依赖于elementPlus、vueRouter、axios;

## 2: 使用

创建vue-ts 项目

```
# npm 6.x
npm init vite@latest my-vue-app --template vue-ts

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue-ts

# yarn
yarn create vite my-vue-app --template vue-ts

# pnpm
pnpm create vite my-vue-app -- --template vue-ts
```

修改main.ts 文件，引入`vvet-oop`

```typescript
import  app  from 'vvet-oop/src/app'

app.mount('#app')
```

## 3.运行

```
npm run dev
```

但看到控制台出现 `Hdaes ©Vvet-oop` + 版本号及应用成功！