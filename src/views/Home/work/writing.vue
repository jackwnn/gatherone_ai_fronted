<template>
  <div class="dialogue_div" style="display: flex">
    <div :class="isCollapse ? 'writ_log' : 'collapwrit_log'">
      <div v-if="writFlag">
        <p style="display: flex; justify-content: space-between">
          <span style="font-size: 16px; color: rgba(0, 0, 0, 0.85)">AI写作</span
          ><span style="font-size: 14px; color: #6b70fb">插入示例</span>
        </p>
        <div style="width: 100%; margin-top: 24px">
          <p class="writ_name">
            <img src="@/assets/img/subject.png" alt="" class="writ_img" />主题
          </p>
          <a-textarea
            v-model="subjectValue"
            style="border: none"
            placeholder="请输入写作主题"
            :auto-size="{ minRows: 5, maxRows: 5 }"
          />

          <p class="writ_name" style="margin-top: 16px">
            <img
              src="@/assets/img/require.png"
              alt=""
              class="writ_img"
            />写作要求
          </p>
          <a-textarea
            v-model="requireValue"
            style="border: none"
            placeholder="请输入具体写作要求"
            :auto-size="{ minRows: 5, maxRows: 5 }"
          />
        </div>

        <!-- 立即生成 -->
        <div
          class="generatebtn"
          :style="
            subjectValue && requireValue
              ? 'cursor: pointer;background:#6B70FB'
              : 'cursor: not-allowed;background: rgba(107, 112, 251, 0.4);'
          "
          @click="immediate_generation"
        >
          立即生成
        </div>
        <!-- 清除记录按钮 -->
        <div
          class="eliminatebutton"
          style="width: 260px"
          @click="empty_content"
        >
          <a-icon type="delete" style="margin-right: 6px" />清除所有对话
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
        <div
          v-for="(msg, index) in writDialogue"
          :key="index"
          style="margin-bottom: 36px"
        >
          <div style="display: flex">
            <div
              style="
                width: 46px;
                height: 46px;
                background: #b0b0b0;
                border-radius: 50%;
              "
            ></div>
            <p
              style="
                line-height: 46px;
                margin-left: 16px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
              "
            >
              03-08 11:44:44
            </p>
          </div>
          <div
            style="
              padding: 16px;
              border-radius: 4px;
              background: #fff;
              color: rgba(0, 0, 0, 0.85);
              font-size: 14px;
              line-height: 24px;
            "
          >
            {{ msg.text }}
          </div>
          <div style="display: flex; cursor: pointer; margin-top: 8px">
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>复制</span>
              </template>
              <a-icon
                type="copy"
                class="custom-icon"
                style="color: rgba(0, 0, 0, 0.45); margin-right: 10px"
              />
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>刷新</span>
              </template>
              <a-icon
                type="redo"
                class="custom-icon"
                style="color: rgba(0, 0, 0, 0.45); margin-right: 10px"
              />
            </a-tooltip>

            <a-tooltip placement="bottom">
              <template slot="title">
                <span>分享</span>
              </template>
              <a-icon
                type="upload"
                class="custom-icon"
                style="color: rgba(0, 0, 0, 0.45); margin-right: 10px"
              />
            </a-tooltip>
          </div>
          <div
            style="
              width: 100%;
              text-align: center;
              color: #6b70fb;
              font-size: 14px;
              cursor: pointer;
            "
          >
          <img src="@/assets/img/generation.png" alt="" style="width: 16px;height: 16px;margin: -2px 6px 0 0;">
            终止生成
          </div>
        </div>
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
              AI写作结果会显示在这里，现在你只需要
            </span>
            <span slot="description">
              <li
                style="
                  color: rgba(0, 0, 0, 0.65);
                  font-size: 14px;
                  line-height: 22px;
                "
              >
                在左侧填好必要信息，填写越详细，结果越准确哦
              </li>
            </span>
            <span slot="description"
              ><li
                style="
                  color: rgba(0, 0, 0, 0.65);
                  font-size: 14px;
                  line-height: 22px;
                "
              >
                点击立即生成，期待AI妙笔生花
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
  name: 'writing',
  data () {
    return {
      isCollapse: true, // 写作抽屉展开收起绑定值
      writFlag: true, // 抽屉里内容显示隐藏绑定值
      subjectValue: '', // 写作主题绑定值
      requireValue: '', // 写作要求绑定值
      contentFlag: false, // 写作内容和提示语显示隐藏绑定值
      writDialogue: [] // 写作返回数组
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
      if (this.subjectValue && this.requireValue) {
        this.contentFlag = true
        this.writDialogue.push({ text: this.subjectValue, isSelf: false })
        // 发送后清空输入框
        this.subjectValue = ''
        this.requireValue = ''
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
        content: (h) => <div>确定要清除所有内容吗?</div>,
        onOk () {
          that.subjectValue = ''
          that.requireValue = ''
        },
        onCancel () {},
        class: 'test'
      })
    }
  }
}
</script>
<style scoped lang="scss">
.writ_log {
  width: 330px;
  height: 100%;
  background: linear-gradient(to bottom, #ebf2ff, #ededff);
  border-left: 1px solid #d6e4ff;
  position: relative !important;
  transition: width 0.8s;
  -moz-transition: width 0.8s; /* Firefox 4 */
  -webkit-transition: width 0.8s; /* Safari and Chrome */
  -o-transition: width 0.8s; /* Opera */
  transition: all 0.6s;
  box-sizing: border-box;
  padding: 24px 24px 24px 16px;
  box-sizing: border-box;
}

.collapwrit_log {
  width: 0px;
  height: 100%;
  background: linear-gradient(to bottom, #ebf2ff, #ededff);
  border-left: 1px solid #d6e4ff;
  position: relative !important;
  transition: width 0.8s;
  -moz-transition: width 0.8s; /* Firefox 4 */
  -webkit-transition: width 0.8s; /* Safari and Chrome */
  -o-transition: width 0.8s; /* Opera */
  transition: all 0.6s;
}

.isCollapsebtn {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  right: -10px;
  cursor: pointer;
  z-index: 1;
}

.writ_name {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
}

.writ_img {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

.writ_conatiner {
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.writself {
  text-align: right;
}
</style>
