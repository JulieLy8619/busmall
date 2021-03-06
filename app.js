//this creates a survey of 20+ products that a user pics and collection information about which was selected, if it was even displayed, and then produces a graph of the data.

'use strict';

//=======global variables======//
//image 1, description 1 and previous selection 1
var productLeftImage = document.getElementById('left');
var productLeftDescription = document.getElementById('leftimagedescription');
var productLeftImageArrayIndex = 0;
//image 2, description 2 and previous selection 2
var productMiddleImage = document.getElementById('middle');
var productMiddleDescription = document.getElementById('middleimagedescription');
var productMiddleImageArrayIndex = 10;
//image 3. description 3 and previous selection 3
var productRightImage = document.getElementById('right');
var productRightDescription = document.getElementById('rightimagedescription');
var productRightImageArrayIndex = 19;
//image section
var imageSection = document.getElementById('clickme');
//array of all the images
var allProductImagesArray = [];
//total clicks, for when they pick 25 times it makes a graph
var clickCounter = 0;
var voteMessagecontainer = document.getElementById('voteMessage');

var ctx = document.getElementById('productChart').getContext('2d');

//=======Construction function======//
//build the object: needs to contain the following info
var ProductImageConstructor = function (source, name) {
  this.src = source;
  this.name = name;
  this.likes = 0;
  this.appeared = 0;
  allProductImagesArray.push(this);
};

//=======Functions======//

//choose a random image, that isn't one of the other 3 and wasn't just on screen before
var randomIndexNumber = function () {
  var number = Math.floor(Math.random() * allProductImagesArray.length);
  return number;
};

var randomColor = function () {
  var r = Math.floor(Math.random() * 250);
  var g = Math.floor(Math.random() * 250);
  var b = Math.floor(Math.random() * 250);
  return ('rgba(' + r + ',' + g + ',' + b + ')');
};
//console.log(randomColor());

