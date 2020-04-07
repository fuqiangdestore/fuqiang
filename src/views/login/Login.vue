<template>
  <div id="login">
    <div class="loginBox"
         @click="changeImage(3)">
      <div class="auth-form">
        <div class="panfish">
          <img :src="imageURL"
               alt="">
        </div>
        <!-- 关闭按钮 -->
        <van-icon name="close"
                  class="closeButton"
                  @click="close" />
        <van-tabs v-model="active"
                  animated>
          <van-tab :title="$t('login.title')">
            <!-- 账号密码登录 -->
            <van-cell-group v-show="!isShowSMSLogin">
              <van-field v-model="login_userName"
                         required
                         clearable
                         :label="$t('login.phoneNumber')"
                         maxlength="11"
                         @click.stop="
                         changeImage(0)"
                         :error-message="phoneNumberRight?'':$t('login.phoneNumberNotCorrect')"
                         :placeholder="$t('login.phoneInput')" />
              <van-field v-model="login_password"
                         type="password"
                         :label="$t('login.pass')"
                         :placeholder="$t('login.passTip')"
                         required
                         @click.stop="changeImage(1)"
                         autocomplete />
              <van-field v-model="imgCaptcha"
                         center
                         clearable
                         maxlength="4"
                         :placeholder="$t('login.varify')">
                <img class="verificationImage"
                     src="http://demo.itlike.com/web/xlmc/api/captcha"
                     alt="captcha"
                     @click.prevent="getCaptcha"
                     ref="imgCaptcha"
                     slot="button">
              </van-field>
              <!-- 手机号快捷登录 -->
            </van-cell-group>
            <van-cell-group v-show="isShowSMSLogin">
              <van-field v-model="login_phone"
                         required
                         clearable
                         maxlength="11"
                         :label="$t('login.phoneNumber')"
                         :placeholder="$t('login.phoneInput')"
                         :error-message="phoneNumberRight?'':$('login.phoneNumberNotCorrect')" />
              <van-field center
                         clearable
                         required
                         :label="$t('login.varify')"
                         maxlength="6"
                         v-model="smsCaptcha"
                         :placeholder="$t('login.varify')">
                <van-button slot="button"
                            size="small"
                            type="primary"
                            v-if="!countDown"
                            :disabled="captchaDisable"
                            @click="sendVerifyCode">{{$t('login.sendVerify')}}</van-button>
                <van-button slot="button"
                            size="small"
                            type="primary"
                            disabled=""
                            v-model="smsCaptcha"
                            v-else>{{$t('login.hasSend')}}{{countDown}}s</van-button>
              </van-field>
            </van-cell-group>
            <van-button type="info"
                        size="large"
                        style="margin-top:1rem"
                        @click='login'>{{$t('login.login')}}</van-button>
            <div class="switchLogin"
                 @click="switchLogin">{{this.isShowSMSLogin?$t('login.phoneVerify'):$t('login.smsMessage')}}</div>
          </van-tab>
          <!-- 注册 -->
          <van-tab :title="$t('login.resgin')">
            <van-cell-group>
              <van-field v-model="register_userName"
                         clearable
                         maxlength="11"
                         :label="$t('login.phoneNumber')"
                         :placeholder="$t('login.phoneInput')"
                         required />
              <van-field v-model="register_pwd"
                         type="password"
                         :label="$t('login.pass')"
                         :placeholder="$t('login.passTip2')"
                         required />
            </van-cell-group>
            <van-button type="info"
                        size="large"
                        style="margin-top:1rem"
                        @click='register'>{{$t('login.resgin')}}</van-button>
          </van-tab>
        </van-tabs>

        <!-- 第三方登录 -->
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 5px' }">
          {{$t('login.otherMethods')}}
        </van-divider>
        <van-grid :column-num="2"
                  :border=false>
          <van-grid-item @click="thirdLogin(0)">
            <svg-icon iconClass="wechat" />
            <div class="title">{{$t('login.wechat')}}</div>
          </van-grid-item>
          <van-grid-item @click="thirdLogin(1)">
            <svg-icon iconClass="QQ" />
            <div class="title">{{$t('login.qqchant')}}</div>
          </van-grid-item>
        </van-grid>
        <!-- 底部声明 -->
        <p class="agreement"> {{$t('login.tipTile')}}<br>{{$t('login.tipContent')}}<a @click.stop="agreement(0)"
             class="agreement-box">{{$t('login.tip')}}</a>、<a @click.stop=agreement(1)
             class="agreement-box">{{$t('login.tipProcy')}}</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
