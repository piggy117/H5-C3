
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
            }else if(index==5 && nextIndex ==6){
                $('.section').eq(index-1).addClass('leaved');
                $('.screen06').addClass('leaved');
            }else if(index==6 && nextIndex ==7){
            $('.screen07').addClass('show');
    }
    
        $('.screen07 .star img').each(function(i,item){
            $(this).css('transition-delay',i*0.5+'s');
            // 0.5  是什么意思  延迟的意思 每个0.5s 就会出现一个星星

        })

        // section  08  功能
        // 1，手 要跟着 鼠标移动，
        $('.screen08').on('mousemove',function(e){
            // 鼠标的坐标设置给手
            $(this).find('.hand').css({
                left:e.clientX+200,
                top:e.clientY-20
            });
            // 为什么手的坐标，要设置的和鼠标远那么多，是因为层叠的关系，鼠标是在  手  这个图片的上面，如果离手太近的话，那么鼠标还是在手上面，那么就点击不到btn ，那么就达不到效果，所以说，真正触碰“再来一次”的图片的是鼠标，而不是手，

        }).find('.again').on('click',function(){
            console.log(1)
            // 2,点击再来一次，充值动画跳回第一页
            // 动画是怎么样运行的
            // 加 now 类
            // 加  leaved 类
            // 加show  类
            // 加 css属性  
            //  当点击的时候，将所有的类，去掉，然后，上面就有加上了，就达到效果了
            $('.now,.leaved,.show').removeClass('now').removeClass('leaved').removeClass('show');

            // 加css属性，效果：加一个style 属性
            // 用jquery 方法，show()   fadeIn()    效果：加一个  style属性
            // 先去除，，在加上，达到效果，
            // 为什么是content 里面的style  ，是因为 从网页F12中我们可以看到，有很多style不是我们加的，那么我们只移除我们加的style属性而已
            $('.content [style]').removeAttr('style');
            // 
            // 跳回第一页
            $.fn.fullpage.moveTo(1);
        });
    },
    });

    
});