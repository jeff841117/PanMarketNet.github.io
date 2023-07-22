// 模擬訂單數據
const mockOrderData = [
    {
        orderNumber: "1234567890",
        date: "2023/07/17",
        itemName: "月餅",
        quantity: 1,
        shippingFee: 80,
        itemPrice: 60,
        memberName: "將姜姜",
        memberPhone: "0912345678",
        memberAddress: "台北市內湖區xx路999號99樓",
        memberNote: "試試這個備註能有多長",
        remitterName: "將姜姜",
        remitterBank: "812 台新銀行",
        remitterAccountLastFive: "12345",
        remittanceDate: "2023/07/17",
        shippingStatus: "已出貨" 
    }
    // 其他訂單數據...
];

// 展示訂單列表
mockOrderData.forEach(order => {
    const ordersList = document.getElementById('ordersList');
    const orderElement = document.createElement('div');
    orderElement.className = 'order';
    orderElement.textContent = `訂單號：${order.orderNumber} - 日期：${order.date} - 運送狀態：${order.shippingStatus}`; // 增加運送狀態
    orderElement.onclick = function() {
        const orderDetails = document.getElementById('orderDetails');
        // 如果訂單詳情已顯示，則隱藏它。否則，顯示該訂單的詳細資訊
        if (orderDetails.style.display === 'block') {
            orderDetails.style.display = 'none';
        } else {
            showOrderDetails(order);
        }
    };

    ordersList.appendChild(orderElement);
});

// 展示訂單詳細資訊
function showOrderDetails(order) {
    const orderDetails = document.getElementById('orderDetails');
    orderDetails.style.display = 'block';
    orderDetails.innerHTML = '';

    const detailsElement = document.createElement('div');
    detailsElement.className = 'order-details';
    detailsElement.innerHTML = `
        <h3>訂單號：${order.orderNumber}</h3>
        <p>商品名稱：${order.itemName}</p>
        <p>數量：${order.quantity}</p>
        <p>運費：${order.shippingFee}</p>
        <p>商品金額：${order.itemPrice}</p>
        <p>會員姓名：${order.memberName}</p>
        <p>會員手機號：${order.memberPhone}</p>
        <p>會員地址：${order.memberAddress}</p>
        <p>會員備註：${order.memberNote}</p>
        <p>匯款姓名：${order.remitterName}</p>
        <p>匯款銀行：${order.remitterBank}</p>
        <p>匯款銀行帳號後五碼：${order.remitterAccountLastFive}</p>
        <p>匯款時間：${order.remittanceDate}</p>
        <p>運送狀態：${order.shippingStatus}</p> <!-- 新增的運送狀態 -->
        <button onclick="confirmReport()">確定回報</button>
    `;

    orderDetails.appendChild(detailsElement);
}

// 確定回報的功能，這邊只做為示範，所以只是一個簡單的警告視窗
function confirmReport() {
    alert("已確定回報");
}