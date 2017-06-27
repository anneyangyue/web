var canvas=document.getElementById("canvas");
var cxt=canvas.getContext("2d");

//获取工具按钮的标签
//获取画笔标签
var Brush=document.getElementById("means_brush");
//获取橡皮标签
var Eraser=document.getElementById("means_eraser");
//获取油漆桶标签
var Paint=document.getElementById("means_paint");
//获取吸管标签
var Straw=document.getElementById("means_straw");
//获取文本标签
var Text=document.getElementById("means_text");
//获取放大镜标签
var Magnifier=document.getElementById("means_magnifier");

//获取形状按钮的标签
var Line=document.getElementById("shape_line");
var Arc=document.getElementById("shape_arc");
var Rect=document.getElementById("shape_rect");
var Poly=document.getElementById("shape_poly");
var Arcfill=document.getElementById("shape_arcfill");
var Rectfill=document.getElementById("shape_rectfill");

//获取线宽按钮
var Line_1=document.getElementById("width_1");
var Line_3=document.getElementById("width_3");
var Line_5=document.getElementById("width_5");
var Line_8=document.getElementById("width_8");

//获取颜色按钮
var ColorRed=document.getElementById("red");
var ColorGreen=document.getElementById("green");
var ColorBlue=document.getElementById("blue");
var ColorYellow=document.getElementById("yellow");
var ColorWhite=document.getElementById("white");
var ColorBlack=document.getElementById("black");
var ColorPink=document.getElementById("pink");
var ColorPurple=document.getElementById("purple");
var ColorCyan=document.getElementById("cyan");
var ColorOrange=document.getElementById("orange");

//把12个工具和形状标签放到一个数组中
var actions=[Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,Arcfill,Rectfill];
//把4组线宽对象放到一个数组中
var width=[Line_1,Line_3,Line_5,Line_8]; 
//把10种颜色标签对象放到一个数组中
var colors=[ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,ColorPink,ColorPurple,ColorCyan,ColorOrange];

//设置初始值
//默认选中画笔工具
drawBrush(0);
//默认设置颜色
setColor(ColorRed,0);
//默认设置线宽
setLineWidth(0);

//状态设置函数
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		if(i==num){
			if(type==1){
				Arr[i].style.background="yellow";			
			}else{
				Arr[i].style.border="1px solid #fff";
			}
		}else{
			if(type==1){
					Arr[i].style.background="#ccc";			
				}else{
					Arr[i].style.border="1px solid #000";
				}	
		}
	}
}

function clearimg(){
	cxt.clearRect(0,0,880,400);
}

//列出所有的按钮对应得函数
function drawBrush(num){
	setStatus(actions,num,1);
	var flag=0;
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
		flag=1;
	}
	
	canvas.onmousemove=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		if(flag){
			cxt.lineTo(endX,endY);
			cxt.stroke();
		}
	}
			
	canvas.onmouseup=function(){
		flag=0;
	}
	
	canvas.onmouseout=function(){
		flag=0;
	}
}

var eraserFlag=0;//设置橡皮擦的状态标志位
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//canvas擦除方法 cxt.cleatRect();
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,-cxt.lineWidth*2,-cxt.lineWidth*2);
		eraserFlag=1;
	}
	canvas.onmousemove=function(){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//擦除方法
		if(eraserFlag){
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,-cxt.lineWidth*2,-cxt.lineWidth*2);
		}
	}
	canvas.onmouseup=function(){
		eraserFlag=0;
	}
	canvas.onmouseout=function(){
		eraserFlag=0;
	}
}

function drawPaint(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(){
		cxt.fillRect(0,0,880,400);
	}
	canvas.onmouseup=null;
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var strawX=evt.pageX-this.offsetLeft;
		var strawY=evt.pageY-this.offsetTop;
		//获取该坐标处的颜色信息
		//获取图像信息的方法getImageData(开始点X,开始点Y,宽度,高度)
		var obj=cxt.getImageData(strawX,strawY,1,1);
		//alert(obj.data);
		var color="rgb("+obj.data[0]+","+obj.data[1]+","+obj.data[2]+")";
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		//颜色吸取后自动选中画笔工具
		drawBrush(0);
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var textX=evt.pageX-this.offsetLeft;
		var textY=evt.pageY-this.offsetTop;
		var usetVal=window.prompt("请在这里输入文字","");
		if(usetVal!=null){			
			cxt.fillText(usetVal,textX,textY);
		}
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawMagnifier(num){
	setStatus(actions,num,1);
	var scale=window.prompt("请输入要放大的百分比[只能是整型]","100");
	var scaleW=880*scale/100;
	var scaleH=400*scale/100;
	canvas.style.width=parseInt(scaleW)+"px";
	canvas.style.height=parseInt(scaleH)+"px";
}
function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//计算当前鼠标相对于canvas画布的距离（以canvas的左上角为0,0）
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
	}
	canvas.onmousemove=null;//注销掉其他工具注册时间
	canvas.onmouseout=null;
	canvas.onmouseup=function(evt){
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.lineTo(endX,endY);
		cxt.closePath();
		cxt.stroke();
	}
}

var arcX=0;
var arcY=0;
function drawArc(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		arcX=evt.pageX-this.offsetLeft;
		arcY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var a=endX-arcX;
		var b=endY-arcY;
		//计算半径
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove=null;//注册掉鼠标移动时间
	canvas.onmouseout=null;
}

var rectX=0;
var rectY=0;
function drawRect(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		rectX=evt.pageX-this.offsetLeft;
		rectY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		endX=evt.pageX-this.offsetLeft;
		endY=evt.pageY-this.offsetTop;
		//计算矩形的宽高
		var rectW=endX-rectX;
		var rectH=endY-rectY;
		cxt.strokeRect(rectX,rectY,rectW,rectH);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}

var polyX=0;
var polyY=0;
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		polyX=evt.pageX-this.offsetLeft;
		polyY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		//将画笔移动到右下角的顶点
		cxt.moveTo(endX,endY);
		//计算左下角的顶点坐标
		var lbX=2*polyX-endX;
		var lbY=endY;
		cxt.lineTo(lbX,lbY);
		//设置第三个顶点的坐标
		var tmpC=2*(endX-polyX);
		var tmpA=endX-polyX;
		var tmpB=Math.sqrt(tmpC*tmpC-tmpA*tmpA);
		cxt.lineTo(polyX,endY-tmpB);
		cxt.closePath();
		cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}

function drawArcfill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		arcX=evt.pageX-this.offsetLeft;
		arcY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var a=endX-arcX;
		var b=endY-arcY;
		//计算半径
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.fill();
	}
	canvas.onmousemove=null;//注册掉鼠标移动时间
	canvas.onmouseout=null;
}

function drawRectfill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		rectX=evt.pageX-this.offsetLeft;
		rectY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		endX=evt.pageX-this.offsetLeft;
		endY=evt.pageY-this.offsetTop;
		//计算矩形的宽高
		var rectW=endX-rectX;
		var rectH=endY-rectY;
		cxt.fillRect(rectX,rectY,rectW,rectH);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}

//设置线宽函数
function setLineWidth(num){
	setStatus(width,num,1);
	switch(num){
		case 0:
			cxt.lineWidth=1;
			break;
		case 1:
			cxt.lineWidth=3;
			break;
		case 2:
			cxt.lineWidth=5;
			break;
		case 3:
			cxt.lineWidth=8;
			break;
		default:
			cxt.lineWidth=1;
	}
}

//设置颜色函数
function setColor(obj,num){
	setStatus(colors,num,0);
	//设置画笔颜色和填充颜色
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}















