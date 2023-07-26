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

// 滑動出現narbar顏色
// $(window).scroll(function () {

//     if ($(this).scrollTop() == 0 && $(window).width() > 991 ) {
//         $('.navbar').css("background-color", "transparent");
//     } 
//     else if( $(window).width() < 991) {
//         $('.navbar').css("background-color", "rgba(46, 184, 103, 0.769)");
//     }
//     else {
//         $('.navbar').css("background-color", "rgb(255, 255, 255 , 0.8)");
//     }

//     });
function throttle(func, delay) {
    let timeoutId;
    return function (...args) {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                timeoutId = null;
            }, delay);
        }
    };
    
}

function adjustNavAppearance() {
    const scrollTop = $(this).scrollTop();
    const windowWidth = $(this).width();
    const navbar = $('.navbar');
    const navPage = $('.nav-page a');
    const img1 = $('img[alt="查訂單"]');
    const img2 = $('img[alt="會員登入"]');
    const img3 = $('img[alt="購物車"]');

    if (scrollTop === 0 && windowWidth > 991) {
        navbar.css("background-color", "transparent");
        navPage.css("color","rgb(255, 255, 255 , 1)");
        img1.attr('src','./images/order_paper_icon1.svg');
        img2.attr('src','./images/login_logo2_icon1.svg');
        img3.attr('src','./images/shopping_cart_icon1.svg');
    }else if (scrollTop === 0 && windowWidth < 991) {
        navbar.css("background-color", "rgba(78, 142, 105,1)");
        img1.attr('src','./images/order_paper_icon.svg');
        img2.attr('src','./images/login_logo2_icon.svg');
        img3.attr('src','./images/shopping_cart_icon.svg');
    } else if (windowWidth < 991) {
        navbar.css("background-color", "rgba(78, 142, 105,1)");
        img1.attr('src','./images/order_paper_icon.svg');
        img2.attr('src','./images/login_logo2_icon.svg');
        img3.attr('src','./images/shopping_cart_icon.svg');
    } else {
        navbar.css("background-color", "rgb(255, 255, 255 , 0.8)");
        navPage.css("color","rgb(0, 0, 0 , 1)");
        img1.attr('src','./images/order_paper_icon.svg');
        img2.attr('src','./images/login_logo2_icon.svg');
        img3.attr('src','./images/shopping_cart_icon.svg');
    }
}

const throttledAdjustNavAppearance = throttle(adjustNavAppearance, 200);

$(window).scroll(throttledAdjustNavAppearance);
$(window).resize(throttledAdjustNavAppearance);

// 滑動頂點
$('#gotop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 0);
});

// 置頂按鈕淡出淡入
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('#gotop').fadeIn();
    } else {
        $('#gotop').fadeOut();
    }
});


