var cart={}; // корзина

$.getJSON('goods.json', function(data) {
    var goods = data; // все товары
    checkCart();
    showCart();
    
    function showCart() {
        // вывод товаров в корзине на страницу
        var out = '<a href="index.html">Главная страница</a><br>';
        if ($.isEmptyObject(cart)) {
           out += 'Корзина пуста. Добавьте товар в корзину';
           $('#my-cart').html(out);
        }
        else 
        {   for (var key in cart) {
                out += '<button class="delete" data-article="' + key + '">x</button>';
                out += '<img src="' + goods[key].picture + '" height="50px">';
                out += goods[key].name;
                out += '<button class="minus" data-article="' + key + '">-</button>';
                out += cart[key];
                out += '<button class="plus" data-article="' + key + '">+</button>';
                out += cart[key] * goods[key].price + ' руб.';
                out += '<br>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }
    
    function plusGoods() {
        var article = $(this).attr('data-article');
        cart[article] ++ ;
        saveCartToLS();
        showCart();
    }
    
    function minusGoods() {
        var article = $(this).attr('data-article');
        if (cart[article] > 1) cart[article] -- ;
        else delete cart[article];
        saveCartToLS();
        showCart();
    }
    
    function deleteGoods() {
        var article = $(this).attr('data-article');
        delete cart[article];
        saveCartToLS();
        showCart();
    }
});

function checkCart() {
    // проверка наличия товаров в корзине
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    // сохранение корзины в LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart))
}

