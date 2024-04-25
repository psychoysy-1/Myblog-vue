<script setup>
import { ref, watch } from 'vue'
import { User, Lock, Avatar } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

// 设置转换动画
const isSignUp = ref(false)
const switchForm = () => {
  isSignUp.value = !isSignUp.value
}

// 设置登录前和注册前校验对象
const rForm = ref()
const lForm = ref()
// 定义注册表单
const regFrom = ref({
  username: '',
  nickname: '',
  password: '',
  redpassword: ''
})
const loginForm = ref({
  username: '',
  password: ''
})
// 校验
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{5,12}$/, message: '用户名是5-12位英文字母或数字', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{2,10}$/,
      message: '昵称是2-10位英文字母、数字或中文',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
      message: '密码是6-12位数字、字母组合',
      trigger: 'blur'
    }
  ],
  redpassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== regFrom.value.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 注册逻辑
const register = async () => {
  // 提交前进行校验
  await rForm.value.validate()
  await userRegisterService({
    username: regFrom.value.username,
    nickname: regFrom.value.nickname,
    password: regFrom.value.password
  })
  ElMessage.success('注册成功')
  isSignUp.value = false
}

// 登录逻辑
const router = useRouter()
const userStore = useUserStore()
const login = async () => {
  // 提交前进行校验
  await lForm.value.validate()
  const res = await userLoginService({
    username: loginForm.value.username,
    password: loginForm.value.password
  })
  const { token, username, nickname, _id, email, country, avatar } = res.data
  // 登录提示
  ElMessage.success(`欢迎! ${nickname}`)
  // 储存token
  userStore.setToken(token)
  // 存储用户信息
  userStore.setUser({ username, nickname, _id, email, country, avatar })
  // 跳转到首页
  router.push('/')
}

// 监听切换时候,表单内容重置
watch(isSignUp, () => {
  ;(regFrom.value = {
    username: '',
    nickname: '',
    password: '',
    redpassword: ''
  }),
    (loginForm.value = {
      username: '',
      password: ''
    })
})
</script>

