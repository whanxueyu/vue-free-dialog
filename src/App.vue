<script setup lang="ts">
import FreeDialog from "./components/free-dialog.vue";
import { ref } from "vue";
import vueIcon from "./assets/vue.svg";
import CodePreview from "./components/code-preview.vue";
const showDialog1 = ref(true);
const showDialog2 = ref(false);
const showDialog3 = ref(false);
const showDialog4 = ref(false);
const showDialog5 = ref(false);
const showDialog6 = ref(false);
const showDialog7 = ref(false);
const showDialog8 = ref(false);

const code1 = ref(`
  title="从左侧弹出" 
  :width="400" 
  height="280" 
  :left="20"
  `);
const code2 = ref(`
  title="弹窗居中" 
  :width="400" 
  height="280" 
  left="calc(50% - 100px)"
  `);
const code3 = ref(`
  title="从右侧弹出" 
  :width="400" 
  height="280" 
  :right="20"`);
const code4 = ref(`
  title="折叠带图标" 
  :top="300" 
  :width="400" 
  height="280" 
  :left="20" 
  @closed="handleFold" 
  :thumbnail="{icon: 'BellFilled'}"
  `);
const code5 = ref(`
  title="带ICON弹窗" 
  :top="300" 
  icon='PieChart' 
  :width="400" 
  height="280" 
  left="calc(50% - 100px)" 
  `);
const code6 = ref(`
  title="没有头部" 
  :width="400" 
  :top="300" 
  height="280" 
  :right="20" 
  :draggable="false"
  `);
const code7 = ref(`
  :top="600" 
  :width="400" 
  height="280" 
  :left="20" 
  <template #title>
    <div class="slottitle">
      <div class="text-sub">
        自定义头部
      </div>
    </div>
  </template>`);
const code8 = ref(` 
  title="footer自定义" 
  :top="600" 
  :width="400" 
  height="280" 
  left="calc(50% - 100px)" 
  <template #footer>
    <div class="footer">
    </div>
  </template>
  `);

const dialogRef = ref<InstanceType<typeof FreeDialog>>();
const handleFold = () => {
  dialogRef.value?.fold();
};
</script>

<template>
  <div class="openDialog">
    <div class="btn btn-primary" @click="showDialog1 = !showDialog1">
      弹窗左
    </div>
    <div class="btn btn-primary" @click="showDialog2 = !showDialog2">
      弹窗中
    </div>
    <div class="btn btn-primary" @click="showDialog3 = !showDialog3">
      弹窗右
    </div>
    <div class="btn btn-success" @click="showDialog4 = !showDialog4">
      可折叠弹窗
    </div>
    <div class="btn btn-success" @click="showDialog5 = !showDialog5">
      带 ICON 弹窗
    </div>
    <div class="btn btn-success" @click="showDialog6 = !showDialog6">
      没有头部
    </div>
    <div class="btn btn-primary btn-plain" @click="showDialog7 = !showDialog7">
      头部自定义
    </div>
    <div class="btn btn-primary btn-plain" @click="showDialog8 = !showDialog8">
      底部自定义
    </div>
    <div class="tips">
      所有弹窗均可随意拖拽位置
      (除了没有头部的)、修改大小，有边缘计算，触底自动计算修改弹窗高度；折叠后的弹窗，双击缩放后的图标可展开；点击拖拽会自动置顶；
    </div>
  </div>
  <!-- 弹窗位置 -->
  <FreeDialog
    :show="showDialog1"
    title="从左侧弹出"
    :width="400"
    height="280"
    :left="20"
    @closed="showDialog1 = false"
  >
    <CodePreview v-model:code="code1" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog
    :show="showDialog2"
    title="弹窗居中"
    :width="400"
    height="280"
    left="calc(50% - 100px)"
    @closed="showDialog2 = false"
  >
    <CodePreview v-model:code="code2" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog
    :show="showDialog3"
    title="从右侧弹出"
    :width="400"
    height="280"
    :right="20"
    @closed="showDialog3 = false"
  >
    <CodePreview v-model:code="code3" language="html"></CodePreview>
  </FreeDialog>
  <!-- 折叠带图标 -->
  <FreeDialog
    :show="showDialog4"
    title="折叠带图标"
    :top="300"
    :width="400"
    height="280"
    :left="20"
    @closed="handleFold"
    :thumbnail="{ icon: vueIcon, left: 10 }"
    ref="dialogRef"
  >
    <CodePreview v-model:code="code4" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog
    :show="showDialog5"
    title="带ICON弹窗"
    :top="300"
    :icon="vueIcon"
    :width="400"
    height="280"
    left="calc(50% - 100px)"
    @closed="showDialog5 = false"
  >
    <CodePreview v-model:code="code5" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog
    :show="showDialog6"
    :width="400"
    :top="300"
    height="280"
    :right="20"
    @closed="showDialog6 = false"
    :draggable="false"
  >
    <CodePreview v-model:code="code6" language="html"></CodePreview>
  </FreeDialog>
  <!-- 插槽自定义 -->
  <FreeDialog
    :show="showDialog7"
    :top="600"
    :width="400"
    height="280"
    :left="20"
    @closed="showDialog7 = false"
  >
    <template #title>
      <div class="slottitle">
        <div class="text">
          <div class="text-title">标题</div>
          <div class="text-sub">自定义头部</div>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          width="18"
          height="18"
          class="operation-icon"
        >
          <path
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
          />
          <path
            d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.1 0.9 4.2 2.4 5.7l171.3 123.9c3.6 2.6 8.6 1.8 11.2-1.8l28.6-39.4c2.6-3.7 1.8-8.7-1.8-11.2z"
          />
        </svg>
      </div>
    </template>
    <CodePreview v-model:code="code7" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog
    :show="showDialog8"
    title="footer 自定义"
    :top="600"
    :width="400"
    height="280"
    left="calc(50% - 100px)"
    @closed="showDialog8 = false"
  >
    <template #footer>
      <div class="footer">
        <button class="btn btn-small btn-primary" @click="showDialog8 = false">
          确定
        </button>
        <button class="btn btn-small" @click="showDialog8 = false">取消</button>
      </div>
    </template>
    <CodePreview v-model:code="code8" language="html"></CodePreview>
  </FreeDialog>
</template>

<style scoped lang="scss">
.openDialog {
  bottom: 0;
  position: absolute;
  margin: 20px;
  .tips {
    margin-top: 20px;
    background-color: #7c7c7c99;
    padding: 10px 20px;
  }
}
.slottitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .text {
    display: flex;
    .text-title {
      font-size: 14px;
      font-weight: 500;
      color: #08d0f3;
    }
    .text-sub {
      font-size: 12px;
      margin-left: 10px;
      color: #ccc;
    }
  }
  .operation-icon {
    color: #f8d033;
    cursor: pointer;
  }
}
.btn {
  padding: 8px 16px;
  border: none;
  display: inline-block;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  background-color: #409eff;
  color: white;

  &.btn-success {
    background-color: #67c23a;
  }

  &.btn-plain {
    background-color: transparent;
    border: 1px solid #409eff;
    color: #409eff;
  }

  &.btn-small {
    padding: 5px 10px;
    font-size: 12px;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
