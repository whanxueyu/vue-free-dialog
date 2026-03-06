<script setup lang="ts">
// 定义组件props
interface Props {
  code: string;
}

const props = withDefaults(defineProps<Props>(), {
  code: "vue",
});
</script>

<template>
  <pre class="tool-code">{{ props.code }}</pre>
</template>

<style scoped lang="scss">
.tool-code {
  padding: 0;
  margin: 0;
  overflow: auto;
  color:#dbedfd;
  height: 100%;
}
</style>
