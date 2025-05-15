<script setup lang="ts">
import FreeDialog from './components/free-dialog.vue';
import { Operation } from '@element-plus/icons-vue'
import { ref } from 'vue';
import CodePreview from './components/code-preview.vue';
const showDialog1 = ref(false);
const showDialog2 = ref(true);
const showDialog3 = ref(false);
const showDialog4 = ref(false);
const showDialog5 = ref(true);
const showDialog6 = ref(false);
const showDialog7 = ref(false);
const showDialog8 = ref(false);

// 
const code1  = ref(`
  <FreeDialog :show="showDialog1" 
  title="从左侧弹出" :width="400" height="280" 
  :left="20" @closed="showDialog1 = false">
    <CodePreview  v-model:code="code1" 
    language="javascript">
    </CodePreview>
  </FreeDialog>`)
const code2  = ref(`
  <FreeDialog :show="showDialog2" 
  title="弹窗居中" :width="400" 
  height="280" left="calc(50% - 100px)" 
  @closed="showDialog2 = false">
    <CodePreview  v-model:code="code2" 
    language="javascript"></CodePreview>
  </FreeDialog>`)
const code3  = ref(`
  <FreeDialog :show="showDialog3" 
  title="从右侧弹出" :width="400" 
  height="280" :right="20" 
  @closed="showDialog3 = false">
    <CodePreview  v-model:code="code3" l
    anguage="javascript"></CodePreview>
  </FreeDialog>`)
const code4  = ref(`
  <FreeDialog :show="showDialog4" 
  title="折叠带图标" :top="300" 
  :width="400" height="280" 
  :left="20" @closed="handleFold" 
  :thumbnail="{icon: 'BellFilled'}" 
  ref="dialogRef" >
    <CodePreview  v-model:code="code4" 
    language="javascript"></CodePreview>
  </FreeDialog>`)
const code5  = ref(`
  <FreeDialog :show="showDialog5" 
  title="带ICON弹窗" :top="300" 
  icon='PieChart' :width="400" 
  height="280" left="calc(50% - 100px)" 
  @closed="showDialog5 = false">
    <CodePreview v-model:code="code5" 
    language="javascript"></CodePreview>
  </FreeDialog>`)
const code6  = ref(`
  <FreeDialog :show="showDialog6" 
  :width="400" :top="300" 
  height="280" :right="20" 
  @closed="showDialog6 = false" 
  :draggable="false">
    <CodePreview  v-model:code="code6" 
    language="javascript"></CodePreview>
  </FreeDialog>`)
const code7  = ref(`
  <FreeDialog :show="showDialog7" 
  :top="600" :width="400" 
  height="280" :left="20" 
  @closed="showDialog7 = false">
    <template #title>
        <div class="slottitle">
          <div class="text">
            <div class="text-title">
              标题
            </div>
            <div class="text-sub">
              自定义头部
            </div>
          </div>
          <el-icon ><Operation /></el-icon>
        </div>
    </template>
    <CodePreview  v-model:code="code7" 
    language="javascript"></CodePreview>
  </FreeDialog>`)
const code8  = ref(`
  <FreeDialog :show="showDialog8" 
  title="footer自定义" :top="600" 
  :width="400" height="280" 
  left="calc(50% - 100px)" 
  @closed="showDialog8 = false">
    <template #footer>
      <div class="footer">
        <el-button size="small" 
        type="primary" @click="showDialog8 = false"
        >确定</el-button>
        <el-button size="small" 
        @click="showDialog8 = false"
        >取消</el-button>
      </div>
    </template>
    <CodePreview  v-model:code="code8" 
    language="javascript"></CodePreview>
  </FreeDialog>`)

const dialogRef = ref<InstanceType<typeof FreeDialog>>()
const handleFold = ()=>{
  dialogRef.value?.fold()
}
</script>

