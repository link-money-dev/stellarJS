const CustomServerURL="http://47.52.0.154:8888";

const provinces=["---选择省份---","北京","上海","广东","江苏","浙江","重庆","安徽","福建","甘肃","广西",
    "贵州","海南","河北","黑龙江","河南","湖北","湖南","江西","吉林","辽宁","内蒙古",
    "宁夏","青海","山东","山西","陕西","四川","天津","新疆","西藏","云南","香港",
    "澳门","台湾","海外"];
const cities=[["---选择城市---",],["东城","西城","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","平谷","怀柔","密云","延庆"],
    ["崇明","黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东","金山","松江","青浦","南汇","奉贤"],
    ["广州","深圳","珠海","东莞","中山","佛山","惠州","河源","潮州","江门","揭阳","茂名","梅州","清远","汕头","汕尾","韶关","顺德","阳江","云浮","湛江","肇庆"],
    ["南京","常熟","常州","海门","淮安","江都","江阴","昆山","连云港","南通","启东","沭阳","宿迁","苏州","太仓","泰州","同里","无锡","徐州","盐城","宜兴","仪征","张家港","镇江","周庄"],
    ["杭州","安吉","慈溪","定海","奉化","海盐","黄岩","湖州","嘉兴","金华","临安","临海","丽水","宁波","瓯海","平湖","千岛湖","衢州","江山","瑞安","绍兴","嵊州","台州","温岭","温州","余姚","舟山"],
    ["万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双桥","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","璧山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"],
    ["合肥","安庆","蚌埠","亳州","巢湖","滁州","阜阳","贵池","淮北","淮南","黄山","九华山","六安","马鞍山","宿州","铜陵","屯溪","芜湖","宣城"],
    ["福州","厦门","泉州","漳州","龙岩","南平","宁德","莆田","三明"],
    ["兰州","白银","定西","敦煌","甘南","金昌","酒泉","临夏","平凉","天水","武都","武威","西峰","张掖"],
    ["南宁","百色","北海","桂林","防城港","贵港","河池","贺州","柳州","钦州","梧州","玉林"],
    ["贵阳","安顺","毕节","都匀","凯里","六盘水","铜仁","兴义","玉屏","遵义"],
    ["海口","儋县","陵水","琼海","三亚","通什","万宁"],
    ["石家庄","保定","北戴河","沧州","承德","丰润","邯郸","衡水","廊坊","南戴河","秦皇岛","唐山","新城","邢台","张家口"],
    ["哈尔滨","北安","大庆","大兴安岭","鹤岗","黑河","佳木斯","鸡西","牡丹江","齐齐哈尔","七台河","双鸭山","绥化","伊春"],
    ["郑州","安阳","鹤壁","潢川","焦作","济源","开封","漯河","洛阳","南阳","平顶山","濮阳","三门峡","商丘","新乡","信阳","许昌","周口","驻马店"],
    ["武汉","恩施","鄂州","黄冈","黄石","荆门","荆州","潜江","十堰","随州","武穴","仙桃","咸宁","襄阳","襄樊","孝感","宜昌"],
    ["长沙","常德","郴州","衡阳","怀化","吉首","娄底","邵阳","湘潭","益阳","岳阳","永州","张家界","株洲"],
    ["南昌","抚州","赣州","吉安","景德镇","井冈山","九江","庐山","萍乡","上饶","新余","宜春","鹰潭"],
    ["长春","吉林","白城","白山","珲春","辽源","梅河","四平","松原","通化","延吉"],
    ["沈阳","鞍山","本溪","朝阳","大连","丹东","抚顺","阜新","葫芦岛","锦州","辽阳","盘锦","铁岭","营口"],
    ["呼和浩特","阿拉善盟","包头","赤峰","东胜","海拉尔","集宁","临河","通辽","乌海","乌兰浩特","锡林浩特"],
    ["银川","固源","石嘴山","吴忠"],
    ["西宁","德令哈","格尔木","共和","海东","海晏","玛沁","同仁","玉树"],
    ["济南","滨州","兖州","德州","东营","菏泽","济宁","莱芜","聊城","临沂","蓬莱","青岛","曲阜","日照","泰安","潍坊","威海","烟台","枣庄","淄博"],
    ["太原","长治","大同","侯马","晋城","离石","临汾","宁武","朔州","沂州","阳泉","榆次","运城"],
    ["西安","安康","宝鸡","汉中","渭南","商州","绥德","铜川","咸阳","延安","榆林"],
    ["成都","巴中","达川","德阳","都江堰","峨眉山","涪陵","广安","广元","九寨沟","康定","乐山","泸州","马尔康","绵阳","眉山","南充","内江","攀枝花","遂宁","汶川","西昌","雅安","宜宾","自贡","资阳"],
    ["天津","和平","东丽","河东","西青","河西","津南","南开","北辰","河北","武清","红桥","塘沽","汉沽","大港","宁河","静海","宝坻","蓟县"],
    ["乌鲁木齐","阿克苏","阿勒泰","阿图什","博乐","昌吉","东山","哈密","和田","喀什","克拉玛依","库车","库尔勒","奎屯","石河子","塔城","吐鲁番","伊宁"],
    ["拉萨","阿里","昌都","林芝","那曲","日喀则","山南"],
    ["昆明","大理","保山","楚雄","东川","个旧","景洪","开远","临沧","丽江","六库","潞西","曲靖","思茅","文山","西双版纳","玉溪","中甸","昭通"],
    ["香港","九龙","新界"],
    ["澳门"],
    ["台北","基隆","台南","台中","高雄","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","台东","金门","马祖","澎湖"],
    ["阿尔巴尼亚","阿尔及利亚","阿富汗","阿根廷","阿联酋","阿鲁巴","阿曼","阿塞拜疆","埃及","埃塞俄比亚","爱尔兰","爱沙尼亚","安道尔","安哥拉","安圭拉","安提瓜和巴布达","奥地利","奥兰群岛","澳大利亚","澳门","巴巴多斯","巴布亚新几内亚","巴哈马","巴基斯坦","巴拉圭","巴勒斯坦","巴林","巴拿马","巴西","白俄罗斯","百慕大","保加利亚","北马里亚纳群岛","贝宁","比利时","冰岛","波多黎各","波黑","波兰","玻利维亚","伯利兹","博茨瓦纳","不丹","布基纳法索","布隆迪","布韦岛","朝鲜","赤道几内亚","丹麦","德国","东帝汶","多哥","多米尼加","多米尼克","俄罗斯","厄瓜多尔","厄立特里亚","法国","法罗群岛","法属波利尼西亚","法属圭亚那","法属南部领地","法属圣马丁","梵蒂冈","菲律宾","斐济群岛","芬兰","佛得角","冈比亚","刚果(布)","刚果(金)","哥伦比亚","哥斯达黎加","格林纳达","格陵兰","格鲁吉亚","根西岛","古巴","瓜德罗普","关岛","圭亚那","哈萨克斯坦","海地","韩国 南朝鲜","荷兰","荷兰加勒比区","赫德岛和麦克唐纳群岛","黑山","洪都拉斯","基里巴斯","吉布提","吉尔吉斯斯坦","几内亚","几内亚比绍","加拿大","加纳","加蓬","柬埔寨","捷克","津巴布韦","喀麦隆","卡塔尔","开曼群岛","科科斯群岛","科摩罗","科特迪瓦","科威特","克罗地亚","肯尼亚","库克群岛","拉脱维亚","莱索托","老挝","黎巴嫩","立陶宛","利比里亚","利比亚","列支敦士登","留尼汪","卢森堡","卢旺达","罗马尼亚","马达加斯加","马恩岛","马尔代夫","马尔维纳斯群岛( 福克兰)","马耳他","马拉维","马来西亚","马里","马其顿","马绍尔群岛","马提尼克","马约特","毛里求斯","毛里塔尼亚","美国","美国本土外小岛屿","美属萨摩亚","美属维尔京群岛","蒙古国","蒙塞拉特岛","孟加拉","秘鲁","密克罗尼西亚联邦","缅甸","摩尔多瓦","摩洛哥","摩纳哥","莫桑比克","墨西哥","纳米比亚","南非","南极洲","南乔治亚岛和南桑威奇群岛","南苏丹","瑙鲁","尼泊尔","尼加拉瓜","尼日尔","尼日利亚","纽埃","挪威","诺福克岛","帕劳","皮特凯恩群岛","葡萄牙","日本","瑞典","瑞士","萨尔瓦多","萨摩亚","塞尔维亚","塞拉利昂","塞内加尔","塞浦路斯","塞舌尔","沙特阿拉伯","圣巴泰勒米岛","圣诞岛","圣多美和普林西比","圣赫勒拿","圣基茨和尼维斯","圣卢西亚","圣马力诺","圣皮埃尔和密克隆","圣文森特和格林纳丁斯","斯里兰卡","斯洛伐克","斯洛文尼亚","斯瓦尔巴群岛和扬马延岛","斯威士兰","苏丹","苏里南","所罗门群岛","索马里","塔吉克斯坦","泰国","坦桑尼亚","汤加","特克斯和凯科斯群岛","特立尼达和多巴哥","突尼斯","图瓦卢","土耳其","土库曼斯坦","托克劳","瓦利斯和富图纳","瓦努阿图","危地马拉","委内瑞拉","文莱","乌干达","乌克兰","乌拉圭","乌兹别克斯坦","西班牙","西撒哈拉","希腊","新加坡","新喀里多尼亚","新西兰","匈牙利","叙利亚","牙买加","亚美尼亚","也门","伊拉克","伊朗","以色列","意大利","印度","印尼","英国","英属维尔京群岛","英属印度洋领地","约旦","越南","赞比亚","泽西岛","乍得","直布罗陀","智利","中非"]];