//check if has local data, if yes then grab data, if not the create
if (!localStorage.getItem('voteCounter')) {
  allProductImagesArray = [];
  //create the objects
  new ProductImageConstructor ('./images/bag.jpg', 'Luggage');
  new ProductImageConstructor ('./images/banana.jpg', 'Banana Slicer');
  new ProductImageConstructor ('./images/bathroom.jpg', 'Fancy Toliet Holder');
  new ProductImageConstructor ('./images/boots.jpg', 'Toesless Rain Boots');
  new ProductImageConstructor ('./images/breakfast.jpg', 'Breakfast all in one');
  new ProductImageConstructor ('./images/bubblegum.jpg', 'Meatball Gum');
  new ProductImageConstructor ('./images/chair.jpg', 'Chair');
  new ProductImageConstructor ('./images/cthulhu.jpg', 'Monster Action Figure');
  new ProductImageConstructor ('./images/dog-duck.jpg', 'Duck Lips for Dogs');
  new ProductImageConstructor ('./images/dragon.jpg', 'Dragon Meat');
  new ProductImageConstructor ('./images/pen.jpg', 'Pen Utensils');
  new ProductImageConstructor ('./images/pet-sweep.jpg', 'Feet Mops');
  new ProductImageConstructor ('./images/scissors.jpg', 'Pizza Slice Scissors');
  new ProductImageConstructor ('./images/shark.jpg', 'Shark Sleeping Bag');
  new ProductImageConstructor ('./images/sweep.png', 'Baby Onsie Mop');
  new ProductImageConstructor ('./images/tauntaun.jpg', 'Tauntaun Sleeping Bag');
  new ProductImageConstructor ('./images/unicorn.jpg', 'Unicorn Meat');
  new ProductImageConstructor ('./images/usb.gif', 'USB Tenticle');
  new ProductImageConstructor ('./images/water-can.jpg', 'Self Watering Can');
  new ProductImageConstructor ('./images/wine-glass.jpg', 'Unique Wine Glass');

  for (var t = 0; t < allProductImagesArray.length; t++) {
    localStorage.setItem('LSAppeared'+allProductImagesArray[t].name,0);
    localStorage.setItem('LSLikes'+allProductImagesArray[t].name,0);
  }

} else {
  //had to create the opbjects again otherwise it didn't have things to point to when i tried to assign it information (like appeared)
  new ProductImageConstructor ('./images/bag.jpg', 'Luggage');
  new ProductImageConstructor ('./images/banana.jpg', 'Banana Slicer');
  new ProductImageConstructor ('./images/bathroom.jpg', 'Fancy Toliet Holder');
  new ProductImageConstructor ('./images/boots.jpg', 'Toesless Rain Boots');
  new ProductImageConstructor ('./images/breakfast.jpg', 'Breakfast all in one');
  new ProductImageConstructor ('./images/bubblegum.jpg', 'Meatball Gum');
  new ProductImageConstructor ('./images/chair.jpg', 'Chair');
  new ProductImageConstructor ('./images/cthulhu.jpg', 'Monster Action Figure');
  new ProductImageConstructor ('./images/dog-duck.jpg', 'Duck Lips for Dogs');
  new ProductImageConstructor ('./images/dragon.jpg', 'Dragon Meat');
  new ProductImageConstructor ('./images/pen.jpg', 'Pen Utensils');
  new ProductImageConstructor ('./images/pet-sweep.jpg', 'Feet Mops');
  new ProductImageConstructor ('./images/scissors.jpg', 'Pizza Slice Scissors');
  new ProductImageConstructor ('./images/shark.jpg', 'Shark Sleeping Bag');
  new ProductImageConstructor ('./images/sweep.png', 'Baby Onsie Mop');
  new ProductImageConstructor ('./images/tauntaun.jpg', 'Tauntaun Sleeping Bag');
  new ProductImageConstructor ('./images/unicorn.jpg', 'Unicorn Meat');
  new ProductImageConstructor ('./images/usb.gif', 'USB Tenticle');
  new ProductImageConstructor ('./images/water-can.jpg', 'Self Watering Can');
  new ProductImageConstructor ('./images/wine-glass.jpg', 'Unique Wine Glass');

  for (var w = 0; w < allProductImagesArray.length; w++) {
    allProductImagesArray[w].appeared = JSON.parse(localStorage.getItem('LSAppeared'+allProductImagesArray[w].name));
    allProductImagesArray[w].likes = JSON.parse(localStorage.getItem('LSLikes'+allProductImagesArray[w].name));
  }
}

if (localStorage.getItem('voteCounter')) {
  clickCounter = JSON.parse(localStorage.getItem('voteCounter'));
}

