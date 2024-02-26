<script setup>
import {
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
const router = useRouter()
const handleCommand = (command) => {
  if (command === 'logout') {
    // 提示用户是否退出
    ElMessageBox.confirm('你确认要退出吗？', '温馨提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 清除用户信息
      userStore.setUser([])
      userStore.removeToken()
      // 跳转到登录页面
      router.push('/login')
    })
  } else {
    router.push('/users/' + command)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo">
        <span class="header_text">校园固定资产管理系统</span>
      </div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        text-color="#fff"
        :default-active="$route.path"
        router
      >
        <el-menu-item index="/assets/manage">
          <el-icon>
            <Management />
          </el-icon>
          <span>资产管理</span>
        </el-menu-item>
        <el-menu-item index="/disposals/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>处置记录</span>
        </el-menu-item>

        <el-menu-item index="/inventory/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>库存管理</span>
        </el-menu-item>
        <el-menu-item index="/maintenance/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>维护管理</span>
        </el-menu-item>
        <el-menu-item index="/reports/report">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>资产报告</span>
        </el-menu-item>
        <!-- 多级菜单 -->
        <el-sub-menu>
          <!-- 多级菜单的标题 - 具名插槽 title -->
          <template #title>
            <!-- 多级菜单的图标 -->
            <el-icon>
              <UserFilled />
            </el-icon>
            <!-- 多级菜单的文字 -->
            <span>个人中心</span>
          </template>

          <!-- 多级菜单的子菜单 -->
          <el-menu-item index="/users/info">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/users/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/users/repassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
        <!-- 多级菜单结束 -->
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div>
          <strong>
            {{ userStore.user === null ? '未知身份' : userStore.user.role }}
            :
            {{ userStore.user === null ? '未知姓名' : userStore.user.username }}
          </strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
          <span class="el-dropdown__box">
            <el-avatar :icon="UserFilled" />
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="User" command="info"
                >基本资料</el-dropdown-item
              >
              <el-dropdown-item :icon="Crop" command="avatar"
                >更换头像</el-dropdown-item
              >
              <el-dropdown-item :icon="EditPen" command="repassword"
                >重置密码</el-dropdown-item
              >
              <el-dropdown-item :icon="SwitchButton" command="logout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view />
      </el-main>
      <!-- 底部区域 -->
      <el-footer>校园固定资产管理系统 ©2024 Created by 艾力扎提</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      // background: url('@/assets/logo.png') no-repeat center / 120px auto;
      .header_text {
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        line-height: 120px;
      }
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
