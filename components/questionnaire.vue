<template>
  <div class="questionnaireList" @click="close">
    <i class="el-icon-close" ></i>
    <div class="main" @click.stop="" v-if="questionShow">
      <div class="questionMain" v-if="questionShow">
        <div class="question" v-for="(item,index) in list">
          <p v-if="item.type===1"> {{index+1}}、{{item.nm}} (单选)</p>
          <p v-if="item.type===2"> {{index+1}}、{{item.nm}} (多选) <span class="red" v-if="answerList[index] && answerList[index].length===1">请至少选择两项以上</span></p>
          <div v-if="item.type===1">
            <el-radio v-model="answerList[index]" :label="v.id" v-for="(v,i) in item.options" :key="i">{{v.nm}}</el-radio>
          </div>
          <div v-if="item.type===2">
            <el-checkbox-group v-model="answerList[index]">
              <el-checkbox :label="v.id" v-for="(v,i) in item.options" :key="i">{{v.nm}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="btn" v-if="questionShow">
         <p @click="submit">提交</p>
      </div>
    </div>
    <div class="result" v-if="!questionShow" @click.stop="">
        <p>投票结果</p>
        <div v-for="(item,index) in voteList" :key="index">
           <p>{{index+1}}、{{item.nm}}</p>
          <ul>
            <li v-for="(v,i) in item.options" :key="i">
              <p>{{v.nm}}({{v.votes}}票 {{v.rate}})</p>
              <el-progress :text-inside="true" :stroke-width="26" :percentage="v.rates"></el-progress>

            </li>
          </ul>
        </div>
    </div>
  </div>

</template>

<script>
    import Vue from 'vue';
    import {
        Radio,
        Checkbox,
        CheckboxGroup,
        Progress
    } from 'element-ui';
    Vue.use(Radio);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(Progress);
  export default {
    props:['width','list','showVotes'],
    data() {
      return {
          questionShow:true,
          voteList:[],
          answerList:[],
          Unselected:[],//未选择的题目，未完成的题目
      };
    },

    mounted() {

    },
      watch:{
        list:{
            deep:true,
            handler:function () {
                this.answerList = []
                this.list.forEach(item=>{

                    if(item.type===1){
                        this.answerList.push('')
                    }
                    if(item.type===2){
                        this.answerList.push([])
                    }
                })
            },
            immediate:true
        }
      },
    methods: {

        submit(){
            let index = this.answerList.findIndex(item=>{return !item || item.length<2})
            if(index>-1) {
                this.$message('请作答全部题目');
                return
            }
            let answer = []
            this.list.forEach((item,index)=>{
                let an = {
                    askId:item.id,
                    optionIds:[]
                }
                if(item.type===1){
                    an.optionIds[0]=this.answerList[index]
                }
                if(item.type===2){
                    an.optionIds=this.answerList[index]
                }
                answer.push(an)
            })
            let param = {
                newsId:this.list[0].newsId,
                voterIp:this.until.loGet('ip'),
                askOptionRos:answer
            }
            this.api.sumbitQuestionnaire(param).then(()=>{
                this.$message({
                    message: '提交成功！',
                    type: 'success'
                });
                if(this.showVotes){
                    this.getVote()
                }else {
                    this.$emit('questionnaireClose')
                }

            })
        },
        getVote(){
            this.api.voteResult(this.list[0].newsId).then(res=>{
                let currentId=''
                let currenInfo = {}
                res.forEach((item,index)=>{
                    if(!currentId){
                        currentId = item.askId
                        currenInfo = {
                            nm:item.askNm,
                            options:[]
                        }
                    }
                    if(currentId===item.askId){
                        currenInfo.options.push({
                            nm:item.nm,
                            votes:item.votes,
                            rate:item.rate,
                            rates:parseFloat(item.rate.slice(0,item.rate.length-1))
                        })
                        if(index===res.length-1){
                            this.voteList.push(currenInfo)
                        }
                    }else {

                        this.voteList.push(currenInfo)
                        currentId = item.askId
                        currenInfo = {
                            nm:item.askNm,
                            options:[]
                        }
                        currenInfo.options.push({
                            nm:item.nm,
                            votes:item.votes,
                            rate:item.rate,
                            rates:parseFloat(item.rate.slice(0,item.rate.length-1))
                        })
                    }


                })
                this.questionShow = false
            })
        },
        close(){
            this.$emit('questionnaireClose')
        }
    },
    components: {}
  };
</script>

<style scoped lang="less">
  @import url("../assets/css/init.less");
  .questionnaireList{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background: rgba(0,0,0,0.35);
    display: flex;
    display: -webkit-flex;
    .red{
      color: #f23030;
    }
    >i {
      color: #ffffff;
      font-size: 40px;
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
    .main{
      margin: auto;
      width: 800px;
      height: 80%;
      overflow: auto;
      background: #ffffff;
      border-radius: 5px;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      .questionMain{
        flex: 1;
        overflow: auto;
        .question{
          padding: 20px 20px;
          >p{
            padding-bottom: 20px;
          }

        }
      }
      .btn{
        width: 100%;
        border-top: 1px solid #e4e4e4;
        text-align: center;
        p{
          padding: 10px 20px;
          margin: 10px auto;
          width: 80%;
          border-radius: 5px;
          background: @themeColor;
          color: #Ffffff;
          cursor: pointer;
        }
      }
    }
    .result{
      margin: auto;
      width: 800px;
      height: 80%;
      overflow: auto;
      background: #ffffff;
      border-radius: 5px;
      >p{
        text-align: center;
        padding: 20px;
        font-weight: bold;
      }
      >div{
        padding: 10px 20px;
        >p{
          padding: 10px 0;
        }
        ul {
          li{
            line-height: 40px;

            >div{
              width: 300px
            }
          }
        }
      }
    }
  }

</style>