<template>
  <div class="body">
    <div class="cont" :class="{ 's-signup': isSignUp }">
      <!-- 登录相关 -->
      <div class="form sign-in">
        <el-form :width="640" ref="lForm" :model="loginForm" :rules="rules">
          <el-form-item><h2>登录</h2></el-form-item>
          <el-form-item class="label" prop="username">
            <span>用户名</span>
            <el-input :prefix-icon="User" v-model="loginForm.username" clearable></el-input>
          </el-form-item>
          <el-form-item class="label" prop="password">
            <span>密码</span>
            <el-input
              :prefix-icon="Lock"
              show-password
              v-model="loginForm.password"
              @keyup.enter="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn submit" @click="login">登录</el-button>
          </el-form-item>
          <el-form-item>
            <p class="forgot-pass">忘记密码?</p>
          </el-form-item>
        </el-form>

        <!-- 小图标 -->
        <div class="social-media">
          <ul>
            <li>
              <a href="https://m.weibo.cn/"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAh1BMVEUAAADXQDjTQDzaQzfcRTfbRDfcRDbcQzbbRDbbRDfcQzbaQzbbRDbbRDbaRDfcQzbbRDfaQjjaQjXcQzfYRDfbRDTbRDf////gW1D99PPtoZvyubT76Ob20M3pioLdT0Tvrajkc2n20c3rlo7mfnb0xcD43NrrlY7kcmniZ1343driZ1z0xMEgvW1iAAAAFnRSTlMAIBDf34Dv78+/n1BAj7CvcGBgkHBwDUc+aAAAAmpJREFUSMeVlueCqjAQRgOI0qy7m0YVsN297/98OwEdCUQ05w8WDt/MkIjEhJv8RIFHAS/c/CTkM9w4XFKN5ebwgeaDNWURObYa4s+oMWrG1MOruDV9w9o1eU5A37JwDN6CUksTPWsTPXvTRe89wXBCa2rB+ukd6By3K6ca8WcNVoyxLB26i0ex/mxgzRTiMlx990A6C09PZ6XKwXbpIyP6Fn4C8zKONHVYFrJ4tJWfoUMJ5k2PPBi0igHZrX8j4HVLITPXB7udeK1gHem9ziJjouTwQYmnhCCuxh5UhSJO9qKmWwxrTcZeyh5UpcyFyOH0Bi5SaYNNyG7qYeK95CttWUWlJn6PW5RsSgVtlyqxoEhEQs1rNEPrldf5cI8Qb+hxYRKlaVsSY4NZKqU81aynpQY0kTNF3pS4fsDFvTESx4Gi0b4vMqWKdl4UcHWukmSeZXnRV9Gb5VgcDucIJ3B11JbckSmKyXAC7V7I52hxI2WmyYYk0m7+Dbd8JR7boTYlbshOE9WBsYb+MglBZ6r4p8TxXL+Hi7zov2dCnY1N8v7ViIS4z21V9q3U7Ap9YkzOulnrLAkZLtYTA4f+CpYLHEjFgCMdtwhiTBGedT+D/NwtIHU2V3li4tE9iO5qaILQwvF4LNUtTLsr8InnTX6Pebfq8qopmup/V29W0CkRIaNISDmxJwLqNeEYHwG8repzltVpA/Ua8UmP61ErPHy2xnbiniBflg9WxA0sCnXJAMezadDSRM/aRM/eDMCb4n7Z/glE9rOhq5i8xPFfaz7GmdXIs9aw4O1qZIUxam9IdtuwS/aCaJcYrT+uh9kYccQkXQAAAABJRU5ErkJggg=="
              /></a>
            </li>
            <li>
              <a href="https://weixin.qq.com/"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAgVBMVEUAAABXu0BYt0BQt0BXu0BWu0BXu0BXu0BXu0BWukBWukBXvEBXu0BXvEBXvEBYukBVukBXu0BWt0BXukBXuEBXu0D////1+/Pq9+fV7s/A5rer3aBsw1jg89uBzHBiwEy14auL0Xug2ZOW1YeBzG93yGSW1YjL6sO14azL6cN2yGP3XpzOAAAAFXRSTlMA3yAQ78+/r5+AUI9w74BgYEBAkHDBb56KAAACF0lEQVRIx52W6XKDIBRGwT3GZmsRUXFP0vb9H7AKGS8aiCXnR0TCmU/gOoh0uJck8jEZwUGYXND/cOPggyz4CE//0HZgKeDIsdSA3Qs1Bk2XejLF7ckGe1fnOT7ZBDsaDxNiZ4Jna4Jnb7rgbeKrK7QnFuzBOxIrYrsJAth9iIdl/9CwLE0pv/elqfoegWpfXdAUYINW9GRkRIBWakBemiOVGRbpE1lpijwaPDANCxvCc8qBbcVF47vq5EQ1YjCK3nyXiXE3QqrpSseeu+jptc96XgWmHSGDEGtCmDHygpK5nUuRdr2MvvfNdMvzXCN+KVNk6RO0qOpr37fXJzFCwdzmT9532THZovmqFHxlF3/WcdWQGUsBI2g3K/G3WG3o4oEVsVqOK4RHaTpfaKkXCVsWzPTL65pPN7X4kxnEX6qIXS4mJqfOH5tVKSJWzJsiXqlcklxe5AI0yuL4RDUpiKkGphRrRFRK+lLk88AQSg4KXVC9TvwSRQ4MU5m1xZ2xlmnEm1LkrqeKTVbU5rcaNtJDCAWqCOutq90CpjiKMTFQZuuah/9Oo+h6ZtPkYTSxI0YKReWLtxFBpJ5bzjOasWYsoBp6HQSRW5R5tz4C4HS0PltjO/H05sH6iQDXtz0d3/94ANPes/9Asjd9572PwE8X6Tm+DPViZMQ5mLUDxGnVCFtqwDH0VlYQS22bcxIGIhn7UXLWWn+10s6FZo+4YQAAAABJRU5ErkJggg=="
              /></a>
            </li>
            <li>
              <a href="https://im.qq.com/index/"
                ><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAb1BMVEUAAABMouVIn+NEn99MouVMouVMo+ZMouVKouRKouJMn+NMouZLouRLo+VMoeNMouZLoeVLoeVNn+RMouX///+83Pal0PL0+v6x1vRireiay/FXqOfS6Pl5uevH4vePxe+Ev+1utOrp9Pzp8/yEv+7XzqLPAAAAE3RSTlMA3yAQ74C/n2BQQK9wz5CPz7BwJ8NfpgAAAbNJREFUSMe1lutygjAQhTeEOyi2AQIC3t//GcvYqk3OYsh0+v1yMN+czc4mQBwyL5ONUDMiLsqc1iGzOFQGYZGu0KLZQkQSrNSQ6I2aGRqkpktxlXJQSc4LNsqJCBhPOCQwwXOa6PmbErxlNpJeVMqD6uWliqOfprPiyN5tcOp0PaObntnmo9hIAV39pFNA9BOogKb+RQN/h9+RCfzR1gbtQqSArtQmemAjUy4QI7GxBTy92qKGJfEshlgp0DO15srmhuIRFuX0Cc/2KO5hUUkF1xt3dxKKuUS3uCPBjA0w4rySwqYyDLCM+EqxVrd45UTtFm81ywlEuzkHXhyhOfY1DArfntg+jRMY/PB80CeODaLhHigpt7fYNSgeuvpgD7k0j9V4Gfbc6RjN7oRE1rCeejVo27vMD4/WFokynB33qUpnUYb+t5zg7+OhNYrVxx5PIzGRJ9ijniwxIC7y3DV3urZ9/DrDfQxvR793a+YnpvRk6+Nt6YXceRQq//rxgKb/h87/fVrtAmKQW2c/JfGkb0PDjBYJomUtMuJQTcRKDUmL0LLiDDWevCzie7LYJGXOWl/BnLhvbq/sWgAAAABJRU5ErkJggg=="
              /></a>
            </li>
          </ul>
        </div>
      </div>

      <div class="sub-cont">
        <!-- 滑块 -->
        <div class="img">
          <div class="img-text m-up">
            <h2>新人?</h2>
            <p>注册后发布一个你的博客吧!</p>
          </div>
          <div class="img-text m-in">
            <h2>已经注册?</h2>
            <p>快点登录并写一个自己的文章吧!</p>
          </div>
          <div class="img-btn" @click="switchForm">
            <span class="m-up">注册</span>
            <span class="m-in">登录</span>
          </div>
        </div>

        <!-- 注册相关 -->
        <div class="form sign-up">
          <el-form :rules="rules" :width="640" :model="regFrom" ref="rForm">
            <el-form-item><h2>注册</h2></el-form-item>
            <el-form-item class="label" prop="username">
              <span>用户名</span>
              <el-input v-model="regFrom.username" :prefix-icon="User" clearable></el-input>
            </el-form-item>
            <el-form-item class="label" prop="nickname">
              <span>昵称</span>
              <el-input v-model="regFrom.nickname" :prefix-icon="Avatar" clearable></el-input>
            </el-form-item>
            <el-form-item class="label" prop="password">
              <span>密码</span>
              <el-input v-model="regFrom.password" :prefix-icon="Lock" show-password></el-input>
            </el-form-item>
            <el-form-item class="label" prop="redpassword">
              <span>确认密码</span>
              <el-input
                v-model="regFrom.redpassword"
                :prefix-icon="Lock"
                show-password
                @keyup.enter="register"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="reg-btn submit" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <!-- 底部 -->
    <el-footer class="footer">
      <p>© 2024 crerate by 由思远</p>
    </el-footer>
  </div>
