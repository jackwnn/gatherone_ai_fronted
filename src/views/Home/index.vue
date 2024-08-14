<template>
  <div class="home_container">
    <!-- 左侧内容 -->
    <div class="navigation">
      <!-- 头部logo -->
      <img
        src="@/assets/img/Frame 1.png"
        alt=""
        style="width: 180px; height: 35px"
      />
      <!-- 导航内容 -->
      <div style="width: 180px">
        <a-menu
          :default-selected-keys="selectedKeys"
          :default-open-keys="openKeys"
          mode="inline"
          @click="handelClick"
        >
          <a-menu-item key="/home/dialogue">
            <a-icon type="message" theme="filled" style="font-size: 16px" />
            <span>对话</span>
          </a-menu-item>
          <a-sub-menu v-for="item in menuData" :key="item.key">
            <span slot="title"
              ><a-icon
                :type="item.type"
                theme="filled"
                style="font-size: 16px"
              /><span>{{ item.title }}</span></span
            >
            <a-menu-item v-for="child in item.children" :key="child.key">
              {{ child.text }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <!-- 登录按钮 -->
      <div class="loginbutton" @click="visible = !visible">立即登录</div>
    </div>
    <!-- 右侧内容容器 -->
    <div class="main_content">
      <router-view></router-view>
    </div>
    <!-- 登录注册弹窗 -->
    <a-modal
      :closable="false"
      :visible="visible"
      :confirm-loading="confirmLoading"
      :footer="null"
      :width="364"
    >
      <login @close="closeFn"></login>
    </a-modal>
  </div>
</template>

<script>
import login from '../Login/index.vue'
export default {
  components: {
    login
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      // 二级导航循环值
      menuData: [
        // AI办公平台
        {
          key: 'home/work/',
          title: 'AI办公平台',
          type: 'profile',
          children: [
            {
              key: '/home/work/writing',
              path: '/home/work/writing',
              text: 'AI写作'
            },
            {
              key: '/home/work/makePPT',
              path: '/home/work/makePPT',
              text: 'AI制作PPT'
            },
            {
              key: '/home/work/mindMap',
              path: '/home/work/mindMap',
              text: 'AI思维导图'
            }
          ]
        },
        // AI绘画平台
        {
          key: 'home/painting/',
          title: 'AI绘画平台',
          type: 'picture',
          children: [
            {
              key: '/home/painting/vincentDiagram',
              path: '/home/painting/vincentDiagram',
              text: 'AI文生图'
            }
          ]
        },
        // AI语音平台
        {
          key: 'home/voice/',
          title: 'AI语音平台',
          type: 'sound',
          children: [
            {
              key: '/home/voice/audiotoText',
              path: '/home/voice/audiotoText',
              text: 'AI音频转文字'
            }
          ]
        }
      ]
    }
  },
  watch: {},
  computed: {
    selectedKeys () {
      return [this.$route.path]
    },
    openKeys () {
      // 查找当前路由在children中的位置，以此确定需要展开的父级菜单
      const found = this.menuData.find((subMenu) =>
        subMenu.children.some((child) => child.path === this.$route.path)
      )
      return found ? [found.key] : []
    }
  },
  created () {},
  methods: {
    // 导航路由点击事件
    handelClick (item) {
      // 判断点击路径与点击菜单路径是否不同
      // 避免重复替换相同路径
      if (item.key !== this.$route.path) {
        this.$router.push(item.key)
      }
    },
    closeFn (data) {
      this.visible = data
    }
  }
}
</script>
