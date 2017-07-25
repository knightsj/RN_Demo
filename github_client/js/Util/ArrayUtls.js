

export default class ArrayUtls{
    static updateArray(array,item){
        for(var i = 0, len=array.length;i<len;i++){
            var temp = array[i];
            if (temp === item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
}

