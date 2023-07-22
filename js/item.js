document.getElementById('decrease').addEventListener('click', function() {
    let quantityInput = document.getElementById('quantity-input');
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
    }
});

document.getElementById('increase').addEventListener('click', function() {
    let quantityInput = document.getElementById('quantity-input');
    let quantity = parseInt(quantityInput.value);
    quantityInput.value = quantity + 1;
});

document.getElementById('add-to-cart').addEventListener('click', function() {
    alert('商品已加入購物車');
});

document.getElementById('purchase').addEventListener('click', function() {
    alert('購買成功，感謝您的購買！');
});
