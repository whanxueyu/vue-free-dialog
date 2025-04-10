<template>
    <teleport :to="mergeProps.warpper">
        <div class="free-dialog-thumb" v-show="isFold && show" ref="thumbnailRef" @click="toogleFold(false)">
            <el-icon v-if="mergeProps.thumbnail?.icon" size="18" class="icon">
                <component :is="mergeProps.thumbnail.icon" />
            </el-icon>
        </div>
        <div class="free-dialog" :class="[customClass, animationClass]"
            :style="{ 'padding-top': showHeader ? '44px' : '10px', 'padding-bottom': slots.footer ? '44px' : '10px' }"
            ref="dialogRef" v-show="visible && !isFold && show">
            <div v-if="showHeader" class="free-dialog__header" :style="{ cursor: mergeProps.draggable ? 'move' : 'auto' }"
                @mousedown="dragStart">
                <el-icon v-if="mergeProps.icon" :size="18" color="#41A8FF" class="icon">
                    <component :is="mergeProps.icon" />
                </el-icon>
                <slot v-if="slots.title" name="title"></slot>
                <span v-else class="title">{{ mergeProps.title }}</span>
                <el-icon v-if="mergeProps.closeable && mergeProps.closeButton" icon="close" :size="18" class="close-btn"
                    @click="close">
                    <Close />   
                </el-icon>
            </div>
            <el-icon v-else-if="mergeProps.closeable && mergeProps.closeButton" :size="18" class="close-btn__flot"
                @click="close">
                <CircleClose />
            </el-icon>
            <div class="free-dialog__content">
                <slot></slot>
            </div>
            <div v-if="slots.footer" class="free-dialog__footer">
                <slot name="footer"></slot>
            </div>
            <div v-for="handle in actualHandles" :key="handle" class="free-dialog__handle" :class="['handle-' + handle]"
                @mousedown="resizeStart(handle, $event)"></div>
        </div>
    </teleport>
</template>
<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, useSlots, nextTick } from "vue"
import { Close, CircleClose } from '@element-plus/icons-vue'

const globalConfig: Record<string, any> = {}
interface Position {
    left?: number | string // 定位 left值
    right?: number | string // 定位right值
    top?: number | string // 定位top值
    bottom?: number | string // 定位bottom值
}
interface Props {
    warpper?: string // 容器id 默认是app，将作为定位的参照元素，一般不需要修改
    title?: string // 弹框标题
    visible?: boolean // 是否启用
    show?: boolean // 弹窗是否默认显示
    draggable?: boolean // 是否可拖拽
    closeable?: boolean // 是否可关闭
    closeButton?: boolean // 是否显示关闭按钮
    animation?: string | boolean // 是否开启开场动画，或开场动画的class名
    width?: number | string // 初始宽度
    height?: number | string // 初始高度
    left?: number | string // 定位 left值
    right?: number | string // 定位right值
    top?: number | string // 定位top值
    bottom?: number | string // 定位bottom值
    position?: Position // 统一设置位置属性，优先级高于 left right top bottom
    handles?: boolean | string // 缩放控制器
    minWidth?: number // 最小宽度
    minHeight?: number // 最小高度
    maxWidth?: number // 最大宽度
    maxHeight?: number // 最大高度
    zIndex?: number // 层级
    icon?: string
    customClass?: string // 自定义class
    defaultFold?: boolean // 是否折叠
    thumbnail?: {
        left?: number | string // 定位 left值
        right?: number | string // 定位right值
        top?: number | string // 定位top值
        bottom?: number | string // 定位bottom值
        icon?: string
    } // 折叠状态下的配置
    beforeClose?: () => Promise<any> | boolean | void
}
/**
 * 弹窗
 * @property {string} warpper 容器id 默认是app，将作为定位的参照元素，一般不需要修改
 * @property {string} title 弹框标题
 * @property {boolean} visible 是否启用
 * @property {boolean} show 弹窗是否默认显示
 * @property {boolean} draggable 是否可拖拽
 * @property {boolean} closeable 是否可关闭
 * @property {boolean} closeButton 是否显示关闭按钮
 * @property {boolean} animation 是否开启开场动画，或开场动画的class名
 * @property {number} width 初始宽度
 * @property {number} height 初始高度
 * @property {number} left 定位 left值
 * @property {number} right 定位right值
 * @property {number} top 定位top值
 * @property {number} bottom 定位bottom值
 * @property {boolean} handles 是否显示缩放控制器
 * @property {number} minWidth 最小宽度
 * @property {number} minHeight 最小高度
 * @property {number} maxWidth 最大宽度
 * @property {number} maxHeight 最大高度
 * @property {number} zIndex 层级
 */
