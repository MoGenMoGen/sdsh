// const app = getApp()
// Vue.prototype.globalData = getApp().globalData
// http://ht.jiaxiangtech.com
import { MessageBox } from 'element-ui'
// let hostUrl = "http://127.0.0.1"
// let hostUrl = "http://pj.xiaomy.net"
let hostUrl = "http://zjfyadm.jinkworld.com/"
if(process.client){
  hostUrl = ''
}else {
  hostUrl = 'http://zjfyadm.jinkworld.com/'
  // hostUrl = 'http://192.168.0.18/'
}
// console.log(process.client)
// let hostUrl = ""
const axios = require('axios');
function get(url, data, header) {
    // console.log(url)

    let myData = {};
    if (data) {
        //过滤掉空的参数
        for (let [key, val] of Object.entries(data)) {
            if (val) {
                myData[key] = val;
            }
        }
    }

    let promise = new Promise((resolve, reject) => {
        axios.get(hostUrl+url, {
            params: data
        })
            .then(function (res) {
               if(res.data.code===200){
                 resolve(res.data)
               }else {
                   MessageBox({
                       message: res.data.msg ||  res.data.message,
                       type: 'warning'
                   });
               }
            })
            .catch(function (error) {
              console.log(error)
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            })

    });
    return promise;
}

function post(url, data, header) {

    let promise = new Promise((resolve, reject) => {
        axios.post(hostUrl+url, data)
            .then(function (res) {
                if(res.data.code===0){
                    resolve(res.data)
                }else {
                    MessageBox({
                        message: res.data.msg ||  res.data.message,
                        type: 'warning'
                    });
                }
            })
            .catch(function (error) {
                MessageBox({
                    message: JSON.stringify(error),
                    type: 'warning'
                });
            });
    });
    return promise;
}

class api {
    //获取栏目
    getMenuNav(data) {
        return new Promise((resolve, reject) => {
            get("/open/blade-content/contentcat/listByParentId",data).then(res => {

                resolve(res.data)
            });
        });
    }
    //获取栏目下的列表
    getList(data) {
        return new Promise((resolve, reject) => {
            get("/sys/news/api/page?query="+data).then(res => {
                // res.data.list.forEach(item=>{
                //     if(!item.summary){
                //         let cont = item.cont.replace(/<\/?[^>]*>/g, "")
                //         item.summary =  cont.replace(/&nbsp;/ig, "").slice(0,50)+'...';
                //     }
                // })
                resolve(res)
            });
        });
    }
  //获取栏目下的列表旧的
  getList2(data) {
    return new Promise((resolve, reject) => {
      get("/sys/news/api/pageACat?query="+data).then(res => {
        // res.data.list.forEach(item=>{
        //   if(!item.summary){
        //     let cont = item.cont.replace(/<\/?[^>]*>/g, "")
        //     item.summary =  cont.replace(/&nbsp;/ig, "").slice(0,50)+'...';
        //   }
        // })
        resolve(res)
      });
    });
  }
    //获取栏目下的所有列表
    getAllList(data) {
        return new Promise((resolve, reject) => {
            get("/sys/news/api/pageNewsByParentCatId",data).then(res => {
                // res.data.list.forEach(item=>{
                //     if(!item.summary){
                //         let cont = item.cont.replace(/<\/?[^>]*>/g, "")
                //         item.summary =  cont.replace(/&nbsp;/ig, "").slice(0,50)+'...';
                //     }
                // })
                resolve(res)
            });
        });
    }
  //新媒列表
  getMedia(data) {
    return new Promise((resolve) => {
      get("/open/blade-media/mediagather/list",data).then(res => {
        resolve(res.data)
      });
    });
  }
    //获取栏目下所有的列表
    getListAll(data) {
        return new Promise((resolve, reject) => {
            get("/open/blade-content/contentdetail/pages",data).then(res => {
              res.data.records.forEach(item=>{
                if(!item.summary){
                  if(item.cont){
                    let cont =item.cont.replace(/<\/?[^>]*>/g, "")

                    item.summary =  cont.replace(/&nbsp;/ig, "").slice(0,50)+'...';
                  }

                }
              })
                resolve(res.data)
            });
        });
    }

    //获取新闻详情
    getDetail(id) {
        return new Promise((resolve, reject) => {
            get("/open/blade-content/contentdetail/info?id="+id).then(res => {
                resolve(res.data)
            });
        });
    }
    //新闻详情，返回所属栏目信息
    getNewDetail(id){
        return new Promise((resolve, reject) => {
            get("/open/blade-content/contentdetail/info?id="+id).then(res => {
                resolve(res.data)
            });
        });

    }
  //阅读数量
  readAdd(id){
    get("/open/blade-content/contentdetail/readQty?id="+id,'',true);

  }
    //搜索
    search(data) {
        return new Promise((resolve, reject) => {
            get("/sys/newsSearch/api/page",data).then(res => {
                res.data.result.forEach(item=>{

                        item.cont =  item.cont.length>200?item.cont.slice(0,200)+'...' : item.cont

                })
                resolve(res)
            });
        });
    }
    //搜索详情
    searchDetail(id) {
        return new Promise((resolve, reject) => {
            get("/sys/newsSearch/api/info/"+id,).then(res => {
                resolve(res.data)
            });
        });
    }
    //获取广告图集
    getAdr(pos,qty) {
        let data = {}
        if(qty){
            data = {
                posCd:pos,
                tntId:1,
                type:2,
                adNums:qty
            }
        }else {
            data = {
                posCd:pos,
                tntId:1,
                type:2,
            }
        }

        return new Promise((resolve, reject) => {
            get("/open/advertinfo/listAdsByPos",data).then(res => {
              // console.log('广告')
              res.data.forEach(item=>{
                if(item.locUrl.indexOf('www.zjfzol.com.cn/pc')>-1){
                  item.locUrl = window.location.origin+'/pc'+item.locUrl.split('#')[1]
                }
              })
                console.log(res.data)
                resolve(res.data)
            });
        });
    }
    //富文本详情
    getPage(data) {
        return new Promise((resolve, reject) => {
            get("/sys/show/api/pageInfo?query="+data,).then(res => {
                resolve(res.data)
            });
        });
    }
    //友情链接栏目
    getLink(){
        return new Promise((resolve, reject) => {
            get("/law/friendlinkColumn/api/list",).then(res => {
                resolve(res.data.list)
            });
        });
    }
    //友情链接列表
    getLinkList(id) {
        return new Promise((resolve, reject) => {
            get("/law/friendLink/api/list?columnId="+id,).then(res => {
                resolve(res.data.list)
            });
        });
    }

