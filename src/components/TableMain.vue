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
        <Button type="primary" size="big" class="add" @click = "add()">添加</Button>
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
          tableData: []
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
        //添加用户
        add() {
          this.$router.replace("/addProperty")
        },
        //查看用户详情
        show(index) {
          var userId = this.tableData[index].userId
          console.log(userId)
        },
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
    top: 150px;
  }
</style>