</template>

<!-- 全局设置  -->
<style>
*,
*:before,
*:after {
  margin: 0;
  padding: 0;
}
</style>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}
.body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(left, #7579ff, #b224ef);
  font-family: 'Nunito', sans-serif;
}

/* 页脚设置 */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  text-align: center;
  padding: 10px 0;
}

/* 中间盒子样式设置 */
.cont {
  overflow: hidden;
  position: relative;
  width: 900px;
  height: 550px;
  background: #fff;
  box-shadow:
    0 19px 38px rgba(0, 0, 0, 0.3),
    0 15px 12px rgba(0, 0, 0, 0.22);
}

/* 表格大小样式设置 */
.form {
  position: relative;
  width: 640px;
  height: 100%;
  padding: 50px 30px;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
  transition:
    transform 1.2s ease-in-out,
    -webkit-transform 1.2s ease-in-out;
}

/* 顶部标题样式设置 */
h2 {
  width: 100%;
  font-size: 30px;
  text-align: center;
}

.label {
  width: 260px;
  margin: 20px auto 0;
}
.label span {
  display: inline-block;
  vertical-align: middle;
  font-size: 15px;
  font-weight: 600;
  color: #505f75;
  text-transform: uppercase;
}

/* 登录注册按钮样式设置 */
.login-btn,
.reg-btn {
  display: block;
  margin: 0 auto;
  width: 260px;
  height: 36px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}
