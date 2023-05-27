// 輪播滑動換圖設置
// 座標歸零
let xDown = null;
let yDown = null;
let xUp = null;
let yUp = null;

// 輪播觸控開啟
$(document).ready(function () {
    $("#carouselExampleCaptions").carousel({
        touch: true
    });
});

// 滑鼠點擊輪播定位座標
$('#carouselExampleCaptions').on('mousedown', function (event) {
    $('#carouselExampleCaptions').carousel('pause');
    event.preventDefault();
    xDown = event.pageX;
    yDown = event.pageY;
});

// 滑鼠離開定位座標
$('#carouselExampleCaptions').on('mouseup', function (event) {
    xUp = event.pageX;
    yUp = event.pageY;

    // 設置變數為點擊座標-離開座標
    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    // if設置變數>0 輪播圖下一張 則 變數<0 輪播圖上一張
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
        event.preventDefault();
        if (xDiff > 0) {
            $('#carouselExampleCaptions').carousel('next');
        } else {
            $('#carouselExampleCaptions').carousel('prev');
        }
    }
    // 座標歸零
    xDown = null;
    yDown = null;
    xUp = null;
    yUp = null;
    $('#carouselExampleCaptions').carousel('cycle');
});

// 滑動頂點
$('#gotop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 1000);
});

// 置頂按鈕淡出淡入
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('#gotop').fadeIn();
    } else {
        $('#gotop').fadeOut();
    }
});