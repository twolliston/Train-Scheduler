// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new Train - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. ?? Create a way to calculate the months worked. Using difference between start and current time. ??
//    ?? Then use moment.js formatting to set difference in months. ??
// 5. ?? Calculate Total billed ??

// Hide success message
$('#success').hide();

//This function displays success message
function successMessage() {
    $('#success').slideDown(1000);
    $('#success').delay(3000);
    $('#success').slideUp(1000);
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
  $("#add-train-btn").on("click", function(event) {
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
    console.log(newTrain .name);
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
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainFirstTime = childSnapshot.val().firsttime;
    var trainFrequency = childSnapshot.val().frequency;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirstTime);
    console.log(trainFrequency);
  
    // perform Prettify here
    
  
  
    // Perform Calculate here
   
  
    // Create the new row
  
  
    // Append the new row to the table here
   

  });


  