function getProIndex(pro){
    for(var i=0;i<provinces.length;i++)
        if(provinces[i]==pro.value)
            return i;
}
//根据获取的省份下标，更改二级列表为对应下标的城市列表，此即二级联动
function addCity(pro,city){
    var index=getProIndex(pro);
    city.options.length=0;
    for (var i = 0; i < cities[index].length; i++)
        city.add(new Option(cities[index][i]));
}

//银行及其简称，注意数组式json格式哈，取值方法略需修改
const bankList = {PSBC: "中国邮政储蓄银行",  ICBC: "中国工商银行", ABC: "中国农业银行",  BOC: "中国银行",
    CCB: "中国建设银行",
    COMM: "中国交通银行",
    CMB: "招商银行",
    CMBC: "中国民生银行",
    CEB: "中国光大银行",
    CITIC: "中信银行",
    HXBANK: "华夏银行",
    SPABANK: "深发/平安银行",
    CIB: "兴业银行",
    SHBANK: "上海银行",
    SPDB: "浦东发展银行",
    GDB: "广发银行",
    BOHAIB: "渤海银行",
    GCB: "广州银行",
    JHBANK: "金华银行",
    WZCB: "温州银行",
    HSBANK: "徽商银行",
    JSBANK: "江苏银行",
    NJCB: "南京银行",
    NBBANK: "宁波银行",
    BJBANK: "北京银行",
    BJRCB: "北京农村商业银行",
    HSBC: "汇丰银行",
    SCB: "渣打银行",
    CITI: "花旗银行",
    HKBEA: "东亚银行",
    GHB: "广东华兴银行",
    SRCB: "深圳农村商业银行",
    GZRCU: "广州农村商业银行股份有限公司",
    DRCBCL: "东莞农村商业银行",
    BOD: "东莞市商业银行",
    GDRCC: "广东省农村信用社联合社",
    DSB: "大新银行",
    WHB: "永亨银行",
    DBS: "星展银行香港有限公司",
    EGBANK: "恒丰银行",
    TCCB: "天津市商业银行",
    CZBANK: "浙商银行",
    NCB: "南洋商业银行",
    XMBANK: "厦门银行",
    FJHXBC: "福建海峡银行",
    JLBANK: "吉林银行",
    HKB: "汉口银行",
    SJBANK: "盛京银行",
    DLB: "大连银行",
    BHB: "河北银行",
    URMQCCB: "乌鲁木齐市商业银行",
    SXCB: "绍兴银行",
    CDCB: "成都商业银行",
    FSCB: "抚顺银行",
    ZZBANK: "郑州银行",
    NXBANK: "宁夏银行",
    CQBANK: "重庆银行",
    HRBANK: "哈尔滨银行",
    LZYH: "兰州银行",
    QDCCB: "青岛银行",
    QHDCCB: "秦皇岛市商业银行",
    BOQH: "青海银行",
    TZCB: "台州银行",
    CSCB: "长沙银行",
    BOQZ: "泉州银行",
    BSB: "包商银行",
    DAQINGB: "龙江银行",
    SHRCB: "上海农商银行",
    ZJQL: "浙江泰隆商业银行",
    H3CB: "内蒙古银行",
    BGB: "广西北部湾银行",
    GLBANK: "桂林银行",
    DAQINGB: "龙江银行",
    CDRCB: "成都农村商业银行",
    FJNX: "福建省农村信用社联合社",
    TRCB: "天津农村商业银行",
    JSRCU: "江苏省农村信用社联合社",
    SLH: "湖南农村信用社联合社",
    JXNCX: "江西省农村信用社联合社",
    SCBBANK: "商丘市商业银行",
    HRXJB: "华融湘江银行",
    HSBK: "衡水市商业银行",
    CQNCSYCZ: "重庆南川石银村镇银行",
    HNRCC: "湖南省农村信用社联合社",
    XTB: "邢台银行",
    LPRDNCXYS: "临汾市尧都区农村信用合作联社",
    DYCCB: "东营银行",
    SRBANK: "上饶银行",
    DZBANK: "德州银行",
    CDB: "承德银行",
    YNRCC: "云南省农村信用社",
    LZCCB: "柳州银行",
    WHSYBANK: "威海市商业银行",
    HZBANK: "湖州银行",
    BANKWF: "潍坊银行",
    GZB: "赣州银行",
    RZGWYBANK: "日照银行",
    NCB: "南昌银行",
    GYCB: "贵阳银行",
    BOJZ: "锦州银行",
    QSBANK: "齐商银行",
    RBOZ: "珠海华润银行",
    HLDCCB: "葫芦岛市商业银行",
    HBC: "宜昌市商业银行",
    HZCB: "杭州商业银行",
    JSBANK: "苏州市商业银行",
    LYCB: "辽阳银行",
    LYB: "洛阳银行",
    JZCBANK: "焦作市商业银行",
    ZJCCB: "镇江市商业银行",
    FGXYBANK: "法国兴业银行",
    DYBANK: "大华银行",
    DIYEBANK: "企业银行",
    HQBANK: "华侨银行",
    HSB: "恒生银行",
    LSB: "临沂商业银行",
    YTCB: "烟台商业银行",
    QLB: "齐鲁银行",
    BCCC: "BC卡公司",
    CYB: "集友银行",
    TFB: "大丰银行",
    AEON: "AEON信贷财务亚洲有限公司",
    MABDA: "澳门BDA"
}
const cardTypeMap = {
    DC: "储蓄卡",
    CC: "信用卡",
    SCC: "准贷记卡",
    PC: "预付费卡"
};
//银行卡验证
function checkBankNo(cardNo){
    var value = cardNo.toString(); //获取当前输入框的值
    $.post("https://ccdcapi.alipay.com/validateAndCacheCardInfo.json",{cardNo:value,cardBinCheck:'true'},function(res){
        if(res.validated){
            return true;
        }else{
            setTimeout($("#bank").focus(),1); //获取焦点
            return false;
        }
        return res
    },'json');
}


