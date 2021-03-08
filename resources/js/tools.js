Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * Uint8Array转字符串
 * @return {string}
 */
window.Uint8ArrayToString = function(fileData){
    return String.fromCharCode.apply(null,fileData);
};

/**
 * 字符串转Uint8Array
 * @param str
 * @returns {Uint8Array}
 */
window.stringToUint8Array = function(str){
    let arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
        console.log(str[i].charCodeAt());
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
};

window.intToBytes = function(value){
    return [
        (value & 0xFF000000)>>24,
        (value & 0x00FF0000)>>16,
        (value & 0x0000FF00)>>8,
        (value & 0x000000FF)
    ]
};

window.bytesToInt = function(ary){
    return (ary[3]&0xFF)
        | ((ary[2]<<8) & 0xFF00)
        | ((ary[1]<<16)& 0xFF0000)
        | ((ary[0]<<24) & 0xFF000000);
};

window.upperCaseWord = function(word){
    return word.charAt(0).toUpperCase() + word.slice(1)
};
/**
 * 格式化key字段
 * 首字母大写
 */
window.formatUpperKey = function(key){
    let str = '';
    if(key.indexOf('_')!==-1){
        //说明有该字符
        var subArr = key.split('_');
        if(subArr){
            for(let val of subArr){
                if(val.length>0){
                    str += upperCaseWord(val);
                }
            }
        }
    }else{
        str = upperCaseWord(key);
    }
    return str;
};

window.randomStr = (length,strs)=>{
    if(!length){
        return null;
    }
    if(!strs){
        strs = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    }
    let len=0;
    let ranStr = '';
    while(len<length){
        let idx = parseInt(Math.random()*(strs.length-1));
        ranStr+=strs[idx];
        len++;
    }
    return ranStr;
};
/**
 * ======================
 * 下面模拟php重的一些方法
 * ======================
 */
window.json_encode = function(obj){
    if(typeof obj==='object'){
        return JSON.stringify(obj);
    }
    return obj;
};

window.json_decode = function(str){
    if(typeof str === 'string'){
        return JSON.parse(str);
    }
    return str;
};



window.isset=function(value){
    return value && !isNaN(value) && value != undefined;
};
window.isset_num=function(value){
    return value!=null && !isNaN(value) && value!=undefined && value!='';
};

window.empty = function(obj){
    if(typeof obj =='string'){
        return obj.length<1;
    }else if(obj instanceof Array){
        return obj.length<1;
    }else if(obj instanceof Object){
        return Object.keys(obj).length<1;
    }
    return !isset(obj);
};

window.in_array = function(find,arr){
    if(Array.isArray(arr)){
        return arr.findIndex(n=>n==find)!=-1;
    }
    return false;
};

window.array = function(){
    if(isset(arguments) && arguments.length>0){
        return [...arguments];
    }
    return [];
};

window.intval = function(v){
    if(isset_num(v)){
        return parseInt(v);
    }
    return 0;
};

window.strval = function(v){
    if(isset(v)){
        return v+'';
    }
    return '';
};

window.strlen = function(str){
    if(isset(str)){
        if(typeof str == 'string'){
            return str.length;
        }else if(typeof str == 'number'){
            return `${str}`.length;
        }
    }
    return 0;
};

/**
 * 格式化钱
 * @param $money 钱币比例转换
 * @param $scale 比例默认1:100
 * @param $fixedLen 小数点保留位数，默认跟比例一样，几个0就保留几位
 * @return string 返回格式化后的字符串
 */
window.money_format = function($money,$scale,$fixedLen){
    if (isset($money) && $money>0){
        if(!$scale){
            $scale = 100;
        }
        if(!$fixedLen){
            $fixedLen = (''+$scale).length-1;
        }
        return (intval($money)/$scale).toFixed($fixedLen);
    }
    if (isset($money) && $money<0){
        if(!$scale){
            $scale = 100;
        }
        if(!$fixedLen){
            $fixedLen = (''+$scale).length-1;
        }
        return (intval($money)/$scale).toFixed($fixedLen);
    }
    return `0`;
};

window.copy = function(data){
    console.log(data);
    let oInput = document.createElement('input');
    oInput.value = data;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象;
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.remove()
};
/**
 * 参数序列化为proto
 */
window.proto_merge = function(CS,params){
    if(!empty(params) && typeof CS == 'function'){
        let pb = new CS();
        for(let key in params){
            if(typeof pb[`set${key}`] == 'function'){
                pb[`set${key}`](params[key]);
            }else{
                console.error("param key error : "+key);
                return
            }
        }
        return pb;
    }
}