const props = withDefaults(defineProps<Props>(), {
    visible: true,
    show: false,
    closeable: true,
    closeButton: true,
    draggable: true,
    animation: true,
    handles: false,
    defaultFold: false,
    minWidth: 100,
    minHeight: 100,
    maxWidth: window.innerWidth,
    maxHeight: window.innerHeight,
    zIndex: 900,
    icon: undefined,
    thumbnail: undefined
})
const emits = defineEmits(["update:visible", "resize", "move", "closed"])
const slots = useSlots()
const mergeProps = computed(() => {
    var newProps: Props = { ...props }
    if (!props.warpper) {
        newProps.warpper = globalConfig.warpper || "#app"
    }
    if (newProps.position) {
        newProps.left = newProps.position.left
        newProps.right = newProps.position.right
        newProps.top = newProps.position.top
        newProps.bottom = newProps.position.bottom
    }
    // 缩略图
    newProps.thumbnail = newProps.thumbnail ?? {}
    newProps.thumbnail.left = newProps.thumbnail.left ?? newProps.left
    newProps.thumbnail.right = newProps.thumbnail.right ?? newProps.right
    newProps.thumbnail.top = newProps.thumbnail.top ?? newProps.top
    newProps.thumbnail.bottom = newProps.thumbnail.bottom ?? newProps.bottom
    newProps.thumbnail.icon = newProps.thumbnail.icon ?? newProps.icon
    if (!isAllowValue(newProps.left) && !isAllowValue(newProps.right)) {
        // left right 都不存在时默认出现在左侧
        newProps.right = 10
    }
    if (!isAllowValue(newProps.top) && !isAllowValue(newProps.bottom)) {
        // top bottom 都不存在时默认出现在顶部
        newProps.top = 10
    }
    if (isAllowValue(newProps.closeable) && (slots.title || isAllowValue(newProps.title) || isAllowValue(newProps.icon) || newProps.draggable)) {
        newProps.closeable = true
    }
    if (newProps.draggable) {
        newProps.handles = true
    }
    return newProps
})
const showHeader = computed(
    () => slots.title || isAllowValue(mergeProps.value.icon) || isAllowValue(mergeProps.value.title) || mergeProps.value.draggable
)
const dialogRef = ref<HTMLDivElement>()
const thumbnailRef = ref<HTMLDivElement>()
let warpperEle: any = null
let observeDialog = false // 控制是否自动监听
let hasUserSet = false // 控制是否自动监听
// 处理折叠
const isFold = ref(mergeProps.value.defaultFold)
defineExpose({
    expend() {
        toogleFold(false)
    },
    fold() {
        toogleFold(true)
    },
    toggle() {
        toogleFold(!isFold.value)
    },
    setSize,
    setPosition
})
function toogleFold(status: boolean) {
    isFold.value = status
    nextTick(() => {
        if (status) {
            initThumbnail()
        } else if (!hasUserSet) {
            // 用户没有操作过
            initDialog()
        }
    })
}
function initThumbnail() {
    const thOp = mergeProps.value.thumbnail
    if (thOp && thOp.right || thOp?.left || thOp?.bottom || thOp?.top)
        if (thumbnailRef.value) {
            thumbnailRef.value.style.right = thOp?.right ? autoUnit(thOp.right):''
            thumbnailRef.value.style.left = thOp?.left ? autoUnit(thOp.left):''
            thumbnailRef.value.style.bottom = thOp?.bottom ? autoUnit(thOp.bottom):''
            thumbnailRef.value.style.top = thOp?.top ? autoUnit(thOp.top):''
            thumbnailRef.value.style.zIndex = '999'
            observeDialog = false
        }
}
// 初始化展示
function initDialog() {
    initSize()
    initPosition()
    // 处理给定top之后的超出的情况
    observeDialog = true
    autoNiceHeight()
}
onMounted(() => {
    warpperEle = document.querySelector('#app')
    if (isFold.value) {
        initThumbnail()
    } else {
        initDialog()
    }
})
// 初始化位置
function initPosition() {
    if (!dialogRef.value) return
    const pannelStyle = dialogRef.value.style
    // 层级位置
    pannelStyle.zIndex = (mergeProps.value.zIndex as number).toString()
    // 横向位置初始化 同时存在优先取left, right 将用来控制宽度
    if (mergeProps.value.left && isAllowValue(mergeProps.value.left)) {
        pannelStyle.left = autoUnit(mergeProps.value.left)
    } else if (mergeProps.value.right) {
        pannelStyle.right = autoUnit(mergeProps.value.right)
    }
    // 纵向位置初始化 同时存在优先取top, bottom 将用来控制宽度
    if (mergeProps.value.top && isAllowValue(mergeProps.value.top)) {
        pannelStyle.top = autoUnit(mergeProps.value.top)
    } else if (mergeProps.value.bottom && isAllowValue(mergeProps.value.bottom)) {
        pannelStyle.bottom = autoUnit(mergeProps.value.bottom)
    }
}
// 初始化大小
function initSize() {
    let w: number | null = null
    let h: number | null = null
    // 如果同时存在 left right 则自动计算
    if (isAllowValue(mergeProps.value.left) && isAllowValue(mergeProps.value.right)) {
        w = warpperEle.offsetWidth - (mergeProps.value.left as number) - (mergeProps.value.right as number)
    } else if (mergeProps.value.width) {
        w = mergeProps.value.width as number
    }
    setSize("width", w as number)
    // 如果同时存在 left right 则自动计算
    if (isAllowValue(mergeProps.value.top) && isAllowValue(mergeProps.value.bottom)) {
        h = warpperEle.offsetHeight - (mergeProps.value.top as number) - (mergeProps.value.bottom as number)
    } else if (mergeProps.value.height) {
        h = mergeProps.value.height as number
    }
    setSize("height", h as number)
}
// 开始移动
function dragStart(event: any) {
    if (!warpperEle || !mergeProps.value.draggable) {
        return
    }
    if (!dialogRef.value) return
    const pb = dialogRef.value
    const x = event.clientX
    const y = event.clientY
    const bl = pb.offsetLeft
    const bt = pb.offsetTop
    bindMouseDrag(toPointerPosition)
    function toPointerPosition(e: any) {
        const distanceX = e.clientX - x
        const distanceY = e.clientY - y
        const left = bl + distanceX
        const top = bt + distanceY
        setPosition("left", left)
        setPosition("top", top)
        emits("move")
    }
}

