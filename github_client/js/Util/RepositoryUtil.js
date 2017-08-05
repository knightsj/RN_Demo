import {
    AsyncStorage
} from 'react-native'

import DataRepository,{FlAG_STORAGE} from '../expand/dao/DataRepository'
import TimeUtil from '../Util/TimeUtil'

var itemMap = new Map();

export default class RepositoryUtil{
    constructor(aboutCommon){
        this.aboutCommon = aboutCommon;
        this.dataRespository = new DataRepository(FlAG_STORAGE.flag_mine);
    }

    updateData(key,value){
        itemMap.set(key,value);
        var arr = [];
        for(var value of itemMap.values()){
            arr.push(value);
        }
    }

    //获取指定url下的数据
    fetchRepository(url){
        this.dataRespository.fetchRespository(url)
            .then(result=>{
                if (result){
                    this.updateData(url,result);
                    if(!TimeUtil.checkDate(result.update_date)){
                        return this.dataRespository.fetchNetRepository(url);
                    }
                }
            }).then((item)=>{
                if(tiem){
                    this.updateData(url,item);
                }
        }).catch(e=>{

        })
    }

    //批量获取url对应的数据
    fetchRepositorys(urls){
        for (let i=0,l=urls.length;i<l;i++){
            url = urls[i];
            this.fetchRepository(url);
        }
    }
}