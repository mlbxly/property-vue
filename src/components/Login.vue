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
    width: 500px;
    height: 300px;
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
    text-align: left;
  }
  .form-footer button {
    width: 120px;
    height: 40px;
    border-radius: 20px;
  }
</style>
<template>
  <div class="login">
    <div class="from-wrap">
      <h2>用户登录</h2>
      <Form ref="loginUser" :model="loginUser" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="loginUser.username" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="loginUser.password" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="身份" prop="identity">
          <RadioGroup v-model="identity">
            <Radio label="业主" border></Radio>
            <Radio label="员工" border></Radio>
            <Radio label="商户" border></Radio>
            <Radio label="租客" border></Radio>
            <Radio label="物业管理员" border></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem class="form-footer">
          <Button type="primary" @click="handleSubmit('loginUser')" style="margin-left: -20px">登陆</Button>
          <Button type="primary" @click="handleReset('loginUser')" style="margin-left: 60px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loginUser: {
          username:'',
          password:'',
          identity:''
        },
        ruleValidate: {
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' },
            { min: 3, max: 15, message: '账号长度3-16个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, max: 16, message: '密码长度6-16个字符', trigger: 'blur' }
          ],
          identity: [
            {required: true, message: '请选择您的身份', trigger: 'blur'}
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
