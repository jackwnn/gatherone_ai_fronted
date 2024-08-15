<template>
  <div class="dialogue_div" style="display: flex">
    <div :class="isCollapse ? 'writ_log' : 'collapwrit_log'">
      <div v-if="writFlag">
        <p style="display: flex; justify-content: space-between">
          <span style="font-size: 16px; color: rgba(0, 0, 0, 0.85)"
            >AI文生图</span
          >
        </p>
        <div style="width: 100%; margin-top: 24px">
          <p class="writ_name">
            <img
              src="@/assets/img/require.png"
              alt=""
              class="writ_img"
            />文本描述
          </p>
          <a-textarea
            v-model="requireValue"
            style="border: none"
            placeholder="沉浸在全页灰度涂色的迷人世界中，有一只老虎在曼陀罗宁静的森林中..."
            :auto-size="{ minRows: 5, maxRows: 5 }"
          />
          <p class="writ_name" style="margin-top: 16px">
            <img src="@/assets/img/Vector.png" alt="" class="writ_img" />
            风格选择
          </p>
          <!-- 8个图片的展示 == 风格选择图片 -->
          <a-row type="flex" justify="space-between">
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/fugu.png"
                alt=""
              />
              <div class="textCss">复古漫画</div>
            </a-col>
            <a-col :span="5.5">
              <img class="imgCss" src="../../../assets/wsImage/3d.png" alt="" />
              <div class="textCss" style="margin-left: 4px">3D卡通</div>
            </a-col>
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/gufeng.png"
                alt=""
              />
              <div class="textCss">古风人像</div>
            </a-col>
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/niantu.png"
                alt=""
              />
              <div class="textCss">粘土世界</div>
            </a-col>
          </a-row>
          <a-row style="margin-top: 8px" type="flex" justify="space-between">
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/monai.png"
                alt=""
              />
              <div class="textCss">莫奈花园</div>
            </a-col>
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/tongnian.png"
                alt=""
              />
              <div class="textCss">童年绘本</div>
            </a-col>
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/houtu.png"
                alt=""
              />
              <div class="textCss">厚涂原画</div>
            </a-col>
            <a-col :span="5.5">
              <img
                class="imgCss"
                src="../../../assets/wsImage/jianbi.png"
                alt=""
              />
              <div class="textCss" style="margin-left: 6px">简笔画</div>
            </a-col>
          </a-row>
          <p class="writ_name" style="margin-top: 16px">
            <img src="@/assets/img/Frame.png" alt="" class="writ_img" />
            图片尺寸
          </p>
          <!-- 图片尺寸 -->
          <div style="">
            <a-row type="flex" justify="space-between">
              <a-col :span="7.5">
                <div class="imgSize">
                  <div class="firstBox smallBox"></div>
                  1 : 1
                </div>
              </a-col>
              <a-col :span="7.5">
                <div class="imgSize">
                  <div class="secondBox smallBox"></div>
                  16 : 9
                </div>
              </a-col>
              <a-col :span="7.5">
                <div class="imgSize">
                  <div class="thirdBox smallBox"></div>
                  9 : 16
                </div>
              </a-col>
            </a-row>
          </div>
        </div>

        <!-- 立即生成 -->
        <div
          class="generatebtn"
          :style="
            requireValue
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
          <a-icon type="delete" style="margin-right: 6px" />清空所有内容
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
      <!-- 提示语 -->
      <div class="dialogue_container" style="margin-top: 180px">
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
              当前任务是空的哦
            </span>
            <div
              slot="description"
              style="
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                line-height: 22px;
              "
            >
              在左侧输入描述，创建你的作品吧！
            </div>
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
      isCollapse: true, // 抽屉展开收起绑定值
      writFlag: true, // 抽屉里内容显示隐藏绑定值
      requireValue: ''// 要求绑定值
    }
  },
  methods: {
    // 抽屉展开收起点击事件
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
        onCancel () { },
        class: 'test'
      })
    }
  }
}
</script>
<style scoped lang="scss">
// 图片尺寸
.imgSize {
  width: 90px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  text-align: center;
  font-size: 12px;
}

// 文生图几张图片的大小
.imgCss {
  position: relative;
  width: 66px;
  height: 66px;
}
// 图片上文字
.textCss {
  position: absolute;
  color: #fff;
  bottom: 0; /* 底部对齐 */
  left: 13%; /* 水平居中 */
  font-size: 12px;
}
// 图片尺寸上小方框
.smallBox {
  margin-right: 8px;
  background: #d9d9d9;
}
.firstBox {
  width: 16px;
  height: 16px;
}
.secondBox {
  width: 16px;
  height: 9px;
}
.thirdBox {
  width: 9px;
  height: 16px;
}
.writ_img {
  width: 14px;
  height: 14px;
  margin-right: 6px;
}

// 左右无文字的提示
.noTextCss {
  margin: auto;
}
</style>
