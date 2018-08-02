// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Train - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. ?? Create a way to calculate the months worked. Using difference between start and current time. ??
//    ?? Then use moment.js formatting to set difference in months. ??
// 5. ?? Calculate Total billed ??

// Initiallize variables
var trainName = "";
var trainDestination = "";
var trainFirstTime = "";
var trainFrequency = "";
var nextTrain = "";
var tMinutesTillTrain = "";

// Hide success message
$('#success').hide();

//This function displays success message
function successMessage() {
  $('#success').slideDown(1000);
  $('#success').delay(3000);
  $('#success').slideUp(1000);
}

//This function converts from military to 12 hr am/pm 
function formatTime() {
  var formatTime = moment(nextTrain, 'HH:mm').format('hh:mm a');
  return formatTime;
}

function calculateTime() {

  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
  console.log("First Time Converted: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFrequency;
  console.log("REMAINDER: " + tRemainder);

  // Minute Until Train
  tMinutesTillTrain = trainFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
   

}



// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyC9k1euL_3lZgnx6XPakY0AHXt3rplV5Fg",
  authDomain: "train-scheduler-9ee54.firebaseapp.com",
  databaseURL: "https://train-scheduler-9ee54.firebaseio.com",
  projectId: "train-scheduler-9ee54",
  storageBucket: "train-scheduler-9ee54.appspot.com",
  messagingSenderId: "765868232941"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();


  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirstTime = $("#first-train-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();
  // trim ":" from Frequency in minutes
  if (trainFrequency.substring(0, 1) == ':') {
    trainFrequency = trainFrequency.substring(1);
  }


  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    firsttime: trainFirstTime,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firsttime);
  console.log(newTrain.frequency);

  // alert("Train successfully added");
  successMessage();



  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  trainName = childSnapshot.val().name;
  trainDestination = childSnapshot.val().destination;
  trainFirstTime = childSnapshot.val().firsttime;
  trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainFirstTime);
  console.log(trainFrequency);


  // Calculate arrival time and convert date from military time
  calculateTime();

  // perform Prettify here
  var nextTrainPretty = formatTime();
  // console.log(trainFirstTimePretty);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextTrainPretty),
    $("<td>").text(tMinutesTillTrain),
   
  );


  // Append the new row to the table
  $("#train-table > tbody").append(newRow);


});