// 缩放
const defaultHandles = ["l", "r", "t", "b", "lb", "rb"]
let handleName = ""
const actualHandles = computed<string[]>(() => {
    if (!mergeProps.value.handles) {
        return []
    }
    if (typeof mergeProps.value.handles === "string") {
        return mergeProps.value.handles.split("")
    }
    return defaultHandles
})
// 处理自定义缩放
function resizeStart(handle: string, event: any) {
    if (!dialogRef.value) return
    handleName = handle
    const x = event.clientX
    const y = event.clientY
    const bw = dialogRef.value.offsetWidth
    const bh = dialogRef.value.offsetHeight
    const bl = dialogRef.value.offsetLeft
    const bt = dialogRef.value.offsetTop
    bindMouseDrag(handleMove)
    function handleMove(e: any) {
        if (handleName.indexOf("l") !== -1) {
            const L = x - e.clientX
            if (e.clientX > 0 && e.clientX < warpperEle.offsetWidth) {
                if (!dialogRef.value || !mergeProps.value.minWidth) return
                if ((dialogRef.value.offsetWidth <= mergeProps.value.minWidth && L > 0) || dialogRef.value.offsetWidth > mergeProps.value.minWidth) {
                    setPosition("left", bl - L)
                    setSize("width", bw + L)
                }
            }
        }
        if (handleName.indexOf("r") !== -1) {
            setSize("width", bw + e.clientX - x)
        }
        if (handleName.indexOf("t") !== -1) {
            const L = y - e.clientY
            if (e.clientY > 0 && e.clientY < warpperEle.offsetHeight) {
                if (!dialogRef.value || !mergeProps.value.minHeight) return
                if ((dialogRef.value.offsetHeight <= mergeProps.value.minHeight && L > 0) || dialogRef.value.offsetHeight > mergeProps.value.minHeight) {
                    setPosition("top", bt - y + e.clientY)
                    setSize("height", bh + y - e.clientY)
                }
            }
        }
        if (handleName.indexOf("b") !== -1) {
            setSize("height", bh + e.clientY - y)
        }
        emits("resize")
    }
}
function setSize(attr: "width" | "height", v: number) {
    if (!dialogRef.value) return
    if (isAllowValue(v)) {
        let value = v
        switch (attr) {
            case "width": {
                if (mergeProps.value.minWidth && mergeProps.value.maxWidth && !isPercentage(value)) {
                    value = Math.max(mergeProps.value.minWidth, value)
                    value = Math.min(mergeProps.value.maxWidth, value, warpperEle.offsetWidth)
                }
                break
            }
            case "height": {
                if (mergeProps.value.minHeight && mergeProps.value.maxHeight && !isPercentage(value)) {
                    value = Math.max(mergeProps.value.minHeight, value)
                    value = Math.min(mergeProps.value.maxHeight, value, warpperEle.offsetHeight)
                }
                break
            }
        }
        dialogRef.value.style[attr] = autoUnit(value)
    }
}

