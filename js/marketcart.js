/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 80;
var fadeTime = 300;


/* Assign actions */
$('.payment-product-quantity input').change(function () {
    updateQuantity(this);
});

$('.payment-product-removal button').click(function () {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.payment-product').each(function () {
        subtotal += parseFloat($(this).children('.payment-product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;    /* 折扣*/
    var shipping = (subtotal > 0 ? shippingRate : 0);  /* 運費 */
    var total = subtotal - tax + shipping;

    /* Update totals display */
    $('.payment-totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed());
        $('#cart-tax').html(tax.toFixed());
        $('#cart-shipping').html(shipping.toFixed());
        $('#cart-total').html(total.toFixed());
        if (total == 0) {
            $('.payment-checkout').fadeOut(fadeTime);
        } else {
            $('.payment-checkout').fadeIn(fadeTime);
        }
        $('.payment-totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.payment-product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.payment-product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed());
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}