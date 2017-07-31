
export default class Utils{
    //检查这个item是否被收藏
    static checkFavoriteItemExistance(item,items){
        for(var i = 0, len = item.length; i<len; i++){
            if (item.id.toString() === items[i]){
                return true;
            }
        }
    }
}
