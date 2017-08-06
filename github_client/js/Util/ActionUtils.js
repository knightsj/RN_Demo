
import RepositoryDetail from '../../js/pages/RepositoryDetailPage'

export default class ActionUtils {

    //跳转到详情页面
    static onSelectRepository(params){
        var {navigator}=params;
        navigator.push({
            component:RepositoryDetail,
            params:{
                ...props
            }
        })
    }

}