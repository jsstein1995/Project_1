console.log("hello")

// global variables
numArray = [];

var APIKey = "PuomHh8yRq8TRNyZHPNAaEW8s5H5dSuKDkAMsQWU";

// Here we are building the URL we need to query the database


// var queryURL = "https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=" + APIKey;

// https://api.nal.usda.gov/ndb/list?format=json&lt=f&sort=n&api_key=DEMO_KEY
// Here we run our AJAX call to the NSDA API

function foodSearch() {
    $("#button-addon2").on('click', function (event) {
        event.preventDefault();

        var input = $("#foodItem").val().trim();
        var queryURL = "https://api.nal.usda.gov/ndb/search/?format=json&q=" + input + "&sort=r&max=10&ds=Standard Reference&offset=0&api_key=" + APIKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            // We store all of the retrieved data inside of an object called "response"
            .then(function (response) {

                // Log the queryURL
                console.log(queryURL);
                console.log(response);
                $('.foodDiv').empty();
                var foodList = response.list.item;
                // Log the resulting object
                for (var i = 0; i < foodList.length; i++) {

                    var ndbno = response.list.item[i].ndbno;
                    console.log(input);

                    var newDiv = $('<div>').addClass("foodContainerDiv");
                    var foodDiv = $('<div>').addClass("foodDiv").addClass("clickable");
                    foodDiv.attr("data-foodId", ndbno);
                    $('#results').append(foodDiv);
                    foodDiv.text(response.list.item[i].name);
                    console.log(ndbno);

                }
            });
    })

}
foodSearch();

$(document).on('click', '.clickable', 'total()', function (event) {
    event.preventDefault();
    $(this).removeClass('clickable');

    // gets the value from the data-foodId attribute of the item that was clicked 
    console.log($(this).attr('data-foodid'))

    var foodId = $(this).attr('data-foodid')
    var nutritionqueryURL = "https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=PuomHh8yRq8TRNyZHPNAaEW8s5H5dSuKDkAMsQWU&ndbno=" + foodId + "&nutrients=205&nutrients=204&nutrients=208&nutrients=269";
    // https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=DEMO_KEY&nutrients=205&nutrients=204&nutrients=208&nutrients=269&ndbno=01009
    var self = $(this);

    $.ajax({
        url: nutritionqueryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            var calories = response.report.foods[0].nutrients[0].value;
            var measure = response.report.foods[0].measure;
            console.log(response.report.foods[0].measure);
            console.log(calories);

            var calDiv = $('<span>')
            var containerDiv = $('<div>').addClass("calDiv");
            containerDiv.append(calDiv);
            var xDiv = $('<span class="delete"> <i class="fa fa-trash" aria-hidden="true"></i> </span></div>');
            containerDiv.append(xDiv);
            $("#calories").append(containerDiv);
            calDiv.text(calories);

            self.append(" " + measure + " ");
            self.append("kcal= " + calories);


            calories = parseInt(calories);
            numArray.push(calories);
            console.log(numArray);

            var sum = numArray.reduce(add);

            function add(accumulator, a) {
                return accumulator + a;
            }
            console.log(sum);
            $("#total").empty();
            var totalDiv = $('<span>');
            var totalContainer = $('<div>').addClass("totalDiv");
            totalContainer.append(totalDiv);
            $("#total").append(totalContainer);
            totalDiv.text('Total calories=' + ' ' + sum);
        });

});

$(document).on('click', '.delete', function () {
    $(this).parent().remove();

    // FIX: adjust new total

})


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
});

// Or with jQuery

$('.dropdown-trigger').dropdown();