function setPosition(attr: "left" | "top", v: number) {
    if (isAllowValue(v)) {
        let value = v
        if (!dialogRef.value) return
        const pb = dialogRef.value
        switch (attr) {
            case "left": {
                const maxLeft = warpperEle.offsetWidth - pb.offsetWidth
                value = Math.min(Math.max(0, value), maxLeft)
                break
            }
            case "top": {
                const maxTop = warpperEle.offsetHeight - pb.offsetHeight
                value = Math.min(Math.max(0, value), maxTop)
                break
            }
        }
        dialogRef.value.style[attr] = autoUnit(value)
    }
}
let domObserver: MutationObserver;
onMounted(() => {
    addEvent(window, "resize", resize)
    // 监听元素变化
    domObserver = new MutationObserver(() => {
        autoNiceHeight()
    })
    if (!dialogRef.value) return
    domObserver.observe(dialogRef.value, {
        attributes: true,
        childList: true,
        subtree: true
    })
})
onUnmounted(() => {
    removeEvent(window, "resize", resize)
    domObserver.disconnect()
})
// 处理高度超出的情况
function autoNiceHeight() {
    if (!dialogRef.value) return
    if (observeDialog) {
        const niceHeight = warpperEle.offsetHeight - dialogRef.value.offsetTop - 20
        const isExceed = niceHeight < dialogRef.value.offsetHeight
        if (isExceed) {
            dialogRef.value.style.height = autoUnit(niceHeight)
        }
    }
}
// 处理窗口缩放
function resize() {
    if (!dialogRef.value) return
    const pb = dialogRef.value
    if (!warpperEle) {
        return
    }
    const niceHeight = warpperEle.offsetHeight - pb.offsetTop - 30
    if (pb.offsetHeight > niceHeight) {
        setSize("height", niceHeight)
    }
    if (pb.offsetLeft + pb.offsetWidth > warpperEle.offsetWidth) {
        setSize("width", warpperEle.offsetWidth - pb.offsetLeft)
    }
}
// 处理百分比
function isPercentage(value: number | string) {
    if (typeof value === "string") {
        return value.search("%") !== -1
    } else {
        return false
    }
}
async function close() {
    if (props.beforeClose && typeof mergeProps.value.beforeClose === "function") {
        const result = props.beforeClose()
        if (result instanceof Promise) {
            try {
                await result
                emitClose()
            } catch (err) {
                console.log("取消关闭")
            }
        } else if (result !== false) {
            emitClose()
        }
    } else {
        emitClose()
    }
}
const fadeoutClass = ref("")
function emitClose() {
    console.log("emitClose",animationClass.value)
    switch(animationClass.value){
        case 'fadein-right':
            fadeoutClass.value = 'fadeout-left'
            break;
        case 'fadein-left':
            fadeoutClass.value = 'fadeout-right'
            break;
        case 'fadein-down':
            fadeoutClass.value = 'fadeout-down'
            break;
        case 'fadein-up':
            fadeoutClass.value = 'fadeout-up'
            break;
        case 'fadein-center':
            fadeoutClass.value = 'fadeout-center'
            break;
        default:
            fadeoutClass.value = 'fadeout-center'
            break;
    }
    dialogRef.value?.classList.add(fadeoutClass.value);
    setTimeout(() => {
        emits("update:visible", false);
        emits("closed");
        dialogRef.value?.classList.remove(fadeoutClass.value);
    }, 300); // 与动画时长保持一致
}
const animationClass = computed(() => {
    if (mergeProps.value.animation === true) {
        const right = mergeProps.value.right as number
        if (right && right >= 0 && right < 100) {
            return "fadein-right"
        }
        const left = mergeProps.value.left as number
        if (left || (left >= 0 && left < 100)) {
            return "fadein-left"
        }
        const top = mergeProps.value.top as number
        if (left || (top >= 0 && top < 100)) {
            return "fadein-down"
        }
        const bottom = mergeProps.value.bottom as number
        if (bottom || (bottom >= 0 && bottom < 100)) {
            return "fadein-up"
        }
        return "fadein-center"
    } else if (typeof mergeProps.value.animation === "string") {
        return mergeProps.value.animation
    } else {
        return ""
    }
})
// 处理传入的单位问题
function autoUnit(value: number | string) {
    if (typeof value === "number" || (typeof value === "string" && /^[0-9]*$/.test(value))) {
        return `${value}px`
    } else {
        return value
    }
}
function isAllowValue(value: any) {
    return value !== null && value !== undefined
}
// 事件绑定处理
function bindMouseDrag(callback: any) {
    addEvent(document.documentElement, "mousemove", handleMove)
    addEvent(document.documentElement, "mouseup", handleUp)
    function handleMove(e: MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        hasUserSet = true
        callback(e)
    }
    function handleUp(e: any) {
        e.preventDefault()
        e.stopPropagation()
        removeEvent(document.documentElement, "mousemove", handleMove)
        removeEvent(document.documentElement, "mouseup", handleUp)
    }
}
function addEvent(el: any, event: any, handler: (e: any) => void) {
    if (!el) {
        return
    }
    if (el.attachEvent) {
        el.attachEvent(`on${event}`, handler)
    } else if (el.addEventListener) {
        el.addEventListener(event, handler)
    } else {
        el[`on${event}`] = handler
    }
}
// 事件解除绑定
function removeEvent(el: any, event: any, handler: (e: any) => void) {
    if (!el) {
        return
    }
    if (el.detachEvent) {
        el.detachEvent(`on${event}`, handler)
    } else if (el.removeEventListener) {
        el.removeEventListener(event, handler)
    } else {
        el[`on${event}`] = null
    }
}
</script>
<script lang="ts">
export default {
    name: "free-dialog"
}
</script>
  
