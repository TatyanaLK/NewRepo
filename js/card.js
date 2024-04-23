
var hash; // хеш-тег
var cart = {}; // корзина

function showCard() {
    // вывод карточки товара
    hash = window.location.hash.substring(1);
    
    $.getJSON('goods.json', function (data) {
        var out = '';
        if (data[hash] === undefined) {
            out = 'Товар не найден!';
            $('.card-name').html(out);
            return;
        }
        out = data[hash].name;
        $('.card-name').html(out);
        
        // выводим картинки
        out = '';
        for (var ii in data[hash].picture) {
            out += `<img class="card-pic" src="images/${data[hash].picture[ii]} " alt="">`;    
        }
        $('.card-img').html(out);
        
        out = data[hash].price + ' руб.';
        $('.card-price').html(out);
        out = data[hash].type;
        $('.card-type').html(out);
        out = data[hash].brand;
        $('.card-brand').html(out);
        out = data[hash].volume;
        $('.card-volume').html(out);
        out = data[hash].weight;
        $('.card-weight').html(out);
        out = data[hash].country;
        $('.card-country').html(out);
        out = data[hash].description;
        $('.card-description').html(out);
        out = data[hash].ingredients;
        $('.card-ingredients').html(out);
        out = data[hash].application;
        $('.card-application').html(out);
        
        $('.card-to-cart').on('click', cardToCart);
    });
}

function cardToCart() {
    // Добавляем товар в корзину
    if (cart[hash] == undefined) {
        cart[hash] = 1; // если в корзине нет товара
    }
    else {
        cart[hash] ++;
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

$(document).ready(function () {
    showCard();
    loadCart();
});
