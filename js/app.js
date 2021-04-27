'use strict';
let selectElements = [];
let all = [];
let currentPage = '1';
let currentSort = 'default';

// the constructor Horn for handling data coming from the AJAX file
const Horn = function(obj) {
  this.title = obj.title;
  this.url = obj.image_url;
  this.horns = obj.horns;
  this.description = obj.description;
  this.keyword = obj.keyword;
  all.push(this);
};

// Prototype to render the Data one by one to the html file
Horn.prototype.render = function () {
  let template = $('#photo-template').html();
  let rendering = Mustache.render(template,this);
  $('main').append(rendering);
};


// Render the Date when Entering the page for the first time
$.ajax('data/page-1.json') .then(renderData);

// Render data from the AJAX file directly
function renderData(data) {
  selectElements = [];
  data.forEach(obj => {
    if(!selectElements.includes(obj.keyword)) {selectElements.push(obj.keyword);}
    new Horn(obj);
  });
  renderTheAll();
  generateTheList();
}


// Render the "all" array, whenever called
function renderTheAll() {
  all.forEach(objec =>{
    objec.render();
  });
}

// generate the dropdown list
function generateTheList() {
  selectElements.forEach((keyword,idx) => {
    let newOption = ` <option value="${keyword}" id = "${idx}">${keyword}</option>`;
    $('select:eq(0)').append(newOption);
  });
}

// Event listener for both the buttons, in case if the user decided to chenge the page
$('button').on('click', function() {
  let newPage = this.id;
  if(newPage === currentPage) {return true;}
  currentPage = newPage;
  $('main').empty();
  $('select:eq(0)').empty();
  $('select:eq(0)').append(`<option value="default">Filter by Keyword</option>`);
  $('select:eq(0)').prop('selectedIndex', 0).val();
  $('select:eq(1)').prop('selectedIndex', 0).val();
  currentSort = 'default';
  all = [];
  getJSONdata(newPage);
});


// change the JSON file to get data, in case of changing the page
function getJSONdata (newPage) {
  if(newPage === '1'){
    $.ajax('data/page-1.json')
      .then(renderData);
  }
  else if (newPage === '2'){
    $.ajax('data/page-2.json')
      .then(renderData);
  }
}

// Event listener for both the "select" tags, in order to start filtering
$('select').on('change', function () {
  let $newValue = $('select:eq(0)').val();
  let $newValue2 = $('select:eq(1)').val();
  let len = $('div').length;
  if($newValue2 !== currentSort) {
    currentSort = $newValue2;
    $('main').empty();
    if($newValue2 === '1') {
      all = sortByHorns(all);
      renderTheAll();
    }
    else if ($newValue2 === '2') {
      all = sortByTitle(all);
      renderTheAll();
    }
    else if ($newValue2 === 'default') {
      all = [];
      getJSONdata(currentPage);
      $('select:eq(0)').prop('selectedIndex', 0).val();
    }
  }

  //handling the (display: none) process
  for(let i = 0; i < len; i++ ){
    if ($newValue === 'default') {
      $('div').removeClass('displays');
    }
    else if($(`div h5:eq(${i})`).text() === $newValue){
      $(`div:eq(${i})`).removeClass('displays');
    }
    else if($(`div h5:eq(${i})`).text() !== $newValue){
    //   console.log($(`div h5:eq(${i})`).text());
      $(`div:eq(${i})`).addClass('displays');
    }

  }
});

// sort by Horns function
function sortByHorns (arr) {
  arr.sort((a,b)=> {
    if(a.horns > b.horns)
      return 1;
    else if ( a.horns < b.horns )
      return -1;
  });
  return arr;
}

// sort by Title function
function sortByTitle (arr) {
  arr.sort((a,b) => {
    if (a.title.toUpperCase() < b.title.toUpperCase()){
      return -1;
    }
    else if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
  });
  return arr;
}