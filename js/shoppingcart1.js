// 初始化購物車為空物件
let cart = {};

// 獲取購物車按鈕和相關元素
const cartBtn = document.getElementById('cartBtn');
const popup1 = document.getElementById('popup1');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCheckout = document.getElementById('cartCheckout');
const cartClear = document.getElementById('cartClear');
const addToCartBtns = document.querySelectorAll('.addToCart');

// 彈出購物車彈窗
cartBtn.addEventListener('click', () => {
    popup1.style.display = 'block';
});

// 關閉購物車彈窗
popup1.addEventListener('click', (event) => {
    if (event.target === popup1 || event.target.classList.contains('close')) {
        popup1.style.display = 'none';
    }
});

// 刪除購物車內商品
cartItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('removeItem')) {
        const productName = event.target.dataset.product;
        delete cart[productName];
        updateCart();
    }
});

// 加入商品到購物車或更新商品數量
function addToCart(productName, price) {
    if (cart.hasOwnProperty(productName)) {
        cart[productName].quantity += 1;
    } else {
        cart[productName] = { price, quantity: 1 };
    }
    updateCart();
}

// 更新購物車顯示
function updateCart() {
    if (Object.keys(cart).length === 0) {
        cartItems.innerHTML = '購物車內並無商品';
        cartTotal.textContent = '0';
    } else {
        const cartContent = Object.keys(cart).map((productName) => {
            const item = cart[productName];
            return `
        <div>${productName} - ${item.quantity} - ${item.price}</div>
        <button class="removeItem" data-product="${productName}">刪除</button>
      `;
        }).join('');

        cartItems.innerHTML = cartContent;
        cartTotal.textContent = calculateTotalPrice();
    }
}

// 清空購物車顯示
function clearCart() {
    cart = {};
    updateCart();
}

// 更新購物車內容並計算總價格
function calculateTotalPrice() {
    let total = 0;
    Object.keys(cart).forEach((productName) => {
        const item = cart[productName];
        total += item.price * item.quantity;
    });
    return total;
}

// 更新購物車顯示狀態
function updateCartDisplay() {
    cartItemCount.textContent = Object.keys(cart).length;
}

// 結帳處理
function checkout() {
    // 在這裡添加您的結帳處理邏輯
    console.log('結帳');
    clearCart();
    popup1.style.display = 'none';
}

// 清空購物車
cartClear.addEventListener('click', () => {
    clearCart();
});

// 為每個加入購物車按鈕添加點擊事件處理器
addToCartBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const productName = button.getAttribute('data-product');
        const price = parseInt(button.getAttribute('data-price'));
        addToCart(productName, price);
    });
});

// 更新商品數量
function updateProductQuantity(productName, quantity) {
    if (cart.hasOwnProperty(productName)) {
        cart[productName].quantity = quantity;
        updateCart();
    }
}

// 初始化購物車顯示
updateCart();

// 初始化購物車按鈕數量
updateCartDisplay();
