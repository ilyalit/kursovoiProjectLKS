(function($, irnd) {
    var tblock =    [[[0,0],[0,-1],[-1,0],[-1,-1]], // O
                    [[0,0],[0,1],[0,-1],[0,-2]], // I
                    [[0,0],[0,-1],[1,0],[1,1]], // S
                    [[0,0],[0,1],[1,0],[1,-1]], //Z
                    [[0,0],[1,0],[0,1],[-1,0]], // T
                    [[0,0],[0,-1],[0,1],[1,1]], //L
                    [[0,0],[0,-1],[0,1],[-1,1]]]; // J

    var colors = ["yellow", "cyan", "lime", "red", "darkmagenta", "orange", "blue"];

    var x=4, y=-3, dx = 0, counter = 0, rotation=0, rot = 0, t=-1, down = 0, level=1, score=0, total=0;
    
    $("main").innerHTML=["<table id=\"field\">","</table>"].join(new Array(21).join(["<tr>", "</tr>"].join(new Array(11).join("<td>&nbsp;</td>")))); //рисуем в div наше поле 20х10 nbsp-неразрывный пробел хз зачем
    
    var fieldNode = $("field"), field = new Array(21).join(" ").split("").map(function(){return [0,0,0,0,0,0,0,0,0,0]});//Заполняем нулями строки нашей созданной таблицы с id field    

    document.body.onkeydown = function(e){ //При нажатии клавиши в теге body выбирается действие для клавиши
        var c = e.keyCode - 36;
        c>-1 && c < 5 && (rot = (c===2), dx=((c&1)*(c&2?1:-1)), down = c&4);
    };

    function isInRange(x,y,s){ //проверка или фигура в границах нашего поля 10х20
        return x>=0 && x<10 && (!s || y>=0) && y<20;
    }

    function setCellColor(x, y,color,cell){ // устанавливаем цвет клетки
        if(isInRange(x,y,1)){
            cell = fieldNode.rows[y].cells[x]; // cell = х - клетка, у-строка
            cell.style.backgroundColor = color; // устанавливем стиль backgroundColor
            cell.className=(color?"fill":""); // если цвет устанвлен задаем значение атриута class = "fill"
        }
    };

    function drawField() {
        field.forEach(function(row, y){
            row.forEach(function(c, x){
                setCellColor(x, y, c ===0?"":colors[c-1]) //?рисуем и красим в один цвет нашу фигуру
        })
    })
    };

    function calcBlock(x,y,t,r){ // выбираем фигуру??
        r=t?(r%(t>3?4:2)):0;
        return tblock[t].map(function(p){
            return [x+p[r&1?1:0]*(r===1 || r === 2?-1:1),y+p[r&1?0:1]*(r===2|| r === 3?-1:1)]
        })
    };
    function testBlock(x,y,t,r,f,s){
        return calcBlock(x,y,t,r).every(function(p){
            var x=p[0],y=p[1]; 
            return isInRange(x,y,s) && (!f || y < 0 || f[y][x] === 0) //проверяем или выбранная фигура в нашем диапазоне
        })
    };
    function checkField(n){ //проверяем или заполненная строка, если да то удаляем ее
        field = field.filter(function(row){return !row.every(function(e){
            return e!==0;});
        });
        n=0; 
        while(field.length<20)
        field.splice(0,0,[0,0,0,0,0,0,0,0,0,0]),++n;
        total+=n;
        $("level").innerHTML=(level=parseInt(total/5)+1);
        $("score").innerHTML=(score+=n*n*level*100); //считаем уровни и счет
    }
    var interval = setInterval(function(){
        (t < 0) && (rotation=irnd(4), t = irnd(6));
        if(rot || dx) 
        for(var i=0;i<(rot?6:1);++i,dx=(rot?([1,-1,2,-2,0,0][i-1]):dx))
            if(testBlock(x+dx,y,t,((rot?1:0)+rotation),field)){
                rot&&(rotation+=1),x+=dx;
                break;
            };
        dx = rot = 0, drawField();
        calcBlock(x,y,t,rotation).forEach(function(c){
            setCellColor(c[0],c[1], colors[t]);
        });
        if(!(counter++%Math.max((20-level*2), 2)) || down || y<0)
        {
            if(testBlock(x,y+1,t,rotation,field)) ++y;
            else testBlock(x,y,t,rotation,field,1)?(calcBlock(x,y,t,rotation,field).forEach(function(p){
                if(p[1]>=0)field[p[1]][p[0]] = t+1;}),checkField(), y=-3, t=-1):(clearInterval(interval), !alert('Вы проиграли! Начать заново?'),window.location.reload());
            x = (y<0)?4:x, down = 0;
            window.location.reload
        }}, 30);
})
(function(id){
    return document.getElementById(id)
}, 
function(max){
    return Math.round((Math.random()*max));
});
    var seconds = -1;
    var minutes = 0;
    var hours = 0;
function timer(){
    seconds++;
    if(minutes == 60){
        minutes = 0;
        hours++;
    }
    if(seconds == 60){
        seconds = 0;
        minutes++;
    }
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("hours").innerHTML = hours;
    setTimeout("timer()", 1000);
}