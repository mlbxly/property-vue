<style>
  html,body {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
  }
  .login {
    width: 100%;
    height: 100%;
    background-color: #1c2438;
    position: relative;
  }
  .login .from-wrap{
    position: fixed;
    left: 50%;
    margin-left: -200px;
    top: 50%;
    margin-top: -150px;
    width: 400px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    padding: 20px 30px;
  }
  .login h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .login FormItem {
    margin-bottom: 15px;
  }
  .login .form-footer {
    text-align: right;
  }
</style>
<template>
  <div class="login">
    <div class="from-wrap">
      <h2>登录</h2>
      <Form ref="loginData" :model="loginData" :rules="ruleValidate" :label-width="80">
        <FormItem label="账号/手机号码" prop="phone">
          <Input type="text" v-model="loginData.phone" placeholder="请输入账号/手机号码"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="loginData.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="primary" @click="handleSubmit('loginData')">提交</Button>
          <Button type="primary" @click="handleReset('loginData')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loginData: {
          phone:'',
          password:''
        },
        ruleValidate: {
          phone: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '账号长度3-16个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!')
          } else {
            this.$Message.error('表单验证失败!')
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
    name: 'Login'
  }
</script>
