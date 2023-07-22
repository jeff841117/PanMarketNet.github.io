// 定義一個函數來清除表單資料
function clearForm() {
    document.getElementById('item-form').reset();
    document.getElementById('item-priceReduction').readOnly = true;
}

// 定義一個函數來填充表單資料
function fillForm(item) {
    document.getElementById('item-picture').value = item.querySelector('img').src;
    document.getElementById('item-name').value = item.cells[2].textContent;
    var categories = item.cells[3].textContent.split('/');
    document.getElementById('item-popular').checked = categories.includes('熱門商品');
    document.getElementById('item-new').checked = categories.includes('最新上架');
    document.getElementById('item-fresh').checked = categories.includes('生鮮現貨');
    var select = document.getElementById('item-state');
    for (var i = 0; i < select.options.length; i++){
        if (select.options[i].text === item.cells[4].textContent){
            select.selectedIndex = i;
            break;
        }
    }
    document.getElementById('item-quantity').value = item.cells[5].textContent;
    document.getElementById('item-price').value = item.cells[6].textContent;
    document.getElementById('item-label').checked = false;
    document.getElementById('item-priceReduction').readOnly = true;
    document.getElementById('item-priceReduction').value = '';
}

// 修改表單提交的事件處理函數
document.getElementById("item-form").addEventListener("submit", function(event){
    // 略...
    var editButton = newRow.querySelector('.button-edit');
    editButton.addEventListener('click', function(event){
        event.preventDefault();
        fillForm(newRow);
    });
    var deleteButton = newRow.querySelector('.button-delete');
    deleteButton.addEventListener('click', function(event){
        event.preventDefault();
        tbody.removeChild(newRow);
    });
    clearForm();
});

document.getElementById("item-form").addEventListener("submit", function(event){
    event.preventDefault(); // Prevent form from submitting normally

    var tbody = document.querySelector('tbody');
    var itemPicture = document.getElementById('item-picture').value;
    var itemName = document.getElementById('item-name').value;
    var itemCategories = [];
    if (document.getElementById('item-popular').checked) itemCategories.push('熱門商品');
    if (document.getElementById('item-new').checked) itemCategories.push('最新上架');
    if (document.getElementById('item-fresh').checked) itemCategories.push('生鮮現貨');
    var itemState = document.getElementById('item-state').options[document.getElementById('item-state').selectedIndex].text;
    var itemQuantity = document.getElementById('item-quantity').value;
    var itemPrice = document.getElementById('item-priceReduction').checked ? document.getElementById('item-priceReduction').value : document.getElementById('item-price').value;

    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <th scope="row"><input type="checkbox" id="" name=""></th>
        <td><a class="" href="#"><img src="${itemPicture}" alt=""></a></td>
        <td>${itemName}</td>
        <td>${itemCategories.join('/')}</td>
        <td>${itemState}</td>
        <td>${itemQuantity}</td>
        <td>${itemPrice}</td>
        <td>0</td>
        <td>
            <a class="button-operate" href="#">編輯</a><br>
            <a class="button-operate" href="#">刪除</a>
        </td>
    `;
    tbody.appendChild(newRow);
});

document.getElementById('item-label').addEventListener('change', function(){
    var priceReductionInput = document.getElementById('item-priceReduction');
    priceReductionInput.readOnly = !this.checked;
});

document.getElementById('item-priceReduction').addEventListener('input', function(){
    var itemPrice = document.getElementById('item-price').value;
    if (this.value > itemPrice){
        alert('優惠價格不能高於商品價格');
        this.value = itemPrice;
    }
});

// 添加點擊事件處理函數給 '新增商品' 按鈕
document.getElementById('button-add').addEventListener('click', function(event){
    event.preventDefault();
    clearForm();
    // 打開模態框
    document.getElementById('myModal').style.display = "block";
});