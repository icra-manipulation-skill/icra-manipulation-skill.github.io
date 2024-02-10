var DateTime = luxon.DateTime;

// ********** CountDown Functions **********

// Set the end date for the countdown
var countDownDate = new Date("May 13, 2024 09:00:00").getTime();

// Update the countdown every 1 second
var countdownFunction = setInterval(function() {

  // Get the current date and time
  var now = new Date().getTime();

  // Find the time remaining until the countdown date
  var timeRemaining = countDownDate - now;

  // Time calculations for days, hours, minutes, and seconds
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Display the results in the corresponding elements
  document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
  document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
  document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
//   document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;
  // If the countdown is finished, write some text
  if (timeRemaining < 0) {
    clearInterval(countdownFunction);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    // document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);

// ********** End of CountDown Functions **********



function updateClock() {
    const now = new Date();
    // date
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const dateString = now.toLocaleDateString(undefined, options); // This will show date as 11/13/2019
    const timeString = now.toLocaleTimeString(); // This will show time with seconds
    document.getElementById("real-time-clock").textContent = dateString + " " + timeString;
}
setInterval(updateClock, 1000); // Update the time every second
updateClock(); // Initialize clock



function convertToLocalTimezone() {
    // Use an API to get the user's timezone based on IP
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const localTimezone = data.timezone;
            document.querySelectorAll('.time-element').forEach(elem => {
                const time = new Date(elem.textContent);
                elem.textContent = new Intl.DateTimeFormat('en-US', { timeZone: localTimezone, timeStyle: 'medium' }).format(time);
            });
        });
}

function convertToSpecifiedTimezone() {
    const specifiedTimezone = 'Asia/Tokyo'; // Replace with your desired timezone
    // console.log(specifiedTimezone);
    // Convert each time element on your page
    document.querySelectorAll('.time-element').forEach(elem => {
        const time = new Date(elem.textContent);
        elem.textContent = new Intl.DateTimeFormat('en-US', { timeZone: specifiedTimezone, timeStyle: 'medium' }).format(time);
    });
}

function selectTokyoTime() {
    updateTimeDisplay("Asia/Tokyo");
}

function selectLocalTime() {
    updateTimeDisplay(Intl.DateTimeFormat().resolvedOptions().timeZone);
}

function splitTimeRange(timeRangeString) {
    const [startTime, endTime] = timeRangeString.split(' - ');
    return [startTime, endTime];
}



function getTimezoneOffset(timeZone) {
    // Current time in UTC
    // const nowUtc = new Date();

    // // Current time in the specified timezone
    // const nowTimeZone = new Date(nowUtc.toLocaleString('en-US', { timeZone }));

    // // Calculate the offset in minutes
    // return (nowTimeZone - nowUtc) / 60000;

    // const timezone = 'Asia/Tokyo';

    // Get the current date and time in the specified timezone
    const nowInTimezone = DateTime.now().setZone(timeZone);

    // Get the offset in minutes
    const offset = nowInTimezone.offset;
    console.log(timeZone, ": ", offset);
    return offset
}

function convertSingleTime(timeString, targetTimeZone) {
    const tokyoTimeZone = "Asia/Tokyo";
    let [hour, minute] = timeString.split(':');

    const timeInTokyo = DateTime.now().setZone('Asia/Tokyo').set({ hour: hour, minute: minute });
    const timeInTargetTimeZone = timeInTokyo.setZone(targetTimeZone);
    return timeInTargetTimeZone.toFormat('hh:mm a');
}

function convertTimeRange(timeRangeString, targetTimeZone) {
    const [startTime, endTime] = splitTimeRange(timeRangeString);
    return `${convertSingleTime(startTime, targetTimeZone)} - ${convertSingleTime(endTime, targetTimeZone)}`;
}

function getCityFromTimezone(timezone) {
    // Split the timezone string on '/'
    const parts = timezone.split('/');

    // The city name is the last part of the timezone string
    // Replace underscores with spaces for city names with two words
    return parts[parts.length - 1].replace('_', ' ');
}

// Example usage within updateTimeDisplay function
function updateTimeDisplay(timeZone) {
    const timeCells = document.querySelectorAll(".time-cell");
    timeCells.forEach(cell => {
        const tokyoTime = cell.getAttribute("data-tokyo-time");
        const timeDisplay = cell.querySelector(".time-display");
        const timezoneInfo = cell.querySelector(".timezone-info");

        if (timeDisplay) {
            timeDisplay.textContent = convertTimeRange(tokyoTime, timeZone);
            console.log(timeDisplay.textContent, " data is: ", tokyoTime);
        }
        if (timezoneInfo) {
            const city = getCityFromTimezone(timeZone);
            timezoneInfo.textContent = `(${city})`;
        }

    });

    // Update time zone info
}


// TODO: Make this work
function updateScheduleStyles() {
    var currentTime = new Date(); // Get the current time

    const timeFormat = { 
        hour: '2-digit',
        minute: '2-digit',
        timeZone: "Asia/Tokyo",
        hour12: false 
    };

    currentTime = Intl.DateTimeFormat("en-US", timeFormat).format(currentTime);
    

    // Loop through each schedule row
    document.querySelectorAll('.schedule-row').forEach(function(row) {
        const data_event_time = row.getAttribute('data-event-time');
        const [start_time, end_time] = splitTimeRange(data_event_time);

        let [start_hour, start_minute] = start_time.split(':');
        let [end_hour, end_minute] = end_time.split(':');

        let startTimeValue = parseInt(start_hour + start_minute);
        let endTimeValue = parseInt(end_hour + end_minute);

        let [current_hour, current_minute] = currentTime.split(':');
        current_hour = parseInt(current_hour);
        current_minute = parseInt(current_minute);

        if (current_hour < 10) {
            current_hour = '0' + current_hour.toString();
        } else {
            current_hour = current_hour.toString();
        }

        if (current_minute < 10) {
            console.log(current_minute);
            current_minute = '0' + current_minute.toString();
        } else {
            current_minute = current_minute.toString();
        }

        let currentTimeValue = parseInt(current_hour + current_minute);
        console.log(startTimeValue, endTimeValue, currentTimeValue, startTimeValue <= currentTimeValue && currentTimeValue <= endTimeValue);
        var eventTime = new Date(data_event_time);

        // Here, you need to adjust the logic based on your event time format and duration
        // convert all time to comparable value
        if ( currentTimeValue >= startTimeValue && currentTimeValue <= endTimeValue ) {
            row.style.backgroundColor = '#ffbe989d'; // Change the color if the event is happening now
        } else {
            row.style.backgroundColor = ''; // Reset the color if the event is not happening
        }
    });
}
setInterval(updateScheduleStyles, 6000);
updateScheduleStyles();

// selectTokyoTime();
