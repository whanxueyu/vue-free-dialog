<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

// 定义组件props
interface Props {
  code: string          // 接收父组件传入的代码
  language: string      // 代码语言类型（如 'javascript', 'python', 'vue' 等）
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue'       // 默认语言类型
})

const emit = defineEmits(['update:code'])

// 计算高亮后的代码
const highlightedCode = computed(() => {
  return hljs.highlight(props.code, { language: props.language }).value
})

// 处理内容变化事件
// 修改事件处理函数参数类型
const preChange = (e: Event) => {
  // 类型断言确保目标是HTMLElement
  const target = e.target as HTMLElement
  const newCode = target.innerText
  emit('update:code', newCode)
}

// 监听代码变化并更新高亮（计算属性已自动处理）
</script>

<template>
  <pre 
    @input="preChange" 
    contenteditable="true" 
    v-html="highlightedCode" 
    class="tool-code hljs"
    :class="`hljs ${language}`" 
  ></pre>
</template>

<style scoped lang="scss">
.tool-code {
  padding: 0;
  margin: 0;
  overflow: auto;
  white-space: pre;
  background: #ffffff8c;
  color: #0084ff;
  height: 100%;
}
</style>