$(document).ready(function () {
    let originalData = {}; // Store original data 儲存原始資料

    // Click event for edit button 編輯按鈕的點擊事件
    $('#edit-button').on('click', function (e) {
        e.preventDefault();
        // Store original data 儲存原始資料
        originalData = {
            'edit-name': $('#edit-name').val(),
            'edit-email': $('#edit-email').val(),
            'edit-phone': $('#edit-phone').val(),
            'edit-address': $('#edit-address').val()
        };
        $('#edit_form input').prop('readonly', false);  // Make inputs editable 讓輸入欄位可編輯
        $(this).hide();  // Hide edit button 隱藏編輯按鈕
        $('#save-button, #cancel-button').show();  // Show save and cancel buttons 顯示儲存與取消按鈕
    });

    // Click event for save button 儲存按鈕的點擊事件
    $('#save-button').on('click', function (e) {
        e.preventDefault();
        $('#edit_form input').prop('readonly', true);  // Make inputs read-only 讓輸入欄位回到只讀狀態
        $('#edit-button').show();  // Show edit button 顯示編輯按鈕
        $(this).hide();  // Hide save button 隱藏儲存按鈕
        $('#cancel-button').hide();  // Hide cancel button 隱藏取消按鈕
        alert('已修改！');  // Alert the user 顯示提示信息
        // Here, you would normally send the updated data to your server 這裡，你通常會將更新的數據傳送到你的伺服器
    });

    // Click event for cancel button 取消按鈕的點擊事件
    $('#cancel-button').on('click', function (e) {
        e.preventDefault();
        // Restore original data 恢復原始資料
        $('#edit-name').val(originalData['edit-name']);
        $('#edit-email').val(originalData['edit-email']);
        $('#edit-phone').val(originalData['edit-phone']);
        $('#edit-address').val(originalData['edit-address']);
        $('#edit_form input').prop('readonly', true);  // Make inputs read-only 讓輸入欄位回到只讀狀態
        $('#edit-button').show();  // Show edit button 顯示編輯按鈕
        $(this).hide();  // Hide cancel button 隱藏取消按鈕
        $('#save-button').hide();  // Hide save button 隱藏儲存按鈕
        
    });
});