function number(number, decimals, dec_point, thousands_sep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    decimals=decimals||2
    dec_point=dec_point||'.'
    thousands_sep=thousands_sep||','
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function base64_encode(str){
    str=CryptoJS.enc.Utf8.parse(str.toString())
    var base64=CryptoJS.enc.Base64.stringify(str);
    return base64
}
function base64_decode(str){
    try {
        var words  = CryptoJS.enc.Base64.parse(str);
        return words.toString(CryptoJS.enc.Utf8)
    }
    catch(err) {
        return null;
    }
}

function convertDateFromString(dateString) {
    if (dateString) {
        dateString=dateString.substring(0,dateString.length-1);
        var arr1 = dateString.split("T");
        var sdate = arr1[0].split('-');
        var sday=arr1[1].split(":");
        var date = new Date(sdate[0], sdate[1]-1, sdate[2],sday[0],sday[1],sday[2]);
        return date.toJSON().replace('.000','');
    }
}

function setSecret(secretKey) {
    // 应该首先检查私钥的合法性
    cookie.set("link_secret",secretKey,0)
}

function getSecret(){
    var secret=cookie.get('link_secret');
    return secret
}

var cookie = {
    set:function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time;  //将date设置为n天以后的时间
        date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
        document.cookie=key + "=" + val;  //设置cookie
    },
    get:function(key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        var tips;  //声明变量tips
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            if (key === arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                tips = arr[1];   //将cookie的值赋给变量tips
                return tips;   //终止for循环遍历
            }
        }
    },
    delete:function(key){ //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
    }
}


