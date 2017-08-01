
export default class Utils{
    //检查这个item是否被收藏
    static checkFavoriteItemExistance(item,items){
        for(var i = 0, len = items.length; i<len; i++){
            var id = item.id?item.id.toString():item.fullName;
            if (id === items[i]){
                return true;
            }
        }
        return false;
    }
}
