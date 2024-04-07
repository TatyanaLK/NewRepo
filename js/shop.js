var cart = {}; // корзина

$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    // загружаем на страницу товары
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data) {
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['price'] + ' руб.</p>';
            out += '<p>Бренд: ' + data[key]['brand']+ '</p>';
            out += '<p>Объём: ' + data[key]['volume'] + '</p>';
            out += '<p>Вес: ' + data[key]['weight'] + '</p>';
            out += '<p>Страна-производитель: ' + data[key]['country'] + '</p>';
            out += '<img src="' + data[key].picture + ' " height = "270px">';
            out += '<button class="add-to-cart" data-article="' + key + '">Купить</button>';
            out += '</div>';
        } 
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}

function addToCart() {
    // добавляем товар в корзину
    var article = $(this).attr('data-article');
    if (cart[article] != undefined) {
        cart[article] ++;
    }
    else {
        cart[article] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    //console.log(cart);
    showMiniCart();
}

function checkCart() {
    // проверка наличия товаров в корзине
    if ( localStorage.getItem('cart') != null) {
        cart = JSON.parse (localStorage.getItem('cart'));
    }
}

function showMiniCart() {
    // вывод на экран содержимого корзины
    var out = '';
    for (var w in cart) {
        out += w + ' === ' + cart[w] + '<br>';
    }
    out += '<br><a href="cart.html">Корзина</a>';
    $('#mini-cart').html(out);
}
