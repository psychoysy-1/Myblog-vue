<script setup>
import { ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { getCaptchaService, updatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'

// 语言
const languages = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
  { label: '日本語', value: 'ja-JP' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Deutsch', value: 'de-DE' }
]
const selectedLanguages = ref([])
// 隐私按钮
const btn1 = ref(false)
const btn2 = ref(false)

// 获取验证码图片数据
const code = ref('')
const getCode = async () => {
  const res = await getCaptchaService()
  code.value = res.data.data.base64
}
getCode()

// 修改密码
const form = ref({
  newPassword: '',
  reNewPassword: '',
  captcha: ''
})
const rules = ref({
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  reNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.newPassword) {
          callback(new Error('两次输入的密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '验证码长度为 4', trigger: 'blur' }
  ]
})
const userStore = useUserStore()
const _id = ref(userStore.user._id)
const changePassword = async () => {
  if (!form.value.newPassword || !form.value.reNewPassword || !form.value.captcha) {
    ElMessage.error({ message: '请填写完整信息' })
    return
  }
  await updatePasswordService({
    captcha: form.value.captcha,
    newPassword: form.value.newPassword,
    _id: _id.value
  })
  ElMessage.success({ message: '密码修改成功' })
  form.value = {
    newPassword: '',
    reNewPassword: '',
    captcha: ''
  }
  getCode()
}
</script>

<template>
  <show-container title="登录">
    <el-form class="login-form" v-model="form" :rules="rules">
      <el-form-item prop="captcha">
        <div class="form">
          <span>验证码</span>
          <div class="code">
            <img :src="code" @click="getCode()" />
            <el-input
              size="large"
              placeholder="请输入验证码"
              style="width: 521px"
              v-model="form.captcha"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="newPassword">
        <span>密码</span>
        <el-input
          type="password"
          size="large"
          placeholder="请输入密码"
          v-model="form.newPassword"
        ></el-input>
      </el-form-item>
      <el-form-item prop="reNewPassword">
        <span>确认密码</span>
        <el-input
          type="password"
          size="large"
          placeholder="请确认密码"
          v-model="form.reNewPassword"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="changePassword">设置密码</el-button>
      </el-form-item>
    </el-form>
    <div class="check">
      <span>双重验证</span>
      <el-icon><InfoFilled /></el-icon>
    </div>
    <el-button type="info">使用短信验证</el-button>
    <el-button type="info">使用身份验证</el-button>
  </show-container>
  <show-container title="邮寄地址">
    <el-form class="address">
      <el-form-item>
        <span>国家/地区</span>
        <el-select size="large"></el-select>
      </el-form-item>
      <el-form-item>
        <span>名字</span>
        <el-input size="large"></el-input>
      </el-form-item>
      <el-form-item>
        <span>地址</span>
        <el-input size="large"></el-input>
      </el-form-item>
      <el-form-item>
        <span>联系电话</span>
        <el-input size="large"></el-input>
      </el-form-item>
      <el-button type="info">添加地址</el-button>
    </el-form>
  </show-container>
  <show-container title="社交媒体链接">
    <p class="desc">
      添加社交媒体账户，在公开个人资料和社区个人资料中展示。添加账户后，您可以随时取消关联或停止展示这些账户。
    </p>
    <div class="social">
      <div class="icon">
        <img src="@/assets/icons/facebook.png" alt="" />
        <span>facebook</span>
      </div>
      <el-button>关联</el-button>
    </div>
    <div class="social">
      <div class="icon">
        <img src="@/assets/icons/github.png" alt="" />
        <span>github</span>
      </div>
      <el-button>关联</el-button>
    </div>
    <div class="social">
      <div class="icon">
        <img src="@/assets/icons/instagram.png" alt="" />
        <span>instagram</span>
      </div>
      <el-button>关联</el-button>
    </div>
    <div class="social">
      <div class="icon">
        <img src="@/assets/icons/tik-tok.png" alt="" />
        <span>tik-tok</span>
      </div>
      <el-button>关联</el-button>
    </div>
    <div class="social">
      <div class="icon">
        <img src="@/assets/icons/youtube.png" alt="" />
        <span>youtube</span>
      </div>
      <el-button>关联</el-button>
    </div>
  </show-container>
  <show-container title="语言偏好">
    <el-select
      v-model="selectedLanguages"
      filterable
      placeholder="选择语言"
      style="width: 100%"
      size="large"
    >
      <el-option
        v-for="item in languages"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </show-container>
  <show-container title="隐私">
    <div class="privacy">
      <h3>完整的公开个人资料</h3>
      <div class="info">
        <span>
          您的公开个人资料始终包含您的姓名、照片、加入 MyBlog
          的日期以及您添加的所有社交媒体链接或其他信息。如果启用此功能，更多详细信息将公开。
        </span>
        <el-button :type="btn1 ? 'success' : 'danger'" plain @click="btn1 = !btn1">{{
          btn1 ? '开启' : '关闭'
        }}</el-button>
      </div>
      <el-link>了解详情</el-link>
    </div>
    <div class="privacy">
      <h3>社区个人资料</h3>
      <div class="info">
        <span>您的社区个人资料显示的信息比公开个人资料更丰富，仅对您所在社区的成员可见</span>
        <el-button :type="btn2 ? 'success' : 'danger'" plain @click="btn2 = !btn2">{{
          btn2 ? '开启' : '关闭'
        }}</el-button>
      </div>
      <el-link>了解详情</el-link>
    </div>
  </show-container>
</template>

<style scoped>
/* 登录 */
.login-form {
  border-bottom: 1px solid #f0f0f0;
}
.check {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 14px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.check span {
  margin-right: 5px;
}
.code {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.code img {
  cursor: pointer;
}

/* 邮寄地址 */
.address {
  border: 1px solid #cec6c6; /* 设置边框颜色为黑色 */
  padding: 30px; /* 添加内边距,让内容不贴边 */
}
.address .el-button {
  margin-left: 473px;
}

/* 社交媒体 */
.desc {
  margin-top: 0;
  font-size: 10px;
  color: rgb(156, 156, 146);
}
.social {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
}
.social .icon {
  display: flex;
  align-items: center;
}
.social .icon img {
  margin-right: 10px;
}

/* 隐私设置 */
.privacy {
  margin-bottom: 20px;
}
.privacy .info {
  display: flex;
  justify-content: space-between;
}
.privacy .info span {
  margin-right: 8px;
}
</style>
