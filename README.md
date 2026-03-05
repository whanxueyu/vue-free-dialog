# vue-free-dialog

一个基于 Vue 3 + TypeScript 的轻量级、高自由度对话框组件，支持拖拽、缩放、折叠、动画等丰富功能。**零第三方依赖**，仅依赖 Vue 3。

[![Vue](https://img.shields.io/badge/Vue-3.5.13+-green.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Supported-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ 特性亮点

- **🎯 自由拖拽** - 支持任意位置拖拽，智能边界限制
- **📐 多向缩放** - 8 方向自由缩放（上下左右 + 四角）
- **📌 折叠展开** - 折叠为可拖拽图标，双击快速展开
- **🎬 智能动画** - 5 种入场/出场动画，根据位置自动选择
- **🎨 灵活定制** - 支持 SVG/图片图标、自定义样式、插槽
- **📱 响应式** - 自动适配窗口大小，防止超出边界
- **🔒 安全关闭** - 支持异步关闭验证
- **💻 类型安全** - 完整 TypeScript 类型定义
- **🚀 零依赖** - 仅依赖 Vue 3，无任何 UI 库绑定
- **🔝 自动置顶** - 点击或拖拽时自动提升到最上层，无需手动设置 z-index

---

## 📦 安装

```bash
npm install vue-free-dialog
```

或直接使用组件文件：
```bash
# 克隆项目
git clone https://github.com/whanxueyu/vue-free-dialog.git
# 复制 src/components/free-dialog.vue 到你的项目
```

---

## 🔧 快速开始

### 基础示例

```vue
<template>
  <free-dialog 
    v-model:visible="visible"
    title="我的对话框"
    :width="400"
    :height="300"
  >
    <p>这是对话框内容</p>
  </free-dialog>
  
  <button @click="visible = true">打开对话框</button>
</template>

<script setup>
import { ref } from 'vue'
import FreeDialog from './components/free-dialog.vue'

const visible = ref(false)
</script>
```

### 高级示例

```vue
<template>
  <free-dialog
    v-model:visible="dialogVisible"
    title="高级配置"
    :draggable="true"
    :handles="true"
    :width="600"
    :height="400"
    :min-width="300"
    :min-height="200"
    icon="M512 64C264.6 64..."  // SVG 路径
    animation
    :before-close="handleBeforeClose"
  >
    <!-- 自定义标题 -->
    <template #title>
      <span>自定义标题</span>
    </template>
    
    <!-- 底部按钮 -->
    <template #footer>
      <button @click="dialogVisible = false">取消</button>
      <button @click="confirm">确定</button>
    </template>
  </free-dialog>
</template>

<script setup>
import { ref } from 'vue'
import FreeDialog from './components/free-dialog.vue'

const dialogVisible = ref(false)

const handleBeforeClose = async () => {
  const confirmed = await confirmAction()
  if (!confirmed) {
    throw new Error('用户取消关闭') // 阻止关闭
  }
}
</script>
```

---

## 📖 API 文档

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| warpper | 容器 ID，作为定位参照元素 | `string` | `#app` | 否 |
| title | 弹框标题 | `string` | - | 否 |
| visible | 是否显示对话框 | `boolean` | `true` | 否 |
| show | 弹窗是否默认显示 | `boolean` | `false` | 否 |
| draggable | 是否可拖拽 | `boolean` | `true` | 否 |
| closeable | 是否可关闭 | `boolean` | `true` | 否 |
| closeButton | 是否显示关闭按钮 | `boolean` | `true` | 否 |
| animation | 是否开启动画或动画 class 名 | `boolean \| string` | `true` | 否 |
| width | 初始宽度 | `number \| string` | - | 否 |
| height | 初始高度 | `number \| string` | - | 否 |
| left | 定位 left 值 | `number \| string` | - | 否 |
| right | 定位 right 值 | `number \| string` | - | 否 |
| top | 定位 top 值 | `number \| string` | - | 否 |
| bottom | 定位 bottom 值 | `number \| string` | - | 否 |
| position | 统一设置位置属性（优先级更高） | `Position` | - | 否 |
| handles | 缩放控制器 | `boolean \| string` | `false` | 否 |
| minWidth | 最小宽度 | `number` | `100` | 否 |
| minHeight | 最小高度 | `number` | `100` | 否 |
| maxWidth | 最大宽度 | `number` | `window.innerWidth` | 否 |
| maxHeight | 最大高度 | `number` | `window.innerHeight` | 否 |
| zIndex | 层级 | `number` | `900` | 否 |
| icon | 标题栏图标（SVG 路径或图片 URL） | `string` | - | 否 |
| customClass | 自定义 class | `string` | - | 否 |
| defaultFold | 是否默认折叠 | `boolean` | `false` | 否 |
| thumbnail | 折叠状态下的配置项 | `ThumbnailConfig` | - | 否 |
| beforeClose | 关闭前的回调函数 | `() => Promise<any> \| boolean \| void` | - | 否 |

#### Position 类型

```typescript
interface Position {
  left?: number | string
  right?: number | string
  top?: number | string
  bottom?: number | string
}
```

#### ThumbnailConfig 类型

```typescript
interface ThumbnailConfig {
  left?: number | string    // 缩略图定位 left 值
  right?: number | string   // 缩略图定位 right 值
  top?: number | string     // 缩略图定位 top 值
  bottom?: number | string  // 缩略图定位 bottom 值
  icon?: string             // 图标：SVG 路径或图片 URL
}
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 可见性变化时触发 | `(value: boolean)` |
| resize | 调整大小时触发 | `-` |
| move | 移动时触发 | `-` |
| closed | 关闭后触发 | `-` |

### Slots

| 名称 | 说明 |
|------|------|
| default | 对话框默认内容 |
| title | 自定义标题栏内容（覆盖 title prop） |
| footer | 底部操作区 |

### 暴露的方法

通过 `ref` 调用组件内部方法：

```vue
<template>
  <free-dialog ref="dialogRef" />
</template>

<script setup>
const dialogRef = ref(null)

// 展开对话框
dialogRef.value.expend()

// 折叠对话框
dialogRef.value.fold()

// 切换折叠状态
dialogRef.value.toggle()

// 设置尺寸
dialogRef.value.setSize('width', 500)
dialogRef.value.setSize('height', 400)

// 设置位置
dialogRef.value.setPosition('left', 100)
dialogRef.value.setPosition('top', 50)
</script>
```

| 方法名 | 说明 | 参数 |
|--------|------|------|
| expend() | 展开对话框 | - |
| fold() | 折叠对话框 | - |
| toggle() | 切换折叠状态 | - |
| setSize(attr, value) | 设置尺寸 | `attr: 'width' \| 'height'`, `value: number` |
| setPosition(attr, value) | 设置位置 | `attr: 'left' \| 'top'`, `value: number` |

---

## 🎨 使用场景

### 1. 固定位置对话框

```vue
<free-dialog
  v-model:visible="visible"
  :left="50"
  :top="100"
  :width="400"
>
  固定在左侧的对话框
</free-dialog>
```

### 2. 自适应宽度对话框

```vue
<free-dialog
  v-model:visible="visible"
  :left="100"
  :right="100"
  :height="300"
>
  自动计算宽度的对话框（填满左右间距）
</free-dialog>
```

### 3. 可缩放对话框

```vue
<free-dialog
  v-model:visible="visible"
  :handles="true"
  :min-width="200"
  :min-height="150"
>
  支持 8 方向缩放的对话框
</free-dialog>
```

### 4. 折叠式对话框

```vue
<free-dialog
  v-model:visible="visible"
  :default-fold="false"
  :thumbnail="{
    icon: 'M8 16a2 2 0 0 0 2-2H6...', // SVG 路径或图片 URL
    left: 10,
    top: 100
  }"
>
  可折叠为图标的对话框，双击图标展开
  拖拽图标可移动位置
</free-dialog>
```

### 5. 带确认关闭的对话框

```vue
<free-dialog
  v-model:visible="visible"
  :before-close="handleBeforeClose"
>
  关闭前需要确认的对话框
</free-dialog>

<script setup>
const handleBeforeClose = async () => {
  const result = await confirmAction()
  if (!result) {
    throw new Error('取消关闭') // 阻止关闭
  }
}
</script>
```

### 6. 自动置顶功能

对话框支持自动层级管理，点击或拖拽时会自动提升到最上层：

```vue
<template>
  <div>
    <!-- 多个对话框重叠时，点击任意一个会自动显示在最前 -->
    <free-dialog v-model:visible="visible1" :left="20" :top="20">
      对话框 1 - 点击我会自动到最上层
    </free-dialog>
    
    <free-dialog v-model:visible="visible2" :left="100" :top="100">
      对话框 2 - 点击我也会自动到最上层
    </free-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FreeDialog from './components/free-dialog.vue'

const visible1 = ref(true)
const visible2 = ref(true)
</script>
```

**特性说明：**
- ✅ 点击对话框任意位置自动置顶
- ✅ 拖拽时自动提升到最上层
- ✅ 智能管理 z-index，避免层级冲突
- ✅ 不影响其他对话框的相对层级关系

---

### 7. 自定义图标

**使用 SVG 路径：**
```vue
<script setup>
import mySvg from './assets/icon.svg'
</script>
<template>
  <free-dialog
    v-model:visible="visible"
    title="带自定义图标的对话框"
    :icon="mySvg"
  >
    使用 SVG 路径作为图标
  </free-dialog>
</template>
```

**使用图片 URL：**
```vue
<script setup>
import myIcon from './assets/icon.png'
</script>

<template>
  <free-dialog :icon="myIcon">
    使用导入的图片作为图标
  </free-dialog>
</template>
```

---

## 🎬 动画说明

组件内置 5 种智能动画，根据对话框位置自动选择：

- **fadein-right**：从右侧滑入（当 right 值较小时）
- **fadein-left**：从左侧滑入（当 left 值较小时）
- **fadein-down**：从上方滑落（当 top 值较小时）
- **fadein-up**：从下方升起（当 bottom 值较小时）
- **fadein-center**：中心缩放淡入（默认）

对应的出场动画会自动匹配：

- fadein-right → fadeout-left
- fadein-left → fadeout-right
- fadein-down → fadeout-up
- fadein-up → fadeout-down
- fadein-center → fadeout-center

也可自定义动画 class：

```vue
<free-dialog animation="my-custom-animation" />
```

---

## ⚙️ 全局配置

可通过 `globalConfig` 对象设置全局默认配置：

```typescript
// 在组件加载前设置
import { defineComponent } from 'vue'
import FreeDialog from './components/free-dialog.vue'

// 修改全局容器
FreeDialog.globalConfig.warpper = '#custom-container'
```

---

## 🎯 注意事项

1. **容器要求**：组件默认使用 `#app` 作为定位容器，确保该元素存在或使用 `warpper` prop 指定其他容器
2. **位置优先级**：`position` prop 优先级高于单独的 `left/right/top/bottom`
3. **单位支持**：支持数字（自动转 px）和字符串（如 `'50%'`, `'10rem'`）
4. **折叠逻辑**：折叠状态下只显示缩略图图标，双击可展开，拖拽可移动
5. **缩放限制**：受 `minWidth/minHeight/maxWidth/maxHeight` 约束
6. **自动调整**：窗口大小变化时自动调整对话框，防止超出边界
7. **图标格式**：
   - SVG 路径：只需 `<path>` 的 `d` 属性值，不需要完整的 `<svg>` 标签
   - 图片 URL：支持 http/https 链接或本地导入的图片
8. **拖拽优化**：折叠图标已禁用浏览器原生拖拽，完全由自定义拖拽控制

---

## 🔧 开发说明

### 技术栈

- **Vue 3.x** - 渐进式 JavaScript 框架
- **TypeScript** - JavaScript 的超集
- **Vite** - 下一代前端构建工具
- **SCSS** - CSS 预处理器
- **零第三方依赖** - 仅依赖 Vue 3 核心库

### 本地开发

```bash
# 克隆项目
git clone https://github.com/whanxueyu/vue-free-dialog.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 构建

```bash
npm run build
```

---

## 📄 License

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 🌟 在线预览

访问 [vue-free-dialog](https://free-dialog.netlify.app/) 查看完整示例和效果展示。

---

## 📚 更新日志

### v1.0.0
- ✅ 完全移除 Element Plus 依赖，使用原生 SVG 图标
- ✅ 完全移除 highlight.js 依赖
- ✅ 优化折叠图标拖拽体验，禁用浏览器原生拖拽
- ✅ 支持 SVG 路径和图片 URL 两种图标格式
- ✅ 改进缩略图位置初始化逻辑
- ✅ 增强拖拽性能和边界检测
