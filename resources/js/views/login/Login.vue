<template>
    <div class="login" clearfix>
        <div class="login-wrap">
            <row type="flex" justify="center">
                <Form  ref="loginForm" :model="user" :rules="rules"  label-position="left" :label-width="80">
                    <h3>登录</h3>
                    <hr>
                    <FormItem  prop="name" label="用户名">
                        <Input  v-model="user.name" placeholder="请输入用户名" prefix-icon></Input >
                    </FormItem >
                    <FormItem  id="password" prop="password" label="密码">
                        <Input type="password" v-model="user.password" placeholder="请输入密码">
                        </Input>
                    </FormItem >
                    <FormItem class="el-button">
                        <Button  type="primary" @click="doLogin()">登 录</Button >
                    </FormItem >
                </Form>
            </row>
        </div>
    </div>

</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                user: {
                    name: "",
                    password: ""
                },
                rules:{
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        // { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
                    ]
                }
            };
        },
        methods: {
            doLogin() {
                if (!this.user.name) {
                    this.$message.error("请输入用户名！");
                    return;
                } else if (!this.user.password) {
                    this.$message.error("请输入密码！");
                    return;
                } else {
                    //校验用户名和密码是否正确;
                    this.$api.userLogin(this.user).then(res => {
                        if(res.status && res.status == 200){
                            sessionStorage.setItem('token',res.data.access_token)
                            this.$store.dispatch('AcInit');
                            this.$router.push({
                                path: "index",
                            });
                        }
                    })
                }
            }
        },
        mounted() {

        }
    };
</script>

<style lang="scss" scoped>
    .login {
        width: 100%;
        height: calc(100vh);
        background: url("../../../assets/images/login_bg.jpg") no-repeat;
        background-size: cover;
        overflow: hidden;
    }
    .login-wrap {
        /*background: url("../assets/images/login_bg.jpg") no-repeat;*/
        background-color: rgba(255,255,255,0.6);
        width: 400px;
        height: 260px;
        margin: 215px auto;
        overflow: hidden;
        padding-top: 10px;
        line-height: 30px;
    }
    #password {
        margin-bottom: 5px;
    }
    h3 {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin: 20px auto;
    }
    a {
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
    }
    a:hover {
        color: coral;
    }
    .el-button {
        margin-top: 20px;
        width: 50%;
        float: right;
    }
</style>
