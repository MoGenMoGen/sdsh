<template>
  <div id="webMap" :style="{width:bWidth+'px'}">
      <div class="main" :style="{width:width+'px'}">
          <h4>留言板</h4>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" >
              <el-form-item label="联系人" prop="disUser">
                  <el-input v-model="ruleForm.disUser"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="phone">
                  <el-input v-model="ruleForm.phone" ></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
              </el-form-item>
              <el-form-item label="留言内容" prop="content">
                  <el-input type="textarea" v-model="ruleForm.content"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script>
    export default {
       props:['bWidth','width'],
        data() {
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入联系电话'));
                }
                setTimeout(() => {

                    if(this.reg.checkPhone(value)!='ok'){
                        callback(new Error('请输入正确的电话号码'));
                    }else {
                        callback();
                    }
                }, 1000);
            };
            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入电子邮箱'));
                }
                setTimeout(() => {
                    if(this.reg.checkMail(value)!='ok'){
                        callback(new Error('请输入正确的电子邮箱'));
                    }else {
                        callback();
                    }
                }, 1000);
            };
            return {
                ruleForm: {
                    content: '',
                    disUser: '',
                    phone: '',
                    email: '',
                },
                rules: {
                    disUser: [
                        { required: true, message: '请输入联系人', trigger: 'blur' },
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true,validator: checkPhone, trigger: 'blur' }
                    ],
                    email: [
                        { required: true,validator: checkEmail, trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '请填写留言内容', trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {

        },

        components: {
        },
        watch: {

        },
        methods: {
            submitForm(formName) {
                // console.log(this.ruleForm)
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        let param = {
                            content: this.ruleForm.content,
                            disUser: this.ruleForm.disUser,
                            phone: this.ruleForm.phone,
                            email: this.ruleForm.email,
                            siteId: 1
                        }
                        this.api.feedback(param).then(res=>{
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>
<style lang="less">
    .demo-ruleForm{
        .el-form-item{
            width: 80%;
            .el-input,.el-textarea{
                width: 400px;
            }
            .el-textarea{
                height: 80px;
                textarea{
                    height: 80px;
                }
            }
            .el-button{
                width: 150px;
            }
            .el-button--primary{
                border-color: #0a6fb7;
                background: #0a6fb7;
            }
        }
    }

</style>
<style lang="less" scoped>
  @base: 18rem;
  @import url("../assets/css/init.less");
    #webMap{
        background: #ffffff;
        .main{
            margin: 0 auto;
            padding: 20px 0;
            h4{
                padding: 40px  0 40px 40px;
                font-size: 25px;
            }
            .demo-ruleForm{
                padding: 20px;
                box-sizing: border-box;
                width: 100%;
                border: 1px solid #cccccc;
            }
        }
    }
</style>
