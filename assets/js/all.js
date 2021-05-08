const addProduct = document.querySelector('#addProduct');
const productList = document.querySelector('#productList');
const clearAll = document.querySelector('#clearAll');

const title = document.querySelector('#title');
const originPrice = document.querySelector('#originPrice');
const price = document.querySelector('#price');
const productNum = document.querySelector('#productNum');

let productData = [];
let inputData = {};

addProduct.addEventListener('click', userInput);
clearAll.addEventListener('click', clearAllProduct);
productList.addEventListener('click', productBtn);

// 取得產品資料
function userInput() {
    // 檢查資料格式
    if (title.value == '' || isNaN(parseInt(originPrice.value)) || isNaN(parseInt(price.value)) == isNaN) {
        alert('請輸入正確格式');
        return;
    }
    // 創建單筆資料
    let id = Math.floor(Date.now());
    let is_enabled = false;
    inputData = {
        title: title.value,
        originPrice: originPrice.value,
        price: price.value,
        id,
        is_enabled
    };
    // 將單筆資料push進productData陣列
    productData.push(inputData);
    // 將輸入的資料清除
    title.value = '';
    originPrice.value = '';
    price.value = '';
    // 執行渲染畫面
    renderProduct();
}

// 產品列表按鈕判斷(刪除單筆資料 或改變 產品狀態)
function productBtn(e){
    if (e.target.nodeName == 'BUTTON') {
        productData.forEach(function (item, index) {
            if (e.target.dataset.id == item.id) {
                productData.splice(index, 1);
                return;
            }
        });
    } else if(e.target.nodeName == 'INPUT'){
        productData.forEach(function (item, index) {
            if (e.target.dataset.id == item.id) {
                item.is_enabled = !item.is_enabled;
                return;
            }
        });
    }
    renderProduct();
}

// 清除所有產品
function clearAllProduct() {
    productData = [];
    // 重新渲染畫面
    renderProduct();
}

// 渲染畫面
function renderProduct() {
    let str = '';
    // 將陣列資料依序處理
    productData.forEach(function (item) {
        str += `<tr>
        <th scope="row">${item.title}</th>
        <td>${item.originPrice}</td>
        <td>${item.price}</td>
        <td><div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" id="is_enabled" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
        <label class="form-check-label" for="is_enabled">${item.is_enabled ? '啟用' : '未啟用'}</label>
      </div></td>
        <td><button type="button" class="btn btn-sm btn-danger" data-id="${item.id}"> 刪除 </button></td>
      </tr>`
    });
    // htmlDom
    productList.innerHTML = str;
    // 幾筆資料
    productNum.textContent = `目前有 ${productData.length} 項產品`
}