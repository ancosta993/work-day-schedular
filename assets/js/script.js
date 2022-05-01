// display current day
$('#currentDay').text(moment().format('dddd, MMMM Do')) ;

// initiate an array to store data in the localStorage
var data = [];
// objects will be appended in this array. 
// The properties of these objects are: time, text

// function for auditing block colors
var auditBlockColor = function(index, el){
   // get the current hour
   var currentHour = parseInt(moment().format('HH'));
   $('.row').each(function(){
      var blockTime = parseInt($(this).attr('id'));
      var diff = currentHour-blockTime;
      var block = $(this).find('.time-block');
      block.removeClass('future present past')
      if (diff>0){
         block.addClass('past');
      } else if( diff === 0){
         block.addClass('present');
      } else {
         block.addClass('future');
      }
      
   });
   
}

// Event handler for changing the text content of the time-block
$('.container').on('click','.time-block', function(){
   var text = $(this)
      .text()
      .trim();

   // create the textarea
   var textInput = $("<textarea>")
      .addClass('form-control')
      .val(text);

   $(this).replaceWith(textInput);

   textInput.trigger('focus');
});

// Event handler for moving away from the text input
$('.container').on('blur','textarea', function(){
   // get the current text input
   var text = $(this)
      .val()
      .trim();
      
   // create the div
   var textDiv = $("<div>")
      .addClass('col-10 time-block')
      .text(text);

   // find the time status of it
   var time = $(this).closest('.row')
      .attr('id');

   if (moment().format("HH") - time > 0){
      textDiv.addClass('past');
   } else if (moment().format("HH") - time === 0){
      textDiv.addClass('present');
   } else {
      textDiv.addClass('future');
   }

   $(this).replaceWith(textDiv);

});

// check/change the color every half an hour.
setInterval(auditBlockColor(), 1000 * 1800);
