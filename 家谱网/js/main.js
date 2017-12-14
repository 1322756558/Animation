//封装一个代替getElementById()的方法
function byId(id){
	return typeof(id) === "string"?document.getElementById(id):id;
}
var index=0,
    timer=null,
    dots=byId("dots").getElementsByTagName("span"),
    pics=byId("banner").getElementsByTagName('div'),
    prev=byId("prev"),
    next=byId("next"),
    len=pics.length,
    menu=byId("menu-content"),
    subMenu=byId("sub-menu"),
    xungen=byId("xungen"),
    extend=byId("extend"),
    innerBox=subMenu.getElementsByClassName("inner-box"),
    menuItems=menu.getElementsByClassName("menu-item");
    // getElementsByClassName在ie8及以下版本浏览器不能兼容

function slideImg(){
	xungen.onmouseover = function(){
		extend.style.display="block";
	}
	extend.onmouseover = function(){
		this.style.display="block";
	}
	extend.onmouseout = function(){
		this.style.display="none";
	}
	var main = byId("main");
	main.onmouseover = function(){
		//滑过清除计时器，离开继续
		if(timer)clearInterval(timer);
	}
	main.onmouseout = function(){
		timer = setInterval(function(){
			index++;
			if(index>=len){
				index=0;
			}
			//切换图片
			chengeImg();
		},2000);
	}
	//自动在main上触发鼠标离开的事件
	main.onmouseout();
	//遍历所有点击，且绑定点击事件，点击原点切换图片
	for(var d=0;d<len;d++){
		//给每一个span标签设置为d的标签一般不建议是数字
		dots[d].id=d;
		dots[d].onclick=function(){
			//js具有作用域效应，function可改变作用域，循环里的方法接收的是d的最后的值所以如果在方法里接收d的值
			//这里的解决方法是给每一个span标签设置一个为d的id利用id绑定事件
			index=this.id;
			//调用函数切换图片
			chengeImg();
		}
	}
	//下一张
	next.onclick=function(){
		index++;
		if(index>=len) index=0;
		chengeImg();
	}
	prev.onclick=function(){
		index--;
		if(index<0) index=len-1;
		chengeImg();
	}
	// 导航菜单
	// 遍历主菜单，且绑定事件
	for(var m=0;m<menuItems.length;m++){
		// 给每一个menu-item定义date-index属性，作为索引,函数会分离定义域，m无法用到后面
		menuItems[m].setAttribute("data-index",m);
		menuItems[m].onmouseover = function(){
			subMenu.className = "sub-menu";
			var idx = this.getAttribute("data-index");
			for(var n=0;n<innerBox.length;n++){
				innerBox[n].style.display="none";
				menuItems[n].style.background="none";
			}
			innerBox[idx].style.display="block";
			menuItems[idx].style.background="rgba(0,0,0,0.1)";
		}
	}

	menu.onmouseout = function(){
		subMenu.className="sub-menu hide";
	}

	subMenu.onmouseover=function(){
		this.className="sub-menu";
	}

	subMenu.onmouseout=function(){
		this.className="sub-menu hide";
	}
}




//切换图片
function chengeImg(){
	for(var i=0;i<len;i++){
		//遍历banner下所有div及dots下所有span，将div隐藏，将span清除
		pics[i].style.display="none";
		dots[i].className="";
	}
	pics[index].style.display="block";
	dots[index].className="active";
}
slideImg();