//handler function
var productClickHandler = function (event) {
  if(event.target.id ==='left' || event.target.id === 'middle' || event.target.id === 'right') {
    if (event.target.id === 'left') {
      allProductImagesArray[productLeftImageArrayIndex].likes++;
      localStorage.setItem('LSLikes' + allProductImagesArray[productLeftImageArrayIndex].name, allProductImagesArray[productLeftImageArrayIndex].likes);
    } else if (event.target.id === 'middle') {
      allProductImagesArray[productMiddleImageArrayIndex].likes++;
      localStorage.setItem('LSLikes' + allProductImagesArray[productMiddleImageArrayIndex].name, allProductImagesArray[productMiddleImageArrayIndex].likes);
    } else {
      allProductImagesArray[productRightImageArrayIndex].likes++;
      localStorage.setItem('LSLikes' + allProductImagesArray[productRightImageArrayIndex].name, allProductImagesArray[productRightImageArrayIndex].likes);
    }

    allProductImagesArray[productLeftImageArrayIndex].appeared++;
    localStorage.setItem('LSAppeared' + allProductImagesArray[productLeftImageArrayIndex].name, allProductImagesArray[productLeftImageArrayIndex].appeared);
    allProductImagesArray[productMiddleImageArrayIndex].appeared++;
    localStorage.setItem('LSAppeared' + allProductImagesArray[productMiddleImageArrayIndex].name, allProductImagesArray[productMiddleImageArrayIndex].appeared);
    allProductImagesArray[productRightImageArrayIndex].appeared++;
    localStorage.setItem('LSAppeared' + allProductImagesArray[productMiddleImageArrayIndex].name, allProductImagesArray[productMiddleImageArrayIndex].appeared);

    do {
      var maybeLeft = randomIndexNumber();
    } while (maybeLeft === productLeftImageArrayIndex || maybeLeft === productMiddleImageArrayIndex || maybeLeft === productRightImageArrayIndex);

    do {
      var maybeMiddle = randomIndexNumber();
    } while (maybeMiddle === maybeLeft || maybeMiddle === productLeftImageArrayIndex || maybeMiddle === productRightImageArrayIndex || maybeMiddle === productMiddleImageArrayIndex);

    do {
      var maybeRight = randomIndexNumber();
    } while (maybeRight === maybeLeft || maybeRight === maybeMiddle || maybeRight === productLeftImageArrayIndex || maybeRight === productMiddleImageArrayIndex || maybeRight === productRightImageArrayIndex);

    productLeftImageArrayIndex = maybeLeft;
    productMiddleImageArrayIndex = maybeMiddle;
    productRightImageArrayIndex = maybeRight;

    productLeftImage.src = allProductImagesArray[productLeftImageArrayIndex].src;
    productMiddleImage.src = allProductImagesArray[productMiddleImageArrayIndex].src;
    productRightImage.src = allProductImagesArray[productRightImageArrayIndex].src;

    productLeftDescription.textContent = allProductImagesArray[productLeftImageArrayIndex].name;
    productMiddleDescription.textContent = allProductImagesArray[productMiddleImageArrayIndex].name;
    productRightDescription.textContent = allProductImagesArray[productRightImageArrayIndex].name;

    clickCounter++;
    localStorage.setItem('voteCounter',clickCounter);
    voteMessagecontainer.textContent = ('Number of votes: ' + clickCounter);
    if (clickCounter %25 === 0) {
      renderChart();
    }
  }
};

//calling the handling for click
imageSection.addEventListener('click', productClickHandler);

//handler for clear
var handlerClearCounter = function (clearEvent) {
  for (var k = 0; k < allProductImagesArray.length; k++) {
    allProductImagesArray[k].likes = 0;
    localStorage.setItem('LSLikes' + allProductImagesArray[k].name, 0);
    allProductImagesArray[k].appeared = 0;
    localStorage.setItem('LSAppeared' + allProductImagesArray[k].name, 0);

  }
  clickCounter = 0;
  voteMessagecontainer.textContent = ('Number of votes: ' + clickCounter);
  localStorage.removeItem('voteCounter');
};

//calling handler for clear
var clearVoteCount = document.getElementById('clearVoteCountButton');
clearVoteCount.addEventListener('click',handlerClearCounter);

// handler for update
var handlerUpdateTable = function(updateEvent) {
  renderChart();
};

// calling handler for update
var updateChartOnSpot = document.getElementById('updateChartButton');
updateChartOnSpot.addEventListener('click',handlerUpdateTable);

//populating chart
var renderChart = function () {
  var productNamesArray = [];
  var productLikesArray = []; //this is also known as the dataset
  var chartColors = [];
  var borderColorsArray = [];

  for (var j = 0; j <allProductImagesArray.length; j++) {
    productNamesArray.push(allProductImagesArray[j].name);
    productLikesArray.push(allProductImagesArray[j].likes);
    chartColors.push(randomColor());
    borderColorsArray.push(randomColor());
  }

  var chartData = {
    labels: productNamesArray,
    datasets: [
      {
        label: 'Number of Votes',
        data: productLikesArray,
        backgroundColor: chartColors,
        borderColor: borderColorsArray,
        borderWidth: 1
      }
    ]
  };

  var chartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }],
      xAxes: [{
        ticks: {
          autoSkip: false,
        }
      }],
    },
    animation: {
      duration: 800,
      easing: 'easeInCirc',
    },
    responsive: true,
  };

  var barChart = {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  };
  var productChart = new Chart(ctx,barChart);
};



