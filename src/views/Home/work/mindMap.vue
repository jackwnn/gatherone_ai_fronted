<template>
  <div class="dialogue_div" style="display: flex">
    <div :class="isCollapse ? 'writ_log' : 'collapwrit_log'">
      <div v-if="writFlag">
        <span style="font-size: 16px; color: rgba(0, 0, 0, 0.85)"
          >AI思维导图</span
        >
        <div style="width: 100%; margin-top: 24px">
          <p class="writ_name">
            <img
              src="@/assets/img/require.png"
              alt=""
              class="writ_img"
            />需求描述
          </p>
          <a-textarea
            v-model="demandValue"
            style="border: none"
            placeholder="请输入需求描述"
            :auto-size="{ minRows: 5, maxRows: 5 }"
          />
          <!-- 立即生成 -->
          <div
            class="demandbtn"
            :style="
              demandValue
                ? 'cursor: pointer;background:#6B70FB'
                : 'cursor: not-allowed;background: rgba(107, 112, 251, 0.4);'
            "
            @click="immediate_generation"
          >
            立即生成
          </div>
          <!-- 清除记录按钮 -->
          <div
            class="demandbtn"
            style="
              color: rgba(0, 0, 0, 0.45);
              border: 1px solid rgba(0, 0, 0, 0.1);
              cursor: pointer;
              margin: 0;
            "
            @click="empty_content"
          >
            <a-icon type="delete" style="margin-right: 6px" />清除所有内容
          </div>
          <p
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 20px;
            "
          >
            <span style="font-size: 14px; color: rgba(0, 0, 0, 0.85)"
              ><img
                src="@/assets/img/require.png"
                alt=""
                class="writ_img"
              />生成内容</span
            ><span style="font-size: 14px; color: #6b70fb">插入示例</span>
          </p>
          <a-textarea
            v-model="generated_content"
            style="border: none"
            placeholder="无限的宇宙"
            :auto-size="{ minRows: 16, maxRows: 16 }"
          />
          <p
            style="
              display: flex;
              justify-content: end;
              font-size: 14px;
              color: #6b70fb;
              line-height: 44px;
              cursor: pointer;
            "
          >
            复制
          </p>
        </div>
      </div>
      <!-- 对话记录展开收起按钮 -->
      <img
        src="@/assets/img/unfold.png"
        alt=""
        class="isCollapsebtn"
        @click="menu_folding"
        v-if="isCollapse"
      />
      <img
        v-else
        src="@/assets/img/takeback.png"
        alt=""
        class="isCollapsebtn"
        @click="menu_folding"
      />
    </div>
    <!-- 内容 -->
    <div
      :style="
        isCollapse
          ? 'padding: 60px 0; width: calc(100% - 320px)'
          : 'padding: 60px 0; width: 100%'
      "
      class="writ_conatiner"
    >
      <!-- 对话内容 -->
      <div class="initial" v-if="contentFlag">
        思维导图内容
      </div>
      <!-- 提示语 -->
      <div class="dialogue_container" style="margin-top: 180px" v-else>
        <template>
          <a-empty>
            <span
              slot="description"
              style="
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                line-height: 32px;
              "
            >
              当前内容是空的哦
            </span>
            <span slot="description">
              <li
                style="
                  color: rgba(0, 0, 0, 0.65);
                  font-size: 14px;
                  line-height: 22px;
                "
              >
                在左侧输入描述，创建你的作品吧！
              </li>
            </span>
          </a-empty>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mindMap',
  data () {
    return {
      isCollapse: true, // 写作抽屉展开收起绑定值
      writFlag: true, // 抽屉里内容显示隐藏绑定值
      demandValue: '', // 写作主题绑定值
      generated_content: '', // 写作要求绑定值
      contentFlag: false // 写作内容和提示语显示隐藏绑定值
    }
  },
  methods: {
    // 写作抽屉展开收起点击事件
    menu_folding () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        setTimeout(() => {
          this.writFlag = true
        }, 400)
      } else {
        this.writFlag = false
      }
    },
    // 立即生成
    immediate_generation () {
      if (this.demandValue) {
        this.contentFlag = true
        // 发送后清空输入框
        this.demandValue = ''
      }
    },
    // 清除所有内容按钮
    empty_content () {
      const that = this
      this.$confirm({
        title: '删除',
        okText: '确定',
        cancelText: '取消',
        icon: 'info-circle',
        content: (h) => <div>确定要清空吗?</div>,
        onOk () {
          that.demandValue = ''
        },
        onCancel () {},
        class: 'test'
      })
    }
  }
}
</script>
<style scoped lang="scss">

.demandbtn {
  width: 100%;
  height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  margin: 16px 0 12px 0;
}
</style>
