import {
    AsyncStorage
} from 'react-native'




export default class  DataRepository{

    //获取离线缓存
    fetchRespository(url) {

        return new Promise((resolve, reject) =>{
            this.fetchLocalRespository(url)
            .then(result=> {
                if (result) {
                    resolve(result);
                } else {
                    this.fetchNetRepository(url)
                        .then(result => {
                            resolve(result);
                        })
                        .catch(e=> {
                            resolve(e);
                        })
                }
            })
                .catch(e=> {
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
            fetch(url)
                .then(response=>response.json())
                .then(result=>{
                    if(!result){
                        reject(new Error('responseData is null'));
                        return;
                    }
                    resolve(result.items);
                    this.saveRespository(url,result.items)
                })
                .catch(error=>{
                    reject(error);
                })
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
        return false;
        let cDate = new Date();
        let tDate = new Date();
        tDate.setTime(longTime);
        if (cDate.getMonth() !== tDate.getMonth()) return false;
        if (cDate.getDay() !== tDate.getDay()) return false;
        if (cDate.getHours() - tDate.getHours() > 4) return false;
        return true;

    }
}