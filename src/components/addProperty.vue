<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 400px;margin-left: 700px;">
    <FormItem label="姓名" prop="username">
      <Input v-model="formValidate.username" placeholder="请输入姓名"></Input>
    </FormItem>
    <FormItem label="联系方式" prop="phone">
      <Input v-model="formValidate.phone" placeholder="请输入联系方式"></Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input v-model="formValidate.password" placeholder="请输入密码" type="password"></Input>
    </FormItem>
    <FormItem label="身份" prop="userType">
      <Select v-model="formValidate.userType" placeholder="请选择身份">
        <Option value="1">业主</Option>
        <Option value="2">员工</Option>
        <Option value="3">管理员</Option>
        <Option value="4">租户</Option>
      </Select>
    </FormItem>
    <FormItem label="性别" prop="gender">
      <RadioGroup v-model="formValidate.gender">
        <Radio label="1">男</Radio>
        <Radio label="2">女</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem label="地址" prop="address">
      <Input v-model="formValidate.address" type="textarea"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    data () {
      return {
        formValidate: {
          username: '',
          phone: '',
          password:'',
          userType: '',
          gender: '',
          address: ''
        },
        ruleValidate: {
          username: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '电话号码不能为空', trigger: 'blur' },
          ],
          password: [
            {required: true, message: '密码设置不能为空', trigger: 'blur'}
          ],
          userType: [
            { required: true, message: '请选择身份类型', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入家庭地址', trigger: 'blur' },
            { type: 'string', max: 30, message: '地址最多可以输入30个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$axios({
              url:'http://localhost:8090/property/saveProperty',
              method: 'post',
              data: this.formValidate
            }).then(res => {
              console.log('后台返回的数据:',res.data.data);
              if(res.data.code === 0){
                this.$router.replace('/table')
              }
            }).catch(err=>{
              console.info('报错的信息', err.response.message);
              this.$Message.error('添加失败!');
            });
          } else {
            this.$Message.error('添加失败!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    background: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
  }
</style>
