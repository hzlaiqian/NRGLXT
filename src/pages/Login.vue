<template>
    <div class='login-wrap'>
        <div class='login-box relative'>
            <div class='form-box absolute'>
                <div class='logo'>
                    <img src='../assets/img/logo@2x.png' alt='logo'>
                </div>
                <div class='tab flex space-between'>
                    <div @click='tabIndex = 0 ' class='text pointer'>账号登录</div>
                    <div @click='tabIndex = 1 ' class='text pointer'>短信登录</div>
                </div>
                <div :class='tabIndex === 0 ? "sliding-box-index" : "sliding-box-active"' class='sliding-box'></div>
                <div class='form'>
                    <el-form :model='param' :rules='rules' ref='login_form' label-width='0px' class='ms-content'>
                        <el-form-item prop='username'>
                            <el-input type='text' placeholder='请输入用户名' v-model='param.username'>
                                <i slot='suffix' class='el-icon-arrow-down'></i>
                                <img style='width: 15px;height: 16px' slot='prefix' src='../assets/img/user@2x.png' />
                            </el-input>
                            <!--                            <el-autocomplete-->
                            <!--                                style='width: 100%'-->
                            <!--                                class="inline-input"-->
                            <!--                                v-model="param.username"-->
                            <!--                                :fetch-suggestions="querySearch"-->
                            <!--                                placeholder='请输入用户名'-->
                            <!--                                :trigger-on-focus="false"-->
                            <!--                                @select="handleSelect"-->
                            <!--                            >-->
                            <!--                                <i slot="suffix" class='el-icon-arrow-down'></i>-->
                            <!--                                <img style='width: 15px;height: 16px' slot="prefix" src='../assets/img/user@2x.png' />-->
                            <!--                            </el-autocomplete>-->
                        </el-form-item>
                        <el-form-item prop='password' style='margin-top: 20px'>
                            <el-input type='password' placeholder='请输入密码' v-model='param.password'>
                                <img style='width: 14px;height: 18px' slot='prefix'
                                     src='../assets/img/password@2x.png' />
                            </el-input>
                        </el-form-item>

                    </el-form>
                </div>
                <div class='flex space-between'>
                    <div class='checkbox-box'>
                        <transition name='el-zoom-in-center'>
                            <div class='pointer checkbox' @click='isRememberPassword = !isRememberPassword'>
                                <img v-if='isRememberPassword' style='width: 20px;height: 20px'
                                     src='../assets/img/check2@2x.png' />
                                <img v-else style='width: 20px;height: 20px' src='../assets/img/check1@2x.png' />
                                <span style='margin-left: 8px'>记住密码</span>
                            </div>
                        </transition>
                    </div>
                    <div class='checkbox-box'>
                        <transition name='el-zoom-in-center'>
                            <div class='pointer checkbox' @click='autoLogin = !autoLogin'>
                                <img v-if='autoLogin' style='width: 20px;height: 20px'
                                     src='../assets/img/check2@2x.png' />
                                <img v-else style='width: 20px;height: 20px' src='../assets/img/check1@2x.png' />
                                <span style='margin-left: 8px'>自动登录</span>
                            </div>
                        </transition>
                    </div>
                </div>
                <div class='login-btn'>
                    <el-button type='primary' @click='submitForm()'>登录</el-button>
                </div>

            </div>
            <div class='flex row-center forget absolute'>
                <div style='width: 158px' class='flex space-between'>
                    <div class='pointer'>忘记密码</div>
                    <div>|</div>
                    <div class='pointer'>申请试用</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    login
} from '../api/getData.js';

export default {
    data: function() {
        return {
            param: {
                username: '',
                password: ''
            },
            tabIndex: 0,
            isRememberPassword: false,
            autoLogin: false,
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }]
            }
        };
    },
    methods: {
        handleSelect() {
        },
        querySearch() {
        },
        submitForm() {
            this.$refs.login_form.validate(async (valid) => {
                if (valid) {
                    const res = await login(this.param);
                    if (res != null && res.code == 200) {
                        this.$message.success('登录成功');
                        localStorage.setItem('user_name', this.param.username);
                        // localStorage.setItem('user_token', res.data);
                        this.$router.push('/home');
                    } else {
                        this.$message.error(res.msg);
                        this.param = {};
                    }
                }
            });
        }
    }
};
</script>

<style scoped lang='scss'>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .login-box {
        width: 100%;
        height: 100%;
        background: url("../assets/img/login_bj@2x.png") no-repeat;
        background-size: 100% 100%;

        .form-box {
            width: 33%;
            top: 19%;
            right: 30px;

            .logo {
                width: 177px;
                height: 40px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .tab {
                width: 176px;
                margin-top: 40px;

                .text {
                    font-size: 18px;
                    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
                    font-weight: 400;
                    color: #E4E4E4;
                    line-height: 24px;
                }
            }

            .sliding-box {
                margin-top: 10px;
                width: 60px;
                height: 3px;
                background: linear-gradient(135deg, #24C3FF 0%, #1657FF 100%);
                border-radius: 1px;
                transition-duration: 0.5s;
            }

            .sliding-box-active {
                transform: translate3d(110px, 0, 0);
            }

            .sliding-box-index {
                transform: translate3d(0, 0, 0);
            }

            .form {
                margin-top: 21px;
            }

            .checkbox-box {
                display: flex;
                align-items: center;
                height: 30px;
                margin-top: 41px;

                .checkbox {
                    font-size: 16px;
                    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
                    font-weight: 400;
                    color: #E4E4E4;
                    line-height: 22px;
                    display: flex;
                    align-items: center;
                }
            }

            .login-btn {
                margin-top: 24px;
            }

        }
        .forget {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC,sans-serif;
            font-weight: 400;
            color: #E4E4E4;
            line-height: 22px;
            bottom: 3.7%;
            right: 30px;
            width: 33%;
        }
    }

}
</style>
<style>
.login-wrap .el-input__inner {
    background: #21116F;
    border-radius: 4px;
    border: none;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 22px;
    height: 42px;
    align-items: center;
    padding-left: 42px;
    box-sizing: border-box;
}

.login-wrap .el-input__prefix {
    display: flex;
    align-items: center;
    margin-left: 12px;
}

.login-wrap .el-input__suffix {
    display: flex;
    align-items: center;
    margin-left: 12px;
}

.login-wrap .el-button--primary {
    width: 100%;
    height: 44px;
    background: linear-gradient(135deg, #24C3FF 0%, #1657FF 100%);
    border-radius: 6px;

    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 26px;
    letter-spacing: 4px;
}
</style>
