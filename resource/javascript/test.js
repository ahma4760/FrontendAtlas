$(document).ready(function () {
    var $dishPopup = $('#dishPopup');

    $('.dish-row').click(function (e) {
        var dishName = $(this).data('name');
        var dishPrice = parseFloat($(this).data('price'));
        var dishId = $(this).data('id');

        $('#cart').append('<li class="list-group-item" data-id="' + dishId + '" data-price="' + dishPrice + '">' + dishName +
            ' - $' + dishPrice.toFixed(2) + '<img src="https://static.vecteezy.com/system/resources/previews/000/630/479/non_2x/vector-trash-can-icon-symbol-illustration.jpg" class="remove-icon float-right" alt="Remove"></li>');

        updateTotal();
    });

    $('#cart').on('click', '.remove-icon', function () {
        $(this).closest('li').remove();
        updateTotal();
    });

    function updateTotal() {
        var total = 0;
        $('#cart li').each(function () {
            total += parseFloat($(this).data('price'));
        });
        $('#total').text(total.toFixed(2));
    }

    $('.dish-row').hover(function (e) {
        var imagePath = $(this).data('image');
        $dishPopup.find('.dish-image').attr('src', imagePath);

        var topOffset = e.pageY + 10 - $(window).scrollTop();
        var leftOffset = e.pageX + 10;

        $dishPopup.css({
            top: topOffset,
            left: leftOffset
        }).show();
    }, function () {
        $dishPopup.hide();
    });

    $dishPopup.mouseleave(function () {
        $dishPopup.hide();
    });

    $(window).scroll(function () {
        $dishPopup.hide();
    });
});