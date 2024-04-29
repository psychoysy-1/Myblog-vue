<script setup>
import { ref, nextTick } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useUserStore } from '@/stores'
import { blogPublishService } from '@/api/blog'

// 获取用户id
const userStore = useUserStore()
const _id = userStore.user._id
// 控制抽屉显示隐藏
const visibleDrawer = ref(false)

// 标题
const title = ref('')

// 标签相关
const dynamicTags = ref([]) //tag数组
const inputVisible = ref(false) //标签输入框可见
const inputValue = ref('') //标签输入框
const InputRef = ref(null) //标签输入框ref
// 展示输入框
const showInput = () => {
  if (dynamicTags.value.length >= 5) {
    // 弹出提示框,禁止添加更多标签
    ElMessage({
      message: '标签最多只能添加 5 个',
      type: 'warning'
    })
    return
  }
  inputVisible.value = true
  // 自动获取焦点
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
// 输入完成
const handleInputConfirm = () => {
  if (inputValue.value.trim()) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
// 删除标签
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

// 图片相关
const uploadedFiles = ref([]) //上传的文件列表
const uploadRef = ref(null)
const onSelectFile = (uploadFile) => {
  uploadedFiles.value.push(uploadFile)
}

// 富文本编辑器相关
const editorRef = ref()
const content = ref('')

// 创建表单并提交
// const formAll = ref({})
const publish = async () => {
  const formData = new FormData()
  formData.append('title', title.value)
  formData.append('uid', _id)
  formData.append('tags', dynamicTags.value)
  formData.append('content', content.value)
  uploadedFiles.value.forEach((file) => {
    formData.append('blogImages', file.raw, file.name)
  })
  const res = await blogPublishService(formData)
  if (res.status === 200) {
    ElMessage.success('发布成功')
    visibleDrawer.value = false
    closeDrawer()
    emit('published')
  }
}

// 通知父组件发布完成
const emit = defineEmits(['published'])

// 打开发布的抽屉
const open = () => {
  visibleDrawer.value = true
}
// 关闭抽屉函数
const closeDrawer = () => {
  title.value = ''
  dynamicTags.value = []
  uploadRef.value.clearFiles()
  editorRef.value.setHTML('')
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    direction="rtl"
    title="发一个博客"
    size="38%"
    @close="closeDrawer"
  >
    <el-form>
      <!-- 标题 -->
      <el-form-item label="博客标题">
        <el-input
          placeholder="请为你的博客写一个标题"
          size="large"
          v-model="title"
          style="width: 560px"
          maxlength="15"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- 标签 -->
      <el-form-item label="标签">
        <div class="flex gap-2">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            size="large"
            style="margin-right: 10px"
            type="info"
            round
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            style="width: 80px"
            autofocus
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button v-else class="button-new-tag" @click="showInput"> + 新标签 </el-button>
        </div>
      </el-form-item>
      <!-- 上传照片 -->
      <el-form-item>
        <el-upload
          class="upload-demo"
          ref="uploadRef"
          drag
          multiple
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖动图片到这里或 <em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">小于500kb的 jpg/png 图片</div>
          </template>
        </el-upload>
      </el-form-item>
      <!-- 富文本编辑器 -->
      <el-form-item>
        <div class="editor">
          <quill-editor
            v-model:content="content"
            ref="editorRef"
            content-type="html"
            theme="snow"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped>
.upload-demo {
  width: 630px;
}
/*富文本编辑器样式 */
.editor {
  width: 630px;
}
.editor :deep(.ql-editor) {
  min-height: 300px;
}
</style>
