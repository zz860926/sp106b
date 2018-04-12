var tokens =[];
var tokenIdx = 0;

var fs = require('fs'); // 引用檔案物件
var data = fs.readFileSync(process.argv[2], "utf8"); // 讀取檔案
//console.log(data); // 顯示在螢幕上

var re = /(\/\*[\s\S]*?\*\/)|(\/\/.*\r?\n)|(@\d+)|([AMD]+=*[AMD]+[=+-]*[AMD]*)|(\r?\n)|(.)/gm; // *?, +? non greedy, m for multiline
tokens = data.match(re);



function scan(){
    var data =""
    for(var i=0;i<tokens.length;i++){
        var token = tokens[tokenIdx++]
        if(token == token.match(/@[0-9]+/)){         //a 指令
            var rep = token.replace("@","")          //ex:@2 - @ =2
            var bianry = parseInt(rep).toString(2)
            var zeroC = 16 - bianry.length          //zero count
            var sixteenZ = "000000000000000"            
            var AIn = sixteenZ.substring(0,zeroC)+bianry
            console.log(AIn)
            data += AIn + "\n"
            
        }
        if(token == token.match(/[AMD]+=[AMD]+[=+-]*[AMD]*/)){
            var dest = token.match(/[AMD]+/)
            var destc = checkD(dest)
            var comp = token.match(/=[AMD]+[=+-]*[AMD]*/)
            var compc = checkC(comp)
            var CIn = "111" + compc + destc + "000"
            console.log(CIn)
            data += CIn +"\n"
        }
    }
    fs.writeFileSync(process.argv[3], data);
}
//check dist
function checkD(o){
     //dest
    var object = {
         M : "001",
         D : "010",
         A : "100",
         MD : "011",
         AM : "101",
         AD : "110"
    }
    for (var key in object){
        if(o==key){
            return object[key]
        }
    }
}

//check comp
function checkC(o){
    var object ={
        "=0" :"0101010",
        "=1" :"0111111",
        "=-1":"0111010",
        "=D"   :"0001100",
        "=A"   :"0110000",
        "=!D":"0001101",
        "=!A":"0110001",

        "=D+A":"0000010",
    }
    for (var key in object){
        if(o==key){
            return object[key]
        }
    }
}
scan()

