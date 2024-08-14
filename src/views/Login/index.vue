<template>
  <div>
    <!-- 登录弹窗 -->
    <div class="login_content">
      <!-- 左上角叉号 -->
      <a-icon type="close" class="dialogicon" @click="closeDialog" />
      <div v-if="showFlag === '登录'">
        <div class="login_title">
          <img
            src="@/assets/img/celebrate.png"
            alt=""
            style="width: 20px; height: 20px"
          />
          欢迎登录
        </div>
        <a-tabs default-active-key="password" class="custom-tabs">
          <a-tab-pane key="password" tab="密码登录">
            <a-form-model
              ref="passwordForm"
              :model="passwordForm"
              style="margin-top: 10px"
              :rules="passwordRulse"
            >
              <a-form-model-item prop="mobile" ref="mobile">
                <a-input
                  addon-before="+86"
                  size="large"
                  v-model="passwordForm.mobile"
                  placeholder="请输入手机号码"
                />
              </a-form-model-item>

              <a-form-model-item prop="password" ref="password">
                <a-input-password
                  size="large"
                  v-model="passwordForm.password"
                  placeholder="请输入密码"
                />
              </a-form-model-item>
            </a-form-model>
            <div
              style="margin-top: -6px; text-align: center; position: relative"
            >
              <p
                style="
                  color: #6b70fb;
                  cursor: pointer;
                  position: absolute;
                  right: 0;
                  top: -34px;
                "
                @click="showFlag = '忘记密码'"
              >
                忘记密码
              </p>
              <div class="loginbtn" @click="passwordSubmit">登录</div>
              <p style="font-size: 14px; font-weight: 400; color: #242424">
                没有账号？
                <span
                  style="color: #6b70fb; cursor: pointer"
                  @click="showFlag = '注册'"
                >
                  立即注册
                </span>
              </p>
            </div>
          </a-tab-pane>
          <a-tab-pane key="note" tab="短信登录" force-render>
            <a-form-model
              ref="noteloginForm"
              :model="noteloginForm"
              :rules="noteloginRulse"
              style="margin-top: 10px"
            >
              <a-form-model-item prop="mobile" ref="mobile">
                <a-input
                  addon-before="+86"
                  size="large"
                  v-model="noteloginForm.mobile"
                  placeholder="请输入手机号码"
                />
              </a-form-model-item>
              <a-form-model-item prop="sms_code" ref="sms_code">
                <a-input
                  size="large"
                  v-model="noteloginForm.sms_code"
                  placeholder="请输入验证码"
                >
                  <a-button
                    style="
                      padding-right: 10px;
                      color: #6b70fb;
                      border: none;
                      background-color: #fff;
                    "
                    :disabled="noteyzmBtnDisable"
                    slot="suffix"
                    type="text"
                    >{{ codeBtnyzm }}</a-button
                  >
                </a-input>
              </a-form-model-item>
            </a-form-model>
            <div style="margin-top: -26px; text-align: center">
              <div class="loginbtn" @click="noteSubmit">登录</div>
              <p style="font-size: 14px; font-weight: 400; color: #242424">
                没有账号？
                <span
                  style="color: #6b70fb; cursor: pointer"
                  @click="showFlag = '注册'"
                >
                  立即注册
                </span>
              </p>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <div v-if="showFlag === '注册'">
        <div class="login_title">
          <img
            src="@/assets/img/celebrate.png"
            alt=""
            style="width: 20px; height: 20px"
          />
          欢迎注册
        </div>
        <a-form-model
          ref="registerForm"
          :model="registerForm"
          :rules="registerRulse"
          style="margin-top: 10px"
        >
          <a-form-model-item prop="name" ref="name">
            <a-input
              size="large"
              v-model="registerForm.name"
              placeholder="请输入用户名"
            />
          </a-form-model-item>
          <a-form-model-item prop="mobile" ref="mobile">
            <a-input
              addon-before="+86"
              size="large"
              v-model="registerForm.mobile"
              placeholder="请输入手机号码"
            />
          </a-form-model-item>
          <a-form-model-item prop="sms_code" ref="sms_code">
            <a-input
              size="large"
              v-model="registerForm.sms_code"
              placeholder="请输入验证码"
            >
              <a-button
                style="
                  padding-right: 10px;
                  color: #6b70fb;
                  border: none;
                  background-color: #fff;
                "
                :disabled="notezcBtnDisable"
                slot="suffix"
                type="text"
                >{{ codeBtnzc }}</a-button
              >
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="password" ref="password">
            <a-input-password
              size="large"
              v-model="registerForm.password"
              placeholder="请输入密码"
            />
          </a-form-model-item>
        </a-form-model>
        <div style="margin-top: -26px; text-align: center">
          <div class="loginbtn" @click="registerSubmit">注册</div>
          <p style="font-size: 14px; font-weight: 400; color: #242424">
            已有账号。
            <span
              style="color: #6b70fb; cursor: pointer"
              @click="showFlag = '登录'"
            >
              立即登录
            </span>
          </p>
        </div>
      </div>
      <div v-if="showFlag === '忘记密码'">
        <div class="login_title">
          <img
            src="@/assets/img/celebrate.png"
            alt=""
            style="width: 20px; height: 20px"
          />
          重置密码
        </div>
        <a-form-model
          ref="resetPasswordForm"
          :model="resetPasswordForm"
          :rules="resetPasswordFormRulse"
          style="margin-top: 20px"
        >
          <a-form-model-item prop="mobile" ref="mobile">
            <a-input
              size="large"
              v-model="resetPasswordForm.mobile"
              placeholder="请输入手机号码"
            />
          </a-form-model-item>
          <a-form-model-item prop="sms_code" ref="sms_code">
            <a-input
              size="large"
              v-model="resetPasswordForm.sms_code"
              placeholder="请输入验证码"
            >
              <a-button
                style="
                  padding-right: 10px;
                  color: #6B70FB;
                  border: none;
                  background-color: #fff;
                "
                :disabled="noteczmmBtnDisable"
                slot="suffix"
                type="text"
                >{{ codeBtnczmm }}</a-button
              >
            </a-input>
          </a-form-model-item>
          <a-form-model-item prop="new_password" ref="new_password">
            <a-input-password
              size="large"
              v-model="resetPasswordForm.new_password"
              placeholder="请输入新密码"
              autocomplete="new-password"
            />
          </a-form-model-item>
          <a-form-model-item prop="new_password2" ref="new_password2">
            <a-input-password
              size="large"
              v-model="resetPasswordForm.new_password2"
              placeholder="请确认新密码"
            />
          </a-form-model-item>
        </a-form-model>
        <div style="margin-top: -26px; text-align: center">
          <div class="loginbtn" @click="resetPasswordSubmit">确认</div>
          <p style="font-size: 14px; font-weight: 400; color: #242424;color: #6b70fb; cursor: pointer" @click="showFlag = '登录'">
            返回登录
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    // 手机号校验
    const validateNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        // 获取工具类中的手机号正则表达式
        const phoneReg =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (phoneReg.test(value)) {
          callback()
        } else {
          return callback(new Error('手机号格式不正确'))
        }
      }
    }
    // 重置密码二次输入密码校验
    const validatePassword = (rule, value, callback) => {
      if (value !== this.resetPasswordForm.new_password) {
        callback(new Error('两次密码不一致'))
      } else {
        callback()
      }
    }
    return {
      showFlag: '登录',
      // 密码登录
      passwordForm: {
        mobile: '',
        password: ''
      },
      // 密码登录校验
      passwordRulse: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validateNumber }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        ]
      },
      codeBtnyzm: '获取验证码', // 获取验证码登录手机号短信按钮文字
      noteyzmBtnDisable: true, // 获取验证码登录手机号按钮禁用
      // 验证码登录
      noteloginForm: {
        name: '',
        mobile: '',
        sms_code: '',
        password: ''
      },
      // 验证码登录校验
      noteloginRulse: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validateNumber }
        ],
        sms_code: [
          {
            min: 6,
            max: 6,
            required: true,
            message: '验证码不符合要求',
            trigger: 'change'
          }
        ]
      },
      codeBtnzc: '获取验证码', // 获取注册手机号短信按钮文字
      notezcBtnDisable: true, // 获取注册手机号按钮禁用
      // 注册表单绑定值
      registerForm: {
        name: '',
        mobile: '',
        sms_code: '',
        password: ''
      },
      // 注册校验
      registerRulse: {
        name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validateNumber }
        ],
        sms_code: [
          {
            min: 6,
            max: 6,
            required: true,
            message: '验证码不符合要求',
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        ]
      },
      // 重置密码绑定值
      resetPasswordForm: {
        mobile: '',
        sms_code: '',
        new_password: '',
        new_password2: ''
      },
      codeBtnczmm: '获取验证码', // 获取重置密码手机号短信按钮文字
      noteczmmBtnDisable: true, // 获取重置密码手机号按钮禁用
      // 重置密码校验
      resetPasswordFormRulse: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { validator: validateNumber }
        ],
        sms_code: [
          {
            min: 6,
            max: 6,
            required: true,
            message: '验证码不符合要求',
            trigger: 'change'
          }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'change' }
        ],
        new_password2: [
          { required: true, message: '请确认密码', trigger: 'change' },
          { validator: validatePassword }
        ]
      }
    }
  },
  methods: {
    // 关闭弹窗按钮
    closeDialog () {
      if (this.showFlag === '登录') {
        this.$refs.passwordForm.resetFields()
      } else if (this.showFlag === '注册') {
        this.$refs.registerForm.resetFields()
      } else {
        this.$refs.resetPasswordForm.resetFields()
      }
      this.$emit('close', false)
    },
    // 账号密码登录点击事件
    passwordSubmit () {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {
          console.log(this.passwordForm)
        }
      })
    },
    // 手机号验证码登录点击事件
    noteSubmit () {
      this.$refs.noteloginForm.validate(async (valid) => {
        if (valid) {
          console.log(this.noteloginForm)
        }
      })
    },
    // 注册按钮点击事件
    registerSubmit () {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log(this.registerForm)
        }
      })
    },
    // 重置密码确认按钮点击事件
    resetPasswordSubmit () {
      this.$refs.resetPasswordForm.validate(async (valid) => {
        if (valid) {
          console.log(this.resetPasswordForm)
        }
      })
    }
  }
}
</script>

<style></style>
