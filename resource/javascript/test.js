$(document).ready(function () {
    var $dishPopup = $('#dishPopup');

    $('.dish-row').click(function (e) {
        var dishName = $(this).data('name');
        var dishPrice = parseFloat($(this).data('price'));
        var imagePath = $(this).data('image');

        $('#cart').append('<li class="list-group-item" data-price="' + dishPrice + '">' + dishName +
            ' - $' + dishPrice.toFixed(2) + '<img src="https://static.vecteezy.com/system/resources/previews/000/630/479/non_2x/vector-trash-can-icon-symbol-illustration.jpg" class="remove-icon float-right" alt="Remove"></li>');

        updateTotal();
    });

    $('#cart').on('click', '.remove-icon', function () {
        $(this).closest('li').remove();
        updateTotal();
    });

    $('#continueBtn').on('click', function () {
        alert('Continue with the order! Total: $' + $('#total').text());
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


    document.addEventListener("DOMContentLoaded", function () {
        var footer = document.querySelector(".sticky-footer");

        window.addEventListener("scroll", function () {
            // Calculate how far the user has scrolled
            var scrollPosition = window.scrollY || document.documentElement.scrollTop;

            // Calculate the maximum scroll height
            var maxScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Show or hide the footer based on scroll position
            footer.style.bottom = (scrollPosition >= maxScrollHeight) ? "-" + footer.clientHeight + "px" : "0";
        });
    });





});