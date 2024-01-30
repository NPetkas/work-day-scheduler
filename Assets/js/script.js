// Global variables //
var timeDisplayEl = $('#time-display');
var saveButton = $(".saveBtn");
var timeFrameEl = $(".time-block");

$(function () {

// current time and date display function //
  function displayTime() {
    var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
  }
  
  displayTime();
  setInterval(displayTime, 1000);
  
// save button event listener that captures and saves time/text values to local storage //
  saveButton.on("click", function () {
    var timeFrameEl = $(this).parent(".time-block");
    var timeId = timeFrameEl.attr("id");
    var event = timeFrameEl.find(".description").val();

    localStorage.setItem(timeId, event);
  });

// an 'each' event with function that adds a class for color coding the hour based on current time //
  timeFrameEl.each(function () {
    var time = $(this);
    var timeFrame = parseInt(time.attr("id").split("-")[1]);
    var hour = dayjs().hour();

    if (timeFrame === hour) {
      time.addClass("present");
    } else if (timeFrame < hour) {
      time.addClass("past");
    } else {
      time.addClass("future");
    }

// gets the time/text values from local storage and display on page //
    var task = localStorage.getItem(time.attr("id"));
    time.children(".description").text(task);
  });
});
