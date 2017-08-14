import {
    AsyncStorage
} from 'react-native'

import GitHubTrending from 'GitHubTrending'

export var FlAG_STORAGE = {flag_popular:'popular',flag_trending:'trending',flag_mine:'mine'};

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

            if (this.flag !== FlAG_STORAGE.flag_trending){
                fetch(url)
                    .then(response=>response.json())
                    .catch((error)=>{
                        reject(error);
                    }).then((responseData)=>{

                    if (this.flag === FlAG_STORAGE.flag_mine && responseData){
                        this.saveRespository(url,responseData);
                        resolve(responseData);
                    }else if (responseData && responseData.items){
                        this.saveRespository(url,responseData.items);
                        resolve(responseData.items);
                    }else{
                        reject(new Error('responseData is null'));
                    }

                });
            }else {

                this.trending.fetchTrending(url)
                    .then(items=>{
                        if(!items){
                            reject(new Error('responseData is null'));
                            return;
                        }
                        resolve(items);
                        this.saveRespository(url,items);
                    }).catch((error)=>{
                        reject(error);
                })

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
        let wrapData;
        if (this.flag === FlAG_STORAGE.flag_mine){
            wrapData = {item:items, update_date:new Date().getTime()};
        }else {
            wrapData = {items:items, update_date:new Date().getTime()};
        }
        AsyncStorage.setItem(url,JSON.stringify(wrapData),callBack);
    }

    removeRepository(url) {
        AsyncStorage.removeItem(url, (error, result)=> {
            if(error)console.log(error);
        });
    }

}