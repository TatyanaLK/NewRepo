
var cart = {}; // корзина

function isEmpty(object) {
    // проверка объекта на пустоту
    for (var key in object) 
    if (object.hasOwnProperty(key)) return false;
    return true;
}

function showCart() {
    // вывод корзины
    if (isEmpty(cart)) {
        $('.main-cart').html('Корзина пуста!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            
            var out = '<table>';
            var count = 0;
            var sum = 0;
            
            out += '<th></th><th></th><th>Название товара</th><th>Цена</th><th></th><th>Количество</th><th></th><th>Итого</th>';
            for (var id in cart) {
                out += '<tr>';
                out += `<td><button data-id="${id}" class="del-goods">x</button></td>`;
                out += `<td><img src="images/${goods[id].picture.pic1}"></td>`;
                out += `<td>${goods[id].name}</td>`;
                out += `<td class="rub">${goods[id].price}</td>`;
                out += `<td><button data-id="${id}" class="minus-goods">-</button></td>`;
                out += `<td class="kk">${cart[id]}</td>`;
                out += `<td><button data-id="${id}" class="plus-goods">+</button></td>`;
                out += '<td class="rub">' + cart[id] * goods[id].price + '</td>';
                out += '</tr>';
                count += cart[id];
                sum += cart[id] * goods[id].price;
            }
            out += '<td class="rub" colspan=5>К оплате</td><td class="kk">' + 
                   count + '</td><td class="rub" colspan=2>' + sum + '</td>';
            out += '</table>';
            
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
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
        showCart();
    }
    else {
        $('.main-cart').html('Корзина пуста!');
    }
    showMiniCart();
}

function delGoods() {
    // удаление товара из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
    showMiniCart();
}

function plusGoods() {
    // добавляет товар в корзину
    var id = $(this).attr('data-id');
    cart[id] ++;
    saveCart();
    showCart();
    showMiniCart();
}

function minusGoods() {
    // уменьшаем количество товара в корзине
    var id = $(this).attr('data-id');
    if (cart[id] == 1) {
        delete cart[id];
    }
    else {
        cart[id] --;
    }
    saveCart();
    showCart();
    showMiniCart();
}

function saveCart() {
    // сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // содержимое корзины в строку
}

function sendEmail() {
    // отправка заказа
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    
    if (ename != '' && email != '' && ephone != '') {
        if (!isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone": ephone,
                    "cart"  : cart
                },
                function(data) {
                    if (data == 1) {
                        alert('Заказ отправлен');
                    }
                    else {
                        alert('Произошла ошибка. Повторите заказ');    
                    }
                }
            );    
        }
        else {
            alert('Корзина пуста!');
        }
    } 
    else {
        alert('Заполните данные для заказа');
    }
}

$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail);
});
