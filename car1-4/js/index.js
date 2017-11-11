
// 入口函数
$(function(){
    
    // 初始化fullpage组件
    // 设置每一个屏幕的背景颜色
    // 设置屏幕内容的对齐方式，默认是垂直居中的，改成顶部对齐
    // 监听进入某一屏的时候，回调

    

    $('.container').fullpage({
        scrollingSpeed:1000,
        // 配置参数
        // 每一个屏幕的背景颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        // 是否显示  导航栏
        navigation:true,

        // 到达第二屏的 时候显示某些动画
        afterLoad:function(link,index){
            // index的序号是从1开始  就是当前的序号
            $('.section').eq(index-1).addClass('now');
            console.log(link);
        },
        onLeave:function(index,nextIndex,direction){
            // 第一个link是离开的页面的序号，第二个参数是，要到达的页面的序号，第三个参数是，向上滚动还是向下滚动，up或者down 
            if(index==2 && nextIndex ==3){
                $('.section').eq(index-1).addClass('leaved');
            }else if(index==3 && nextIndex ==4){
                $('.section').eq(index-1).addClass('leaved');
        }
    }
    })

    
})