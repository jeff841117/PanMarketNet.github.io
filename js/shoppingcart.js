// 初始化購物車為空物件
let cart = {};

// 獲取購物車按鈕和相關元素
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const addToCartBtns = document.getElementsByClassName('add-to-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const checkoutBtn = document.getElementById('checkout-btn');
const cartItemsElement = document.getElementById('cart-items');

// 彈出購物車彈窗
cartBtn.addEventListener('click', () => {
    updateCart();
    cartOverlay.style.display = 'block';
    setTimeout(() => {
        cartOverlay.classList.add('cart-open');
    }, 50);
});

// 關閉購物車彈窗
cartOverlay.addEventListener('click', (event) => {
    if (event.target === cartOverlay || event.target === closeCartBtn) {
        cartOverlay.classList.remove('cart-open');
        setTimeout(() => {
            cartOverlay.style.display = 'none';
        }, 300);
    }
});

// 刪除購物車內商品
function removeFromCart(productName) {
    delete cart[productName];
    updateCart();
    
}

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
    let total = 0;

    // 清空購物車顯示
    cartItemsElement.innerHTML = '';

    // 更新購物車內容並計算總價格
    Object.keys(cart).forEach((productName) => {
        const { price, quantity } = cart[productName];
        cartItemsElement.innerHTML += `
            <li>
                ${productName} - 價格：$${price} - 數量：
                <input type="number" value="${quantity}" min="1" onchange="updateQuantity('${productName}', this.value)">
                - 金額：$${price * quantity}
                <button class="remove-btn" onclick="removeFromCart('${productName}')">刪除</button>
            </li>
        `;
        total += price * quantity;
    });

    // 更新總價格
    document.getElementById('total').innerText = `總價格：$${total}`;

    // 更新購物車顯示狀態
    if (Object.keys(cart).length === 0) {
        cartItemsElement.innerHTML = '<li>購物車中尚未新增商品</li>';
        document.getElementById('total').innerText = `總價格：$0`;
    }
}

// 結帳處理
checkoutBtn.addEventListener('click', () => {
    // 在這裡添加結帳相關的程式碼，例如將購物車內容發送到後端進行結帳處理
    // 在此示例中，我們將僅顯示一個簡單的彈出提示
    alert('感謝您的購買！您的訂單已經提交。');
    // 清空購物車
    cart = {};
    updateCart();
});

// 為每個加入購物車按鈕添加點擊事件處理器
// 監聽加入購物車按鈕
for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener('click', (event) => {
        event.stopPropagation(); // 阻止事件傳播，避免觸發關閉事件
        const productName = addToCartBtns[i].getAttribute('data-product');
        const price = parseInt(addToCartBtns[i].getAttribute('data-price'));
        addToCart(productName, price);
    });
}

// 更新商品數量
function updateQuantity(productName, newQuantity) {
    if (newQuantity > 0) {
        cart[productName].quantity = parseInt(newQuantity);
        updateCart();
    }
}