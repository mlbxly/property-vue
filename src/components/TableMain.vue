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
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <div style="min-height: 200px;">
            <v-table
              is-horizontal-resize
              style="width:100%"
              :columns="columns"
              :table-data="tableData"
              row-hover-color="#eee"
              row-click-color="#edf7ff"
            ></v-table>
          </div>
        </Card>
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
          tableData: [ ],
          columns: [
            {field: 'username', title: '用户名', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'gender', title: '性别', width: 50, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'userType', title: '身份', width: 50, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'phone', title: '手机号码', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'createTime', title: '注册时间', width: 150, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'address', title: '家庭住址', width: 280, titleAlign: 'center', columnAlign: 'center',isResize:true},
            {field: 'operation', title: '操作', width: 50, titleAlign: 'center', columnAlign: 'center',isResize:true}
          ]
        }
      },
      created() {
          this.$axios.post('/property/propertyList').then( res => {
            this.tableData = res.data.data,
              console.log(res.data.data)
          }).catch(function (error) {
            console.log(error);
          });
      }
    }
</script>

<style>
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
</style>