    //首页

    //banner背景及二维码
    getBanner(){
        return new Promise((resolve, reject) => {
            get("/sys/homePage/listAds1",).then(res => {
                resolve(res.data)
            });
        });
    }

    //首页其他四个广告位
    getHomeBanner(){
        return new Promise((resolve, reject) => {
            get("/sys/homePage/listAds2",).then(res => {
                resolve(res.data)
            });
        });
    }

    //导航栏
    getNav(data){
        return new Promise((resolve, reject) => {
            get("/sys/homePage/listNewsCat?query="+data,).then(res => {
                resolve(res.data.list)
            });
        });
    }

    //首页新闻
    getHomeNew(params){
        return new Promise((resolve, reject) => {
            get("/sys/homePage/news", params).then(res => {
                for(let [k,v] of Object.entries(res.data)){
                    v.forEach(i=>{
                        if(!i.summary){
                            let cont = i.cont ? i.cont.replace(/<\/?[^>]*>/g, "") : ''
                            i.summary =  cont.replace(/&nbsp;/ig, "").slice(0,50)+'...';
                        }
                    })
                }

                resolve(res.data)
            });
        });
    }

    //专题栏目
    themeList(data){
        return new Promise((resolve, reject) => {
            get("/theme/column/api/template/page?query="+data,).then(res => {
                resolve(res)
            });
        });
    }
    //专题内容
    themeInfo(data){
        return new Promise((resolve, reject) => {
            get("/theme/column/api/template/datas",data,).then(res => {
                resolve(res.data)
            });
        });
    }

    //专题内容
    themeContent(data){
        return new Promise((resolve, reject) => {
            get("/theme/column/api/template/show",data,).then(res => {
                resolve(res.data)
            });
        });
    }
//专题URL
    themeUrl(data){
        return new Promise((resolve, reject) => {
            get("/theme/column/api/template/show2",data,).then(res => {
                resolve(res.data)
            });
        });
    }
    //电子杂志
    eZineList(data){
        return new Promise((resolve, reject) => {
            get("/law/pdf/api/page2",data,).then(res => {
                resolve(res)
            });
        });
    }
    //电子杂志详情
    // eZineDetail(id){
    //     return new Promise((resolve, reject) => {
    //         get("/law/pdf/api/info/"+id).then(res => {
    //             resolve(res)
    //         });
    //     });
    // }
    //抖音统计阅读量
    douYinRead(id){
        return get('/law/douyin/api/readStat/'+id)

    }
    //抖音账号
    getDouYinCount(){
        return new Promise((resolve => {
            get('/law/douyinAccount/api/list').then(res=>{
                resolve(res.data.list)
            })
        }))
    }
    //抖音账号下的抖音视频列表
    getDouYiList(data){
        return new Promise((resolve => {
            get('/law/douyin/api/pagePc?query='+data).then(res=>{
                resolve(res)
            })
        }))
    }
    //调查问卷题目列表
    getQuestionnaireList(id){
        return new Promise((resolve => {
            get('/sys/newsAsk/api/listTreeByNewsId?newsId='+id).then(res=>{
                resolve(res.data.list)
            })
        }))
    }
    sumbitQuestionnaire(data){
        return new Promise((resolve => {
            post('/sys/newsOptionVote/api/vote',data).then(res=>{
                resolve(res)
            })
        }))
    }
    //问卷结果
    voteResult(id){
        return new Promise((resolve => {
            get('/sys/newsAskOption/api/listAAsk?newsId='+id).then(res=>{
                resolve(res.data.list)
            })
        }))
    }
    //留言提交
    feedback(data){
        return new Promise(resolve => {
            post('/law/msgDiscuss/api/addMsg',data).then(res=>{
                resolve(res)
            })
        })
    }
    //公众号外链
    getWX(url){
        return new Promise(resolve => {
            let showSrc = 'https://cors-anywhere.herokuapp.com/'+url; //协议名根据实际情况决定
            axios.get(showSrc)
                .then(function (response) {
                    let html = response.data;
                    html = html.replace(/data-src/g, "src")
                        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/g, '')
                        .replace(/https/g,'http');
                    let html_src = 'data:text/html;charset=utf-8,' + html;
                    resolve(html_src)
                    // let iframe = document.getElementById('iFrame');
                    // iframe.src = html_src;
                })
                .catch(function (error) {
                    // MessageBox({
                    //     message: JSON.stringify(error),
                    //     type: 'warning'
                    // });
                })
        })
    }
}

export { api,hostUrl };