<template>
  <div class="openDialog">
    <el-button type="primary" @click="showDialog1 = !showDialog1">弹窗左</el-button>
    <el-button type="primary" @click="showDialog2 = !showDialog2">弹窗中</el-button>
    <el-button type="primary" @click="showDialog3 = !showDialog3">弹窗右</el-button>
    <el-button type="success" @click="showDialog4 = !showDialog4">可折叠弹窗</el-button>
    <el-button type="success" @click="showDialog5 = !showDialog5">带ICON弹窗</el-button>
    <el-button type="success" @click="showDialog6 = !showDialog6">没有头部</el-button>
    <el-button type="primary" plain @click="showDialog7 = !showDialog7">头部自定义</el-button>
    <el-button type="primary" plain @click="showDialog8 = !showDialog8">底部自定义</el-button>
    <div class="tips">所有弹窗均可随意拖拽位置 (除了没有头部的)、修改大小，有边缘计算，触底自动计算修改弹窗高度</div>
  </div>
  <!-- 弹窗位置 -->
  <FreeDialog :show="showDialog1" title="从左侧弹出" :width="400" height="280" :left="20" @closed="showDialog1 = false">
    <CodePreview  v-model:code="code1" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog :show="showDialog2" title="弹窗居中" :width="400" height="280" left="calc(50% - 100px)" @closed="showDialog2 = false">
    <CodePreview  v-model:code="code2" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog :show="showDialog3" title="从右侧弹出" :width="400" height="280" :right="20" @closed="showDialog3 = false">
    <CodePreview  v-model:code="code3" language="html"></CodePreview>
  </FreeDialog>
  <!-- 折叠带图标 -->
  <FreeDialog :show="showDialog4" title="折叠带图标" :top="300" :width="400" height="280" :left="20" @closed="handleFold" :thumbnail="{icon: 'BellFilled'}" ref="dialogRef" >
    <CodePreview  v-model:code="code4" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog :show="showDialog5" title="带ICON弹窗" :top="300" icon='PieChart' :width="400" height="280" left="calc(50% - 100px)" @closed="showDialog5 = false">
    <CodePreview  v-model:code="code5" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog :show="showDialog6" :width="400" :top="300" height="280" :right="20" @closed="showDialog6 = false" :draggable="false">
    <CodePreview  v-model:code="code6" language="html"></CodePreview>
  </FreeDialog>
  <!-- 插槽自定义 -->
  <FreeDialog :show="showDialog7" :top="600" :width="400" height="280" :left="20" @closed="showDialog7 = false">
    <template #title>
        <div class="slottitle">
          <div class="text">
            <div class="text-title">
              标题
            </div>
            <div class="text-sub">
              自定义头部
            </div>
          </div>
          <el-icon ><Operation /></el-icon>
        </div>
    </template>
    <CodePreview  v-model:code="code7" language="html"></CodePreview>
  </FreeDialog>
  <FreeDialog :show="showDialog8" title="footer自定义" :top="600" :width="400" height="280" left="calc(50% - 100px)" @closed="showDialog8 = false">
    <template #footer>
      <div class="footer">
        <el-button size="small" type="primary" @click="showDialog8 = false">确定</el-button>
        <el-button size="small" @click="showDialog8 = false">取消</el-button>
      </div>
    </template>
    <CodePreview  v-model:code="code8" language="html"></CodePreview>
  </FreeDialog>
</template>

<style scoped lang="scss">
    .openDialog {
      bottom: 0;
      position: absolute;
      margin: 20px;
      .tips{
        margin-top: 20px;
        background-color: #7c7c7c99;
        padding: 10px 20px;
      }
    }
    .slottitle{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .text{
        display: flex;
        .text-title{
          font-size: 14px;
          font-weight: 500;
          color: #08d0f3;
        }
        .text-sub{
          font-size: 12px;
          margin-left: 10px;
          color: #ccc;
        }
      }
      .el-icon{
        color: #f8d033;
      }
    }
</style>
