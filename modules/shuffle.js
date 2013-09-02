var shuffle = function(array){
  "use strict";
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
  while(0 !== currentIndex){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

module.exports = shuffle;