<style lang="scss" scoped>
.free-dialog-thumb {
    background-color: #3a654df0;
    border: 2px solid #63d681;
    position: absolute;
    padding: 5px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}

.free-dialog {
    position: absolute;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 4px;
    z-index: 999 !important;
    // border-bottom: 1px solid var(--el-border-color-darker);
    // border-left: 1px solid var(--el-border-color-darker);
    // border-right: 1px solid var(--el-border-color-darker);
    z-index: 100;
    // background-color: var(--el-bg-color-page);
    background-color: rgba(23, 49, 71, .8);
    background-color: #3a654df0;
    // 2px solid #63d681
    // border-bottom: 1px solid #008aff70;
    // border-left: 1px solid #008aff70;
    // border-right: 1px solid #008aff70;
    border: 2px solid #63d681;

    .free-dialog__header {
        height: 40px;
        width: calc(100% - 20px);
        line-height: 40px;
        overflow: hidden;
        padding: 0px 10px;
        color: var(--el-text-color-primary);
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        // background: rgba(25, 113, 185, 0.733);
        border-bottom: 2px solid #63d681;
        user-select: none;
        background-image: linear-gradient(90deg,
                #ffffff00 0%,
                rgba(175, 223, 188, 0.25) 24%,
                rgba(98, 191, 123, 0.5) 46%,
                rgba(94, 190, 120, 0.49) 47%,
                #ffffff00 100%);

        .icon {
            margin-right: 5px;
            float: left;
            margin-top: 10px;
            color: #ffffff;
        }

        .title {
            font-size: 16px;
            color: #ffffff;
        }

        .close-btn {
            float: right;
            cursor: pointer;
            margin-top: 10px;
            color: #ffffff;
        }
    }

    .close-btn__flot {
        position: absolute;
        right: -8px;
        top: -8px;
        cursor: pointer;
        width: 24px;
        color: #ffff;
    }

    .free-dialog__content {
        // height: 100%;
        // // width: 100%;
        // overflow: auto;
        // padding: 5px 0;
        height: calc(100% - 10px);
        overflow: auto;
        margin: 10px 0;
        // background-color: var(--el-bg-color-page);
        border-radius: 4px;
    }

    .free-dialog__footer {
        height: 44px;
        width: 100%;
        // color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
    }

    .free-dialog__handle {
        box-sizing: border-box;
        position: absolute;
        z-index: 1;
        width: 10px;
        height: 10px;
        opacity: 0;
    }

    .handle-t {
        width: auto;
        top: 0;
        left: 10px;
        right: 10px;
        cursor: row-resize;
    }

    .handle-b {
        width: auto;
        bottom: 0;
        left: 10px;
        right: 10px;
        cursor: row-resize;
    }

    .handle-l {
        height: auto;
        top: 10px;
        left: 0;
        bottom: 10px;
        cursor: col-resize;
    }

    .handle-r {
        height: auto;
        top: 10px;
        right: 0;
        bottom: 10px;
        cursor: col-resize;
    }

    .handle-rb {
        bottom: 0;
        right: 0;
        cursor: nwse-resize;
    }

    .handle-lb {
        bottom: 0;
        left: 0;
        cursor: nesw-resize;
    }
}

/**下面是 5个 动画 */
@keyframes fadeInRight {
    from {
        opacity: 0;
        transform: translate3d(100%, 0, 0) scale(0.1);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.fadein-right {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInRight;
    animation-name: fadeInRight;
}

@keyframes fadeInLeft {
    from {
        opacity: 0;
        transform: translate3d(-100%, 0, 0) scale(0.1);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.fadein-left {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInLeft;
    animation-name: fadeInLeft;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0) scale(0.1);
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

.fadein-up {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0) scale(0.1);
    }

    to {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

.fadein-down {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
}

@keyframes fadeInCenter {
    from {
        opacity: 0;
        transform: scale(0.1);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.fadein-center {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: fadeInCenter;
    animation-name: fadeInCenter;
}
/* 在现有样式末尾添加 */
@keyframes fadeoutRight {
  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0) scale(0.1);
  }
}
.fadeout-right {
  animation: fadeoutRight 0.3s forwards;
}

@keyframes fadeoutLeft {
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0) scale(0.1);
  }
}
.fadeout-left {
  animation: fadeoutLeft 0.3s forwards;
}

@keyframes fadeoutUp {
  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0) scale(0.1);
  }
}
.fadeout-up {
  animation: fadeoutUp 0.3s forwards;
}

@keyframes fadeoutDown {
  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0) scale(0.1);
  }
}
.fadeout-down {
  animation: fadeoutDown 0.3s forwards;
}

@keyframes fadeoutCenter {
  to {
    opacity: 0;
    transform: scale(0.1);
  }
}
.fadeout-center {
  animation: fadeoutCenter 0.3s forwards;
}
</style>