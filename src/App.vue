<script setup lang="ts">
import FreeDialog from "./components/free-dialog.vue";
import { ref } from "vue";
import vueIcon from "./assets/vue.svg";
const showDialog1 = ref(true);
const showDialog2 = ref(false);
const showDialog3 = ref(false);
const showDialog4 = ref(false);
const showDialog5 = ref(false);
const showDialog6 = ref(false);
const showDialog7 = ref(false);
const showDialog8 = ref(false);

const desc1 = ref(`
  title="从左侧弹出" 
  :left="20"
  `);
const desc2 = ref(`
  title="弹窗居中" 
  left="calc(50% - 200px)"
  `);
const desc3 = ref(`
  title="从右侧弹出" 
  :right="20"`);
const desc4 = ref(`
  title="折叠带图标" 
  :top="300" 
  :left="20" 
  @closed="handleFold" 
  :thumbnail="{icon: vueIcon, tigger:'click'}"
  `);
const desc5 = ref(`
  title="带ICON弹窗" 
  :top="300" 
  :icon="vueIcon" 
  left="calc(50% - 200px)" 
  `);
const desc6 = ref(`
  title="没有头部" 
  :top="300" 
  :right="20" 
  :draggable="false"
  `);
const desc7 = ref(`
  :top="600" 
  :left="20" 
  <template #title>
    ...
  </template>`);
const desc8 = ref(` 
  title="footer自定义" 
  :top="600" 
  left="calc(50% - 200px)" 
  <template #footer>
    ...
  </template>
  `);

const dialogRef = ref<InstanceType<typeof FreeDialog>>();
const handleFold = () => {
  dialogRef.value?.fold();
};
</script>

<template>
  <div class="context">
    <div class="github-link">
      <a
        href="https://github.com/whanxueyu/vue-free-dialog"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 16 16"
          version="1.1"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        GitHub Repository
      </a>
    </div>
    <div
      :class="!showDialog1 ? 'btn btn-plain' : 'btn'"
      @click="showDialog1 = !showDialog1"
    >
      弹窗左
    </div>
    <div
      :class="!showDialog2 ? 'btn btn-plain' : 'btn'"
      @click="showDialog2 = !showDialog2"
    >
      弹窗中
    </div>
    <div
      :class="!showDialog3 ? 'btn btn-plain' : 'btn'"
      @click="showDialog3 = !showDialog3"
    >
      弹窗右
    </div>
    <div
      :class="!showDialog4 ? 'btn btn-plain' : 'btn'"
      @click="showDialog4 = !showDialog4"
    >
      可折叠弹窗
    </div>
    <div
      :class="!showDialog5 ? 'btn btn-plain' : 'btn'"
      @click="showDialog5 = !showDialog5"
    >
      带 ICON 弹窗
    </div>
    <div
      :class="!showDialog6 ? 'btn btn-plain' : 'btn'"
      @click="showDialog6 = !showDialog6"
    >
      没有头部
    </div>
    <div
      :class="!showDialog7 ? 'btn btn-plain' : 'btn'"
      @click="showDialog7 = !showDialog7"
    >
      头部自定义
    </div>
    <div
      :class="!showDialog8 ? 'btn btn-plain' : 'btn'"
      @click="showDialog8 = !showDialog8"
    >
      底部自定义
    </div>
    <div class="tips">
      可随意拖拽修改大小，有边缘计算，触底自动修改弹窗高度；折叠后的弹窗，点击图标可展开恢复；点击或拖拽弹窗会自动置顶；
    </div>
  </div>
  <FreeDialog
    :show="showDialog1"
    title="从左侧弹出"
    :width="400"
    height="280"
    :left="20"
    @closed="showDialog1 = false"
  >
    <pre class="tool-code">{{ desc1 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog2"
    title="弹窗居中"
    :width="400"
    height="280"
    left="calc(50% - 200px)"
    @closed="showDialog2 = false"
  >
    <pre class="tool-code">{{ desc2 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog3"
    title="从右侧弹出"
    :width="400"
    height="280"
    :right="20"
    @closed="showDialog3 = false"
  >
    <pre class="tool-code">{{ desc3 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog4"
    title="折叠带图标"
    :top="300"
    :width="400"
    height="280"
    :left="20"
    @closed="handleFold"
    :thumbnail="{ icon: vueIcon, left: 10, trigger: 'click' }"
    ref="dialogRef"
  >
    <pre class="tool-code">{{ desc4 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog5"
    title="带ICON弹窗"
    :top="300"
    :icon="vueIcon"
    :width="400"
    height="280"
    left="calc(50% - 200px)"
    @closed="showDialog5 = false"
  >
    <pre class="tool-code">{{ desc5 }}</pre>
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
    <pre class="tool-code">{{ desc6 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog7"
    :top="600"
    :width="400"
    height="280"
    :left="20"
    @closed="showDialog7 = false"
  >
    <template #title>
      <div class="slot-title">
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
    <pre class="tool-code">{{ desc7 }}</pre>
  </FreeDialog>
  <FreeDialog
    :show="showDialog8"
    title="footer 自定义"
    :top="600"
    :width="400"
    height="280"
    left="calc(50% - 200px)"
    @closed="showDialog8 = false"
  >
    <template #footer>
      <div class="footer">
        <button class="btn" @click="showDialog8 = false">确定</button>
        <button class="btn btn-plain" @click="showDialog8 = false">取消</button>
      </div>
    </template>
    <pre class="tool-code">{{ desc8 }}</pre>
  </FreeDialog>
</template>

<style scoped>
.context {
  bottom: 0;
  position: absolute;
  margin: 20px;
}

.context .github-link {
  display: inline-block;
  padding: 6px 12px;
  background-color: #a340ff;
  border-radius: 6px;
  margin-right: 10px;
}

.context .github-link a {
  color: #ffffff;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.context .github-link:hover {
  background-color: #3445a3;
}

.context .tips {
  margin-top: 10px;
  background-color: #27447099;
  padding: 6px 10px;
}

.slot-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.slot-title .text {
  display: flex;
}

.slot-title .text .text-title {
  font-size: 14px;
  font-weight: 500;
  color: #08d0f3;
}

.slot-title .text .text-sub {
  font-size: 12px;
  margin-left: 10px;
  color: #ccc;
}

.slot-title .operation-icon {
  fill: #f8d033;
  cursor: pointer;
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
}

.btn.btn-plain {
  background-color: transparent;
  border: 1px solid #409eff;
  color: #409eff;
}

.btn.btn-small {
  padding: 5px 10px;
  font-size: 12px;
}

.btn:hover {
  opacity: 0.8;
}

.tool-code {
  padding: 0;
  margin: 0;
  overflow: auto;
  color: #dbedfd;
  height: 100%;
}
</style>