function checkLogin() {
    var secretKey=getSecret();
    var publicKey;
    var source
    var login_1=document.getElementById('login-1')
    if(secretKey){
        source= StellarSdk.Keypair.fromSecret(secretKey);
        publicKey=source.publicKey();
        login_1.innerHTML="注销"
        return true
    }
    else {
        window.location.href="login.html";
        return false
    }
}

function login(secretKey) {
    cookie.set("link_secret",secretKey,0)
    var publicKey=StellarSdk.Keypair.fromSecretKey(secretKey)
    readAccount(publicKey)
    localStorage.setItem("myAssets",getMyAssets(publicKey))
    // window.myAssets=getMyAssets()
}

function logout() {
    cookie.delete("link_secret")
    cookie.delete("link_address")
    localStorage.clear()
    window.location.href="login.html";
}


// 如果提供accountID参数，则读取专属此账号的信息留言；
// 如果不提供accountID参数，则读取母账号发送的所有信息留言
function readMessages(accountID) {

}


function getMyAssets(accountID) {
    {
        var myAssets=[];
        var xmlhttp;
        var resonseText;
        if (window.XMLHttpRequest)
        {
            // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
            xmlhttp=new XMLHttpRequest();
        }
        else
        {
            // IE6, IE5 浏览器执行代码
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                resonseText=eval('(' + xmlhttp.responseText + ')');
                if(resonseText.hasOwnProperty('status') && resonseText.status===400){
                    return 'Account Not Valid'
                }
                else if(resonseText.hasOwnProperty('balances')){
                    myAssets=[];
                    for(b of resonseText.balances){
                        var asset={'asset_code':b.asset_code,
                            'asset_type':b.asset_type,
                            'asset_issuer':b.asset_issuer
                        }
                        myAssets.push(asset)
                    }
                    localStorage.setItem("myAssets",JSON.stringify(myAssets))
                    return myAssets
                }
                else {
                    return 'Unknown Error'
                }

            }
            else{
                return 'Network Error'
            }
        }
        xmlhttp.open("GET","http://47.52.0.154:8888/accounts/"+accountID,true);
        xmlhttp.send();
    }
}