.submit {
  margin-top: 40px;
  margin-bottom: 10px;
  text-transform: uppercase;
  font-weight: 600;
  background: -webkit-linear-gradient(left, #7579ff, #b224ef);
}
.submit:hover {
  color: white;
  background: -webkit-linear-gradient(left, #b224ef, #7579ff);
}

/* 忘记密码 */
.forgot-pass {
  width: 600px;
  margin-top: 5px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #0c0101;
  cursor: pointer;
}
.forgot-pass:hover {
  color: red;
}

/* 三个小图标 */
.social-media {
  width: 100%;
  text-align: center;
}
.social-media ul {
  list-style: none;
}
.social-media ul li {
  display: inline-block;
  cursor: pointer;
  margin: 15px 15px;
}
.social-media img {
  width: 40px;
  height: 40px;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: 640px;
  top: 0;
  width: 900px;
  height: 100%;
  padding-left: 260px;
  background: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition: transform 1.2s ease-in-out;
}

/* 位移样式设置 */
.cont.s-signup .sub-cont {
  -webkit-transform: translate3d(-640px, 0, 0);
  transform: translate3d(-640px, 0, 0);
}

/* 滑块按钮设置 */
.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 260px;
  height: 100%;
  padding-top: 360px;
}
.img:before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 900px;
  height: 100%;
  background-image: url(@/assets/bg.jpg);
  background-size: cover;
  transition: -webkit-transform 1.2s ease-in-out;
  transition:
    transform 1.2s ease-in-out,
    -webkit-transform 1.2s ease-in-out;
}
.img:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.cont.s-signup .img:before {
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

/* 图片上字设置 */
.img-text {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  color: #fff;
  -webkit-transition: -webkit-transform 1.2s ease-in-out;
  transition: -webkit-transform 1.2s ease-in-out;
  transition:
    transform 1.2s ease-in-out,
    -webkit-transform 1.2s ease-in-out;
}
.img-text h2 {
  margin-bottom: 10px;
  font-weight: normal;
}
.img-text p {
  font-size: 14px;
  line-height: 1.5;
}

/* 滑块按钮设置 */
.cont.s-signup .img-text.m-up {
  -webkit-transform: translateX(520px);
  transform: translateX(520px);
}
.img-text.m-in {
  -webkit-transform: translateX(-520px);
  transform: translateX(-520px);
}
.cont.s-signup .img-text.m-in {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}

.sign-in {
  padding-top: 65px;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.cont.s-signup .sign-in {
  -webkit-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
  -webkit-transition-duration: 1.2s;
  transition-duration: 1.2s;
  -webkit-transform: translate3d(640px, 0, 0);
  transform: translate3d(640px, 0, 0);
}

.img-btn {
  overflow: hidden;
  z-index: 2;
  position: relative;
  width: 100px;
  height: 36px;
  margin: 0 auto;
  background: transparent;
  color: #fff;
  text-transform: uppercase;
  font-size: 15px;
  cursor: pointer;
}

.img-btn:after {
  content: '';
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #fff;
  border-radius: 30px;
}

.img-btn span {
  position: absolute;
  left: 0;
  top: 0;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-transition: -webkit-transform 1.2s;
  transition: -webkit-transform 1.2s;
  transition: transform 1.2s;
  transition:
    transform 1.2s,
    -webkit-transform 1.2s;
}

.img-btn span.m-in {
  -webkit-transform: translateY(-72px);
  transform: translateY(-72px);
}

.cont.s-signup .img-btn span.m-in {
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.cont.s-signup .img-btn span.m-up {
  -webkit-transform: translateY(72px);
  transform: translateY(72px);
}

.sign-up {
  -webkit-transform: translate3d(-900px, 0, 0);
  transform: translate3d(-900px, 0, 0);
}

.cont.s-signup .sign-up {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
