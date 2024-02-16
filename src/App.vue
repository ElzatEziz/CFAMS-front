<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { useCountStore } from '@/stores'

const router = useRouter()
const route = useRoute()

const goLink = () => {
  router.push('/list')
  console.log(router, route)
}

const userStore = useUserStore()
const counterStore = useCountStore()
</script>

<template>
  <router-view></router-view>

  <hr />
  <hr />
  <hr />

  <div>我是App</div>
  <el-button @click="$router.push('/home')">跳首页</el-button>
  <el-button @click="goLink">跳列表页</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('this is token 1231231231321')"
    >登陆</el-button
  >
  <el-button @click="userStore.removeToken()">退出</el-button>

  <p>{{ counterStore.count }}</p>
  <el-button @click="counterStore.add(2)">加法-2</el-button>
</template>

<style scoped></style>