async function sendPayment(receiverPublicKey,asset,amount, message) {
    var secretKey=cookie.get('link_secret');
    amount=amount.toString();
    const sourceSecretKey = secretKey;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server('http://47.52.0.154:8888');
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await  server.fetchBaseFee();

    var transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
    transaction.addOperation(StellarSdk.Operation.payment({
        destination: receiverPublicKey,
        asset: asset,
        amount: amount,
    }))
    if(message && message.toString().length>0){
        transaction.addMemo(new StellarSdk.Memo('text',message.toString()))
    }

    transaction.setTimeout(30)
    transaction=transaction.build();
    transaction.sign(sourceKeypair);

    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        // console.log('\nSuccess! View the transaction at: ');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

async function addAsset(issuer,code,limit) {
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;
    var asset=new StellarSdk.Asset(code,issuer);
    limit=isNaN(limit)?2147483647:limit
    limit=limit.toString()
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server('http://47.52.0.154:8888');
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await  server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: asset,
            limit:limit,
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

async function changeTrust(issuer,code,limit) {
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;
    var asset=new StellarSdk.Asset(code,issuer);
    limit=isNaN(limit)?2147483647:limit
    limit=limit.toString()
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server('http://47.52.0.154:8888');
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await  server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: asset,
            limit:limit,
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

async function issueAsset(issuer,distributor,code,amount) {
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;
    var issuerPrivateKey=issuer;
    var distributorPrivateKey=distributor;
    var issuerKeypair=StellarSdk.Keypair.fromSecret(issuerPrivateKey);
    var distributorKeypair=StellarSdk.Keypair.fromSecret(distributorPrivateKey);


    amount=isNaN(amount)?Number.MAX_SAFE_INTEGER:amount
    amount=amount.toString()

    const distributorPublicKey = distributorKeypair.publicKey();
    const issuerPublicKey=issuerKeypair.publicKey();

    var asset=new StellarSdk.Asset(code,issuerPublicKey);

    const server = new StellarSdk.Server('http://47.52.0.154:8888');
    StellarSdk.Network.usePublicNetwork();
    var account =await server.loadAccount(distributorPublicKey);

    const fee =await  server.fetchBaseFee();

    // first distributor should trust issuer:
    var transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.changeTrust({
            asset: asset,
            limit:amount,
        }))
        .setTimeout(30)
        .build();

    transaction.sign(distributorKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccess! View the transaction at: ');
        console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }

    account= await server.loadAccount(issuerPublicKey);
    // second the issuer should pay the distributor the asset
    transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.payment({
            destination: distributorPublicKey,
            asset: asset,
            amount: amount,
        }))
        .setTimeout(30)
        .build();

    transaction.sign(issuerKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        // console.log('\nSuccess! View the transaction at: ');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

async function manageData(key,value) {
    if(key.toString().length>=64 || key.toString().length<=0){
        throw "key length should be less than 64 bytes"
    }
    // if(value.toString().length>=64 || value.toString().length<=0){
    //     throw "value length should be less than 64 bytes"
    // }
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server(CustomServerURL);
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.manageData({
            name: key,
            value: value
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        alert('更新成功!');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        alert('失败!' + e);
    }
}

async function manageDatas(opts) {

    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server(CustomServerURL);
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await server.fetchBaseFee();

    var transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
    for(var key in opts){
        transaction.addOperation(StellarSdk.Operation.manageData({
            name: key,
            value:opts[key]
        }))
    }
    transaction.setTimeout(30)
    transaction=transaction.build();
    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        alert('更新成功!');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        alert('失败!' + e);
    }
}

async function createAccount(destination,startingBalance) {
    startingBalance=startingBalance.toString();
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server(CustomServerURL);
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.createAccount({
            destination: destination,
            startingBalance: startingBalance
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        console.log('\nSuccessfully  ');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}

async function talkTo(receiverPublicKey, message, amount) {
    amount=amount||0.01.toString();
    var asset=new StellarSdk.Asset('FX','GCNYF4V6CUY2XENJGRHLNB3AQE3RZIOWYHUN6YU5T34N3ZSK4KGCB7DD');
    var secretKey=cookie.get('link_secret');
    const sourceSecretKey = secretKey;

    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
    const sourcePublicKey = sourceKeypair.publicKey();

    const server = new StellarSdk.Server(CustomServerURL);
    StellarSdk.Network.usePublicNetwork();
    const account =await server.loadAccount(sourcePublicKey);

    const fee =await  server.fetchBaseFee();

    const transaction = new StellarSdk.TransactionBuilder(account, { fee })
    // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.payment({
            destination: receiverPublicKey,
            asset: asset,
            amount: amount,
        }))
        .addMemo(new StellarSdk.Memo('text',message.toString()
        ))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);
    //console.log(transaction.toEnvelope().toXDR('base64'));
    try {
        const transactionResult = await server.submitTransaction(transaction);
        // console.log(JSON.stringify(transactionResult, null, 2));
        // console.log('\nSuccess! View the transaction at: ');
        // console.log(transactionResult._links.transaction.href);
    } catch (e) {
        console.log('An error has occured:');
        console.log(e);
    }
}