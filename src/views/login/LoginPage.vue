<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
// ================================== 动态文字相关 ==================================
// 动态文字
const fullText = '校园固定资产管理系统'
const dynamicText = ref([])

const displayText = () => {
  dynamicText.value = [] // 重置文本
  let currentIndex = 0
  const interval = setInterval(() => {
    dynamicText.value.push(fullText[currentIndex])
    currentIndex++
    if (currentIndex === fullText.length) {
      clearInterval(interval)
    }
  }, 100) // 控制速度，每100毫秒添加一个字符
}

onMounted(() => {
  displayText() // 首次加载时立即执行
  setInterval(displayText, 10000) // 每3秒重复执行
})
// ================================== 注册相关 ==================================
// 切换注册和和登录
const isRegister = ref(false)

// 表单相关
const registerFromModel = ref({
  username: '',
  password: '',
  repassword: '',
  role: '',
  phone: '',
  department: '',
  email: ''
})
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-11位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-11位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== registerFromModel.value.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      }
    }
  ],
  role: [{ required: true, message: '请输入角色', trigger: 'blur' }],
  department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 7, max: 11, message: '手机号码必须是7-11位', trigger: 'blur' }
  ],
  email: [{ required: true, message: '请输入邮件', trigger: 'blur' }]
}

const options = [
  {
    value: 'manager',
    label: '资产管理人员'
  },
  {
    value: 'admin',
    label: '系统管理员'
  }
]

const registerFrom = ref()

// 注册
const register = async () => {
  //注册成功之前，先进性校验，校验成功 -> 请求，校验失败 -> 自动提示
  await registerFrom.value.validate()
  // console.log(registerFromModel.value)
  await userRegisterService(registerFromModel.value)
  // 提示注册成功
  ElMessage.success('注册成功')
}

// ================================== 登录相关 ==================================

const loginFormModel = ref({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名必须是5-10位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-11位的非空字符',
      trigger: 'blur'
    }
  ]
}

const loginForm = ref()

const userStore = useUserStore()
const router = useRouter()
// 登录
const login = async () => {
  //登录成功之前，先进性校验，校验成功 -> 请求，校验失败 -> 自动提示
  await loginForm.value.validate()
  // console.log('开始登录')
  const res = await userLoginService(loginFormModel.value)
  userStore.setToken(res.data.access)
  ElMessage.success('登录成功')
  router.push('/')
}

// 切换的时候清空表单
watch(isRegister, () => {
  if (isRegister.value) {
    registerFrom.value = {
      username: '',
      password: '',
      repassword: '',
      role: '',
      phone: '',
      department: '',
      email: ''
    }
  } else {
    loginForm.value = {
      username: '',
      password: ''
    }
  }
})
</script>
<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg">
      <!-- 动态文字 -->
      <div class="dynamic-text">
        <span
          style="font-size: 40px"
          v-for="(char, index) in dynamicText"
          :key="index"
          class="char"
          :style="{ 'animation-delay': `${index * 0.1}s` }"
        >
          {{ char }}
        </span>
      </div>
    </el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form
        ref="registerFrom"
        size="large"
        autocomplete="on"
        v-if="isRegister"
        :model="registerFromModel"
        :rules="registerRules"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="registerFromModel.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="registerFromModel.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
            v-model="registerFromModel.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="registerFromModel.role" placeholder="请选择角色">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="department">
          <el-input
            v-model="registerFromModel.department"
            placeholder="请输入部门"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            v-model="registerFromModel.phone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="registerFromModel.email"
            placeholder="请输入邮件"
          ></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="register"
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        ref="loginForm"
        size="large"
        autocomplete="on"
        :rules="loginRules"
        :model="loginFormModel"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            name="username"
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="loginFormModel.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            v-model="loginFormModel.password"
          ></el-input>
        </el-form-item>
        <!-- 记住我和忘记密码 -->
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="login"
          >
            登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background-color: aqua;
    border-radius: 0 20px 20px 0;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100vh; /* 让.bg元素的高度占满视口高度 */

    .char {
      opacity: 0;
      transform: translateX(-20px);
      animation: charIn 0.5s forwards;
    }
    @keyframes charIn {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
