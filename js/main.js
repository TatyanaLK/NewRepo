var cart = {}; // корзина
var categories = {}; // категории товара
var select_categories = {}; // выбранные категории

function goodsOut(data) {
    // вывод товаров на страницу
    var out = '';
    for (var key in data) {
        out = recordCart(out, data[key], key);
  
        readCategories(data[key].type);
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
    $('.name').on('click', loadCard);
    $('.info').on('click', loadCard);
    $('.pic').on('click', loadCard);
    $('.cost').on('click', loadCard);
    showCategories();
}

function init() {
    // читаем файл goods.json
    $.getJSON("goods.json", goodsOut);
}

function recordCart(out, datakey, key) {
    // формирование одной карточки товара
    //out += '<div class="cart">';
    //out += '<p class="name">' + data[key].name + '</p>';
    //out += '<div class="cost">Цена: ' + data[key].price + ' руб.</div>';
    //out += '<p>Бренд: ' + data[key].brand+ '</p>';
    //out += '<p>Объём: ' + data[key].volume + '</p>';
    //out += '<p>Вес: ' + data[key].weight + '</p>';
    //out += '<p>Страна-производитель: ' + data[key].country + '</p>';
    //out += '<img class="pic" src="' + data[key].picture["1"] + ' " alt="">';
    //out += '<button class="add-to-cart" data-id="'+key+'">Купить</button>';
    //out += '</div>';
    //-----------------------------------------------------------------
    out += '<div class="cart">';
    out += `<p class="name" data-id="${key}">${datakey.name}</p>`;
    out += `<div class="info" data-id="${key}">`;
    out += `<p>Бренд: ${datakey.brand}</p>`;
    out += `<p>Объём: ${datakey.volume}</p>`;
    out += `<p>${datakey.type}</p>`;
//    out += `<p>${datakey.country}</p>`;
    out += '</div>';
    out += `<img class="pic" data-id="${key}" src="images/${datakey.picture.pic1}" alt="">`;
    out += `<div class="cost" data-id="${key}">Цена: ${datakey.price} руб.</div>`;
    out += `<button class="add-to-cart" data-id="${key}">В корзину</button>`;
    out += '</div>';
    
    return out;
}

function addToCart() {
    // Добавляем товар в корзину
    var id = $(this).attr('data-id');
    
    if (cart[id] == undefined) {
        cart[id] = 1; // если в корзине нет товара
    }
    else {
        cart[id] ++;
    }
    showMiniCart();
    saveCart();
}

function saveCart() {
    // сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // содержимое корзины в строку
}

function showMiniCart() {
    // показ количества товаров в корзине
    let quantity = 0;
    for (let key in cart) {
        quantity += cart[key];
    }
    let str;
    str = quantity == 0 ? '' : ' (товаров ' + String(quantity) +')'; 
    out = '<a href="cart.html">Корзина' + str + '</a>';
    $('.mini-cart').html(out);
}

function loadCart() {
    // проверка содержимого корзины и запись в переменную cart
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

function readCategories(category) {
    // запоминание категорий товара
    let ii = -1; i = 0;
    for (let key in categories) {
        if (categories[key] == category) {
            ii = key;
        }
        i++;
    }
    if (ii == -1) {
        categories[++i] = category;
    }
}

function showCategories() {
    // вывод категорий
    var out = '<p class="cat"><input type="checkbox" name="a" value=-1 checked="checked" onclick="checkCat()">Все категории</p>';
    for (var key in categories) {
        out += '<p class="cat"><input type="checkbox" name="a" value=' + key + 
               ' onclick="checkCat()">' + categories[key] + '</p>';
    }
    $('.categories').html(out);    
}

function checkCat() {
    // определение категорий товара для вывода
    let all_checkbox = document.getElementsByName("a");
    select_categories = {};
    for (let i = 0; i < all_checkbox.length; i++) {
        if (all_checkbox[i].checked) {
            if (all_checkbox[i].value == -1) {
                select_categories = {};
                break;
            } 
            else {
                select_categories[all_checkbox[i].value] = categories[all_checkbox[i].value];
            }
        }    
    }
    // если выбраны все категории - очищаем
    if (!isEmpty(select_categories) && 
        Object.keys(select_categories).length == Object.keys(categories).length) {
        select_categories = {}; 
    }
    
    $.getJSON('goods.json', function (data) {
        var out = '';
        var zag = '';
        for (var key in data) {
            if (selCat(data[key].type)) {
                out = recordCart(out, data[key], key); 
                
                // формирование заголовка для категорий
                if (isEmpty(select_categories)) {
                    zag = 'Все категории';
                }
                else {
                    if (!zag.includes(data[key].type)) {
                        zag += (zag == '' ? '' : ', ') + data[key].type;
                    }
                }
            }    
        }
        $('.goods-out').html(out);
        $('.add-to-cart').on('click', addToCart);
        $('.selected-category').html(zag);
        $('.name').on('click', loadCard);
        $('.info').on('click', loadCard);
        $('.pic').on('click', loadCard);
        $('.cost').on('click', loadCard);
    });
}

function selCat(typeCart) {
    // входит ли товар в нужную категорию
    if (isEmpty(select_categories)) {
        return true;
    }
    var result = false;
    for (var ii in select_categories) {
        if (typeCart == select_categories[ii]) {
            result = true;
        }    
    }
    return result;
}

function isEmpty(object) {
    // проверка объекта на пустоту
    for (var key in object) 
    if (object.hasOwnProperty(key)) return false;
    return true;
}

function loadCard(){
    // вызов карточки товара
    location.href='card.html#' + $(this).attr('data-id');
}

$(document).ready(function () {
    init();
    loadCart();
});