<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo">信息表</div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              用户信息表
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              租房信息表
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>
              问题处理表
            </MenuItem>
          </div>
        </Menu>
        <Button type="primary" size="big" class="add" @click = "addProperty=true">添加</Button>
        <Modal v-model="addProperty" draggable scrollable title="用户添加" @on-ok="saveProperty('formValidate')" @on-cancel="cancelProperty('formValidate')">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width: 400px;">
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
          </Form>
        </Modal>
      </Header>
      <Content :style="{padding: '0 173px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Table border :columns="columns" :data="tableData" >
          <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
            <Button type="error" size="small" @click="remove(index)">删除</Button>
          </template>
        </Table>
      </Content>
      <Footer class="layout-footer-center"> &copy; 作者：不若为止</Footer>
    </Layout>
  </div>
</template>

<script>

    export default {
      name:"table-main",
      data() {
        return {
          columns: [
            {
              title: '姓名',
              key: 'username',
              width: 210 ,
              align: 'center'
            },
            {
              title: '手机号码',
              key: 'phone',
              width: 210 ,
              align: 'center'
            },
            {
              title: '身份',
              key: 'userType',
              width: 170 ,
              align: 'center'
            },
            {
              title: '性别',
              key: 'gender',
              width: 100 ,
              align: 'center'
            },
            {
              title: '地址',
              key: 'address',
              width: 280 ,
              align: 'center'
            },
            {
              title: '注册时间',
              key: 'createTime',
              width: 280 ,
              align: 'center'
            },
            {
              title: '操作',
              slot: 'action',
              width: 320,
              align: 'center'
            }
          ],
          tableData: [],
          formData: {
            username: '',
            phone: '',
            gender: '',
            userType: '',
            startCreateTime: '',
            endCreateTime: '',
            address:''
          },
          addProperty: false,
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
          },
          genderList: [
            {
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '男'
            },
            {
              value: '2',
              label: '女'
            }
          ],
          userTypeList: [
            {
              value: '0',
              label: '全部'
            },
            {
              value: '1',
              label: '业主'
            },
            {
              value: '2',
              label: '员工'
            },
            {
              value: '3',
              label: '管理员'
            },
            {
              value: '4',
              label: '租户'
            }
          ],
        }
      },
      created() {
          this.$axios.post('/property/propertyList').then( res => {
            this.tableData = res.data.data,
              console.log(res.data.data)
          }).catch(function (error) {
            console.log(error);
          });
      },
      methods: {
        //查看用户详情
        show(index) {
          var userId = this.tableData[index].userId
          console.log(userId)
        },
        //删除用户
        remove(index) {
          this.$Modal.confirm({
            title: '提示信息',
            content: '是否删除',
            onOk: () => {
              this.$axios({
                url: 'http://localhost:8090/property/deleteProperty',//请求的地址
                method: 'post',//请求的方式
                data: this.tableData[index].userId
              }).then(res => {
                if(res.data.code === 0){
                  window.location.reload()
                }
              }).catch(err => {
                console.log(err.message)
              })
            }
          });
        },
        //取消添加用户
        cancelProperty(name) {
          this.$refs[name].resetFields();
        },
        //添加用户
        saveProperty(name) {
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.$axios({
                url:'http://localhost:8090/property/saveProperty',
                method: 'post',
                data: this.formValidate
              }).then(res => {
                console.log('后台返回的数据:',res.data.data);
                if(res.data.code === 0){
                  window.location.reload()
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
        //筛选条件重置
        cancelSelect(name){
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
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    font-weight: bold;
    text-align: center;
    color: #49ffcc;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center{
    text-align: center;
  }
  .add {
    position: fixed;
    left: 175px;
    top: 145px;
  }
</style>
