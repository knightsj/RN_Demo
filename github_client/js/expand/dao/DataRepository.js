import {
    AsyncStorage
} from 'react-native'

import GitHubTrending from 'GitHubTrending'

export var FlAG_STORAGE = {flag_popular:'popular',flag_trending:'trending'};

export default class  DataRepository{

    constructor(flag){
        this.flag = flag;
        if(flag === FlAG_STORAGE.flag_trending)this.trending = new GitHubTrending();
    }
    //获取数据
    fetchRespository(url) {

        return new Promise((resolve, reject) =>{

            this.fetchLocalRespository(url)
                .then((wrapData)=> {

                if (wrapData) {

                    resolve(wrapData,true);

                } else {

                    this.fetchNetRepository(url)

                        .then((data) => {
                            resolve(data);
                        })
                        .catch(e=> {
                            reject(e);
                        })
                }
            }).catch(e=> {

                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e=> {
                            resolve(e);
                        })
                })
        })
    }


    fetchNetRepository(url){
        return new  Promise((resolve,reject)=>{
            if (this.flag === FlAG_STORAGE.flag_trending){
                this.trending.fetchTrending(url)
                    .then(result=>{
                        if(!result){
                            reject(new Error('responseData is null'));
                            return;
                        }
                        this.saveRespository(url,result);
                        resolve(result);
                    })
            }else {

                fetch(url)
                    .then(response=>response.json())
                    .catch((error)=>{
                        reject(error);
                    }).then((responseData)=>{
                        if(!responseData || !responseData.items){
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(responseData.items);
                        this.saveRespository(url,responseData.items);
                }).done();
            }

        })
    }

    fetchLocalRespository(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url, (error, result)=>{
                if (!error){
                    try {
                        resolve(JSON.parse(result));
                    }catch (e){
                        reject(e);
                    }
                }else {
                    reject(error);
                }
            })
        })
    }


    saveRespository(url, items, callBack){
        if(!url || !items) return;
        let wrapData = {items:items, update_date:new Date().getTime()};
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

    checkData(longTime){
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;
    }
}