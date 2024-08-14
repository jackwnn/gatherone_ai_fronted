<template>
  <div class="dialogue_div" style="display: flex">
    <!-- 对话记录 -->
    <div :class="isCollapse ? 'session_log' : 'collapsession_log'">
      <div v-if="conversationFlag" style="height: 100%">
        <div class="new_conversation">
          <a-icon type="plus" style="margin-right: 10px" />
          新对话
        </div>
        <div class="search_history">
          <a-input-search
            placeholder="搜索历史记录"
            style="width: 100%"
            class="custom-input-search"
          />
        </div>
        <div class="dialogDiv">
          <div v-for="(item, index) in sessionlogData" :key="index">
            <p
              style="
                margin: 10px 0 10px 8px;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
              "
            >
              {{ item.data }}
            </p>
            <div
              class="dialog_content"
              v-for="(items, indexs) in item.contentDialog"
              :key="indexs"
            >
              {{ items }}
              <div class="record_edit">
                <a-icon type="upload" class="record_icon" />
                <a-icon
                  type="edit"
                  class="record_icon"
                  @click="rechristenFn(items)"
                />
                <a-icon
                  type="delete"
                  class="record_icon"
                  @click="delete_session"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- 清除记录按钮 -->
        <div class="eliminatebutton" @click="clear_record">
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
          ? 'padding: 60px 0; width: calc(100% - 220px)'
          : 'padding: 60px 0; width: 100%'
      "
    >
      <div class="dialogue_container">
        <div class="initial" v-if="dialogueFlag === '新闻'">
          <div style="width: 100%; height: 100px; text-align: center">
            <img
              src="@/assets/img/Frame 1.png"
              alt=""
              style="width: 194px; height: 46px"
            />
          </div>
          <div style="width: 100%; height: 342px; margin-bottom: 28px">
            新闻内容模块
          </div>
        </div>
        <div class="diaLogue" v-if="dialogueFlag === '对话'">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="{ self: msg.isSelf }"
            style="margin-bottom: 36px"
          >
            <div style="display: flex; justify-content: flex-end">
              <p
                style="
                  line-height: 46px;
                  margin-right: 16px;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.45);
                "
              >
                03-08 11:44:44
              </p>
              <div
                style="
                  width: 46px;
                  height: 46px;
                  background: #b0b0b0;
                  border-radius: 50%;
                "
              ></div>
            </div>
            <div
              style="
                padding: 16px;
                border-radius: 4px;
                background: linear-gradient(to right, #6b70fb, #b885c7);
                color: #fff;
                font-size: 14px;
                line-height: 24px;
              "
            >
              {{ msg.text }}
            </div>
            <div
              style="
                display: flex;
                justify-content: flex-end;
                cursor: pointer;
                margin-top: 8px;
              "
            >
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>编辑</span>
                </template>
                <a-icon
                  type="edit"
                  class="custom-icon"
                  @click="session_contentedit(msg.text)"
                />
              </a-tooltip>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>刷新</span>
                </template>
                <a-icon type="redo" class="custom-icon" />
              </a-tooltip>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>复制</span>
                </template>
                <a-icon type="copy" class="custom-icon" @click="session_contentCopy(msg.text)"/>
              </a-tooltip>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>删除</span>
                </template>
                <a-icon type="delete" class="custom-icon" @click="session_deletion"/>
              </a-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部输入框盒子 -->
      <div class="import_container">
        <div class="importDiv">
          <div class="importTop">
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>一次最多上传1个文件<br />格式Word/PDF,单个最大10MB</span>
              </template>
              <a-upload
                list-type="picture"
                action="//jsonplaceholder.typicode.com/posts/"
              >
                <div
                  class="upload_pictures"
                  @mouseover="fileover"
                  @mouseout="fileout"
                >
                  <img
                    id="myImage"
                    :src="fileImg"
                    alt=""
                    style="width: 16px; height: 16px; margin: 4px"
                  />
                  文件
                </div>
              </a-upload>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>当前支持上传一张图片<br />最大10MB</span>
              </template>
              <div
                class="upload_pictures"
                @mouseover="pictureover"
                @mouseout="pictureout"
              >
                <img
                  :src="pictureImg"
                  alt=""
                  style="width: 16px; height: 16px; margin: 4px"
                />
                图片
              </div>
            </a-tooltip>
          </div>
          <a-textarea
            v-model="textareaValue"
            style="border: none"
            placeholder="问我任何问题...(Shift + Enter换行，按下Enter发送)"
            :auto-size="{ minRows: 5, maxRows: 5 }"
            @pressEnter="handleSend"
          />
          <div
            class="sendbtn"
            :style="
              textareaValue === ''
                ? 'background: linear-gradient(to bottom, #ebf2ff, #ededff);cursor: not-allowed;'
                : 'background: linear-gradient(to bottom, #6B70FB, #B06AB3);cursor: pointer;'
            "
            :disabled="textareaValue === '' ? true : false"
            @click="handleSend"
          >
            <img
              src="@/assets/img/send.png"
              alt=""
              style="width: 14px; height: 14px"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 对话记录重命名 -->
    <a-modal
      title="重命名"
      :closable="true"
      :visible="rechristenDialog"
      :footer="null"
      :width="416"
      @cancel="rechristenDialog = false"
    >
      <a-textarea
        v-model="rechristenForm.value"
        :auto-size="{ minRows: 3, maxRows: 9 }"
      />
      <div
        style="
          width: 100%;
          height: 32px;
          display: flex;
          justify-content: flex-end;
          margin-top: 24px;
        "
      >
        <div class="dialogClear" @click="rechristenDialog = false">取消</div>
        <div class="dialogconfirm" @click="rechristenDialog = false">确定</div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'dialogue',
  data () {
    return {
      isCollapse: true, // 对话框展开收起绑定值
      fileImg: require('@/assets/img/file.png'), // 文件路径绑定值
      pictureImg: require('@/assets/img/picture.png'), // 图片路径绑定值
      textareaValue: '', // 对话输入框绑定值
      dialogueFlag: '新闻', // 新闻or对话展示内容绑定值
      messages: [], // 存储所有消息的数组
      conversationFlag: true, // 对话历史记录展示收起绑定值
      sessionlogData: [
        {
          data: '今天',
          contentDialog: [
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...'
          ]
        },
        {
          data: '昨天',
          contentDialog: [
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...'
          ]
        },
        {
          data: '过去七天',
          contentDialog: [
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...',
            '假如你是一位考研指导专...'
          ]
        }
      ], // 对话记录数据
      rechristenDialog: false, // 对话记录编辑绑定值
      rechristenForm: {
        value: ''
      }
    }
  },
  methods: {
    // 文件移入更换图片路径
    fileover () {
      this.fileImg = require('@/assets/img/fileActive.png')
    },
    // 文件移出更换图片路径
    fileout () {
      this.fileImg = require('@/assets/img/file.png')
    },
    // 图片移入更换图片路径
    pictureover () {
      this.pictureImg = require('@/assets/img/pictureActive.png')
    },
    // 图片移出更换图片路径
    pictureout () {
      this.pictureImg = require('@/assets/img/picture.png')
    },
    // 输入框的发送事件
    handleSend (event) {
      event.preventDefault()
      // 输入框内容为空时
      if (this.textareaValue.trim() === '') {
        return
      }
      // 输入框不为空时
      this.dialogueFlag = '对话'
      this.messages.push({ text: this.textareaValue, isSelf: true })
      // 发送后清空输入框
      this.textareaValue = ''
    },
    // 历史记录抽屉展开收起点击事件
    menu_folding () {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        setTimeout(() => {
          this.conversationFlag = true
        }, 400)
      } else {
        this.conversationFlag = false
      }
    },
    // 记录编辑按钮
    rechristenFn (val) {
      this.rechristenDialog = true
      this.rechristenForm.value =
        '请作为一名小学老师，制定一个课堂表现积分规则，规则中至少包含积分获得方式及积分兑换奖励等部分，奖励设置应当按积分多少分配奖励大小'
    },
    // 历史记录删除
    delete_session () {
      this.$confirm({
        title: '删除',
        okText: '确定',
        cancelText: '取消',
        icon: 'info-circle',
        content: (h) => <div>删除后将不会出现在历史纪录中，确定要删除吗?</div>,
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    // 清除所有对话记录按钮
    clear_record () {
      this.$confirm({
        title: '清除',
        okText: '确定',
        cancelText: '取消',
        icon: 'info-circle',
        content: (h) => <div>确定要清除所有对话吗?</div>,
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    },
    // 对话内容编辑
    session_contentedit (val) {
      this.textareaValue = val
    },
    // 对话内容复制
    session_contentCopy (val) {
      const input = document.createElement('input')
      input.value = val
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)
      this.$message.success('复制成功')
    },
    // 对话内容删除
    session_deletion () {
      this.$confirm({
        title: '删除',
        okText: '确定',
        cancelText: '取消',
        icon: 'info-circle',
        content: (h) => <div>删除后将不会出现在历史记录中，确定删除吗?</div>,
        onOk () {
          console.log('OK')
        },
        onCancel () {
          console.log('Cancel')
        },
        class: 'test'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.upload_pictures {
  width: 56px;
  height: 24px;
  border-radius: 32px;
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
  line-height: 24px;
  cursor: pointer;
  margin-right: 16px;
}

.upload_pictures:hover {
  background: #f5f7ff;
  color: #6b70fb;
}

.sendbtn {
  width: 46px;
  height: 30px;
  background: linear-gradient(to bottom, #ebf2ff, #ededff);
  text-align: center;
  line-height: 28px;
  border-radius: 28px;
  position: absolute;
  right: 16px;
  bottom: 16px;
}

.self {
  text-align: right;
}

.custom-icon {
  margin-right: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}

.custom-icon:hover {
  color: #6b70fb;
}

.session_log {
  width: 220px;
  height: 100%;
  background: linear-gradient(to bottom, #ebf2ff, #ededff);
  border-left: 1px solid #d6e4ff;
  position: relative;
  transition: width 0.8s;
  -moz-transition: width 0.8s; /* Firefox 4 */
  -webkit-transition: width 0.8s; /* Safari and Chrome */
  -o-transition: width 0.8s; /* Opera */
  transition: all 0.6s;
  box-sizing: border-box;
  padding: 24px 24px 24px 16px;
  box-sizing: border-box;
}

.collapsession_log {
  width: 0px;
  height: 100%;
  background: linear-gradient(to bottom, #ebf2ff, #ededff);
  border-left: 1px solid #d6e4ff;
  position: relative;
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

.new_conversation {
  width: 100%;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  background: rgba(107, 112, 251, 0.1);
  font-size: 14px;
  color: #6b70fb;
  cursor: pointer;
  padding: 0 40px;
}

.search_history {
  width: 100%;
  height: 36px;
  background: #f1f5ff;
  margin: 8px 0 14px 0;
  padding: 2px 0 0 0;
  box-sizing: border-box;
}

/* 修改输入框的样式 */
::v-deep .custom-input-search .ant-input {
  background: #f1f5ff;
  border: none;
}

/* 修改后缀图标的样式 */
::v-deep .custom-input-search .ant-input-search-icon {
  color: #a8abff;
}

/* 修改输入框聚焦时的样式 */
::v-deep .custom-input-search .ant-input:focus {
  border: none;
  box-shadow: none;
}

/* 更换placeholder的字体颜色 */
::v-deep .custom-input-search ::placeholder {
  color: #a8abff;
}

.dialogDiv {
  width: 190px;
  height: calc(100%-800px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: -8px;
}

.dialog_content {
  background: none;
  width: 190px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  cursor: pointer;
  margin-left: 8px;
  position: relative;
}

.dialog_content:hover {
  background: #fff;
  margin-left: 0px;
  border-radius: 18px;
  z-index: 10;
  padding: 0 8px;
  box-sizing: border-box;
  position: relative;
  .record_edit {
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.record_edit {
  width: 70px;
  height: 100%;
  padding: 8px 0px 8px 8px;
  box-sizing: border-box;
  background: #fff;
  position: absolute;
  border-radius: 0 18px 18px 0;
  top: 0;
  right: 8px;
  display: none;
}
.record_icon {
  flex: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
