'use strict';

var optionOne = []; //to get page 1 ajax .
var optionTwo = []; //to get page 1 ajax .

var optionValue = []; //sort pages array by title
var optionValueTwo = []; //sort pages array by horns

var arrayImages = []; //page-1 images
var arrayImagesTwo = []; //page-2 images


//get page-1 images 
function Images(title, image_url, description, horns, keyword) {
    this.title = title;
    this.image_url = image_url;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    arrayImages.push(this);
}
//page-2 images 
function ImagesTwo(title, image_url, description, horns, keyword) {
    this.title = title;
    this.image_url = image_url;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    arrayImagesTwo.push(this);

}
// console.log(arrayImagesTwo);

//render images 1
Images.prototype.renderImages = function() {
        let temp = $('#template-img').html();
        $('.main-a').append(Mustache.render(temp, this));
    }
    //render images 2
ImagesTwo.prototype.renderImages2 = function() {
    let temp = $('#template-img').html();
    $('.main-b').append(Mustache.render(temp, this));
}


Images.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };


    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                optionOne.push(element.keyword);
                let image = new Images(element.title, element.image_url, element.description, element.horns, element.keyword);
                image.renderImages();
            });
            $.each(optionOne, function(i, el) {
                if ($.inArray(el, optionValue) === -1) optionValue.push(el);
            });

            optionValue.forEach(function(value, i) {
                $("#menu").append("<option value=" + value + ">" + value + "</option>");
            });
        });
};

ImagesTwo.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                optionTwo.push(element.keyword);
                let image = new ImagesTwo(element.title, element.image_url, element.description, element.horns, element.keyword);
                image.renderImages2();

            });
            $.each(optionTwo, function(i, el) {
                if ($.inArray(el, optionValueTwo) === -1) optionValueTwo.push(el);
            });

            optionValueTwo.forEach(function(value, i) {
                $("#menu").append("<option value=" + value + ">" + value + "</option>");
            });
        });
};

function selectKeywords() {
    $("#menu").on('change', function() {
        var name = this.options[this.selectedIndex].text;
        var newPhotoTemplate2 = $('.photo-template').clone();
        $('.main-a').html("");
        $('.main-a').append(newPhotoTemplate2);
        arrayImages.forEach(function(value, i) {
            if (name === value.keyword) {
                value.renderImages();
            }
        });
    });
}

function selectKeywordsTwo() {
    $("#menu").on('change', function() {
        var name = this.options[this.selectedIndex].text;
        var newPhotoTemplateTwo = $('#template-img').clone();
        $('.main-b').html("");
        $('.main-b').append(newPhotoTemplateTwo);
        arrayImagesTwo.forEach(function(value, i) {
            if (name === value.keyword) {
                value.renderImages2();
            }
        });
    });
}


$("document").ready(function() {

    Images.readJson();
    selectKeywords();
});

var pageName = "page-1";
$("#page-1").on("click", function() {

    $("#menu").html("");
    $(".main-b").hide();
    $(".main-a").show();
    $(".main-a").empty();
    Images.readJson();
    selectKeywords();
    pageName = "page-1";

    arrayImages = [];
});

$("#page-2").on("click", function() {

    $("#menu").html("");
    $(".main-a").hide();
    $(".main-b").show();
    $(".main-b").empty();
    ImagesTwo.readJson2();
    selectKeywordsTwo();
    pageName = "page-2";
    arrayImagesTwo = [];
    // $(".photo-template2").html("");
});

$("#title").on("click", function() {
    sortOnTitle();
});
$("#horns").on("click", function() {
    sortOnHorns();
});



function sortOnTitle() {
    if (pageName === "page-1") {
        arrayImages.sort(function(a, b) {
            if (a.title > b.title) return 1;
            if (b.title > a.title) return -1;

            return 0;
        });

        $('.main-a').html("");
        arrayImages.forEach(function(value, i) {
            value.renderImages();
        });
    }
    if (pageName === "page-2") {
        arrayImagesTwo.sort(function(a, b) {
            if (a.title > b.title) return 1;
            if (b.title > a.title) return -1;

            return 0;
        });

        $('.main-b').html("");
        arrayImagesTwo.forEach(function(value, i) {
            value.renderImages2();
        });
    }
}

function sortOnHorns() {

    if (pageName === "page-1") {
        arrayImages.sort(function(a, b) {
            if (a.horns < b.horns) return 1;
            if (b.horns < a.horns) return -1;

            return 0;
        });

        $('.main-a').html("");
        arrayImages.forEach(function(value, i) {
            value.renderImages();
        });
    }
    if (pageName === "page-2") {
        arrayImagesTwo.sort(function(a, b) {
            if (a.horns < b.horns) return 1;
            if (b.horns < a.horns) return -1;

            return 0;
        });

        $('.main-b').html("");
        arrayImagesTwo.forEach(function(value, i) {
            value.renderImages2();
        });
    }
}