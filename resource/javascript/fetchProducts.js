// This JS file is used to fill out the menu on the front page

const apiUrl = "http://localhost:8080";

/* ===== Class definitions =====*/

// Category class
class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Product {
    constructor(id, title, ingredients, imagePath, price) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        this.imagePath = imagePath;
        this.price = price;
    }
}



/* ===== Get HTML elements =====*/
// The clickable category list that appears on the left side
const categoryList = document.getElementById("categoryList");
const menu = document.getElementById("menu");

/* ===== Select categories =====*/
// This empty array will hold all categories
const categories = [];

// Fetch categories from REST API
async function fetchCategories() {
    try {
            const response = await fetch(apiUrl + "/categories");

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
}

fetchCategories().then(function(result) {
    result.forEach(element => {
        categories.push(new Category(
            element.id,
            element.name
        ));
    })
});


/* ===== Select products =====*/

// Fetch products from REST API
async function fetchProducts(catId) {
    try {
            const response = await fetch(apiUrl + "/products/" + catId);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Error:', error.message);
        }
}



/* ===== Instruction to be ran at page load =====*/
window.addEventListener('load', function() {
    // Populate left-hand menu with categories
    categories.forEach(element => {
        let listItem = document.createElement("li");
        let link = document.createElement("a");

        link.setAttribute("href", `#${element.name}`);
        link.innerHTML = element.name;

        listItem.setAttribute("class", "list-group-item");
        listItem.appendChild(link);

        categoryList.appendChild(listItem);
    });

    // Fetch product list for each category
    categories.forEach(element => {

        // Create a new menu section for current category //

        let header = document.createElement("h4");
        header.setAttribute("id", element.name);
        header.innerHTML = element.name;

        menu.appendChild(header);

        // Prepare for product list

        let dishList = document.createElement("div");
        dishList.setAttribute("class", "dish-list");

        let tableResponsive = document.createElement("div");
        tableResponsive.setAttribute("class", "table-responsive");

        let table = document.createElement("table");
        table.setAttribute("class", "table");

        let tbody = document.createElement("tbody");

        menu.appendChild(dishList);
        dishList.appendChild(tableResponsive);
        tableResponsive.appendChild(table);
        table.appendChild(tbody);

        // Fetch products and fill list
        fetchProducts(element.id).then(prod => {
           return prod;
        }).then(prodList => {
            prodList.forEach(item => {
                let tr = document.createElement("tr");
                tr.setAttribute("class", "dish-row");
                tr.setAttribute("data-name", item.title);
                tr.setAttribute("data-price", item.price);
                tr.setAttribute("data-image", item.imagePath);

                let tdId = document.createElement("td");
                tdId.innerHTML = item.id;
                let tdTitle = document.createElement("td");
                tdTitle.innerHTML = item.title;
                let tdPrice = document.createElement("td");
                tdPrice.innerHTML = item.price + ",-";
                let tdDesc = document.createElement("td");
                tdDesc.innerHTML = item.ingredients;

                tbody.appendChild(tr);
                tr.appendChild(tdId);
                tr.appendChild(tdTitle);
                tr.appendChild(tdDesc);
                tr.appendChild(tdPrice);
            });

            var $dishPopup = $('#dishPopup');

            $('.dish-row').click(function (e) {
                var dishName = $(this).data('name');
                var dishPrice = parseFloat($(this).data('price'));
                //var imagePath = $(this).data('image');

                $('#cart').append('<li class="list-group-item" data-price="' + dishPrice + '">' + dishName + ' ' + 
                    dishPrice.toFixed(2) + ',-' + '<img src="https://static.vecteezy.com/system/resources/previews/000/630/479/non_2x/vector-trash-can-icon-symbol-illustration.jpg" class="remove-icon float-right" alt="Remove"></li>');

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
        })

    });
});