(function(window){
    // 思路
// 1.创建指定参数的html的字符串
// 2.绑定对应事件
// 3.事件触发重新执行此函数
    function creatPage(total,after,before,current,container) {
//添加页面组件
        // 参数修正
        var total=parseInt(total),after=parseInt(after),before=parseInt(before),
            current=parseInt(current),page,i,afterpage,beforepage,onebefore,oneafter,subpage;
        if(total<=0||after<=0||before<=0||current<=0){
            console.log("请传入正确的参数");
            return;
        }
        page='<ul class="joepage_ul">';
        //判断当前是否是第一页
        page+=(current===1?('<li class="joepage_first_li"><a class="disabled joe" data-page="1">首页</a></li>' +
        '<li class="joepage_prev_li"><a class="disabled joe" data-page="'+(current-1)+'">上一页</a></li>'):
            ('<li class="joepage_first_li"><a href="#1" data-page="1" class="joe">首页</a></li>' +
            '<li class="joepage_prev_li"><a href="#'+(current-1)+'" class="joe" data-page="'+(current-1)+'">上一页</a></li>'));
        //current前的页
        beforepage=current-before;afterpage=current+after
        //以下判断为优化组件
        if(beforepage<=0){
            onebefore=beforepage;
            beforepage=1;
            subpage=Math.abs(onebefore-beforepage);
            afterpage+=subpage;
        }
        if(afterpage>total){
            oneafter=afterpage;
            afterpage=total;
            subpage=oneafter-afterpage;
            beforepage-=subpage;
        }
        for (i = beforepage;i<current;i++) {
            page+='<li><a href="#'+i+'" class="joe" data-page="'+i+'">'+i+'</a></li>';
        }
        //current页
        page+='<li><a class="current joe">'+current+'</a></li>';
//		//current后的页
        for (i = current+1; i<afterpage+1;i++) {
            page+='<li><a href="#'+i+'" class="joe" data-page="'+i+'">'+i+'</a></li>';
        }
        //判断当前是否是最后一页
        page+=(current===total?'<li class="joepage_next_li"><a class="disabled joe">下一页</a></li>'+
        '<li class="joepage_last_li"><a class="disabled joe">尾页</a></li>':
        '<li class="joepage_next_li"><a href="#'+(current+1)+'" class="joe" data-page="'+(current+1)+'">下一页</a></li>' +
        '<li class="joepage_last_li"><a href="#'+total+'" class="joe" data-page="'+total+'">尾页</a></li>');
        page+='</ul>';
        $(container).html(page);
        //绑定事件
        $(".joepage_ul").on("click",".joe",function(){
            var current=this.dataset["page"];
            if(current!=null){
                creatPage(total,after,before,current,container);
            }
        })
    }
    window.creatPage=creatPage;
})(window);