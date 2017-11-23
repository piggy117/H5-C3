/*1. 移动端为什么不用jquery */
/*2. jquery特点：兼容性特别好，对IE一类浏览器做了兼容处理，更多的代码去做这些事情，体积会增大*/
/*3. 移动端浏览器都是高版本浏览器，没有IE，不需要处理这样的兼容问题，如果用了其实会造成页面加载变慢*/
/*4. 最后选择不用，使用H5的方式来解决，或者使用比jquery更轻量的库 zepto.js */
/*5. $(function () {}); 等页面HTML文档加载完成 */
/*6. 等页面所有资源加载完成 html js css img ... */
window.onload = function () {
    /*搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
};
var search = function () {
    /*1.默认位置在顶部显示 透明度0*/
    /*2.在轮播图位置滑动的时候  透明度需要改变（下滚动的越多透明度就越大）*/
    /*3.在轮播图下面的区域滚动的时候  透明度保持不变*/

    var searchBox = document.querySelector('.jd_search_box');

    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;

    /*监听页面滚动事件*/
    window.onscroll = function () {
        /*获取页面卷曲的距离*/
        var top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        console.log(top);
        var opacity = 0;
        if (top < height) {
            /*轮播图内*/
            opacity = top / height * 0.85;
        } else {
            opacity = 0.85;
        }
        /*设置给搜索容器*/
        searchBox.style.background = 'rgba(201,21,35,' + opacity + ')';
    }


};
var banner = function () {
    /*1. 需要自动轮播图  无缝轮播 无缝滑动  （定时器，过渡，转换，判断索引）*/
    /*2. 点随着轮播轮播改变 （判断索引，类操作classList）*/
    /*3. 能随着手指来回的滑动 （touch相关事件）*/
    /*4. 滑动的时候如果距离不足  吸附效果 （过渡）*/
    /*5. 滑动的时候如果距离足够  图片切换 下一张  上一张 （过渡）*/

    /*获取操作的元素*/
    var banner = document.querySelector('.jd_banner');
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    var points = pointBox.querySelectorAll('li');

    /*注意：在移动端开发js功能的也需要考虑兼容webkit内核浏览器*/
    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    };

    /*核心索引*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        /*加过渡*/
        addTransition();
        /*设置图片容器的定位*/
        setTranslateX(-index * width);
    }, 3000);
    /*等动画结束之后再去判断索引 动画才是连贯的 */
    imageBox.addEventListener('transitionend', function () {
        /*自动轮播图的时候无缝处理*/
        /*左滑动过程当前保证图片的左右两侧都有图片*/
        if (index >= 9) {
            /*瞬间定位到第一张*/
            index = 1;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index * width);
        }
        /*右滑动过程当前保证图片的左右两侧都有图片*/
        else if (index <= 0) {
            /*瞬间定位到第八张*/
            index = 8;
            /*清除过渡*/
            removeTransition();
            /*定位*/
            setTranslateX(-index * width);
        }
        /*index 取值范围  1-8 */
        /*等轮播动画执行完 再来改变点的样式*/
        setPoint();
    });

    var setPoint = function () {
        /*设置当前样式*/
        /*index 取值范围  1-8 */
        /*对应点的所有  0-7 */
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index - 1].classList.add('now');
    }

    /*监听触摸事件*/
    /*为了程序的严谨 轮播图一定是滑动后*/
    var isMove = false;
    var startX = 0;
    var distanceX = 0;
    imageBox.addEventListener('touchstart', function (e) {
        /*开始触摸的时候 X的坐标*/
        startX = e.touches[0].clientX;
        /*清除定时器*/
        clearInterval(timer);
    });
    imageBox.addEventListener('touchmove', function (e) {

        /*可能会去做浏览器默认行为  切换浏览器记录*/
        e.preventDefault();

        isMove = true;
        /*滑动过程的时候 X的坐标*/
        var moveX = e.touches[0].clientX;
        /*计算位置的改变 */
        distanceX = moveX - startX; //有正负  右滑的时候是正  左滑的时候是负
        /*滑动：随着手指的移动目标一块移动*/
        /*清除过渡*/
        removeTransition();
        /*做定位 在原来的定位之上 加上 位置改变*/
        var translateX = -index * width + distanceX;
        setTranslateX(translateX);
    });
    imageBox.addEventListener('touchend', function (e) {
        /*4,5功能滑动结束实现*/
        if (isMove) {
            /*移动的距离 以轮播图宽度的1/3 参考*/
            if (Math.abs(distanceX) < width / 3) {
                /*吸附*/
                /*以动画的形式变回原来的定位*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*切换*/
                if (distanceX > 0) {
                    /*右滑*/
                    /*上一张*/
                    index--;
                } else {
                    /*左滑*/
                    /*下一张*/
                    index++;
                }
                /*动画的形式切换*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
        ;
        /*重要操作：重置记录参数*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*重新开启定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*设置图片容器的定位*/
            setTranslateX(-index * width);
        }, 3000);
    });

};
var downTime = function () {
    /*假设倒计时时间 3小时*/
    var time = 3 * 60 * 60;
    /*每一秒重新渲染计时的元素*/
    var spans = document.querySelectorAll('.sk_time span');
    var timer = setInterval(function () {
        time--;
        /*格式化*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = Math.floor(time % 60);
        /*放进去*/
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        if(time <=0){
            clearInterval(timer);
        }
    }, 1000);
};