  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA3zhK727d4ZoULQAwcNeJINe8d-OZAEHA",
    authDomain: "train-project-dad3f.firebaseapp.com",
    databaseURL: "https://train-project-dad3f.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "909907556376"
  };
  firebase.initializeApp(config);



var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

$("#submitTrain").on("click", function(){
 	
 	


	trainName = $('#trainName').val().trim();
	destination = $('#dest').val().trim();
	firstTrainTime = $('#1stTime').val().trim();
	frequency = $('#freq').val().trim();

	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrainTime: firstTrainTime,
		frequency: frequency
	}


	database.ref().push(newTrain);

		console.log(trainName);
		console.log(destination);
		console.log(firstTrainTime);
		console.log(frequency);
	
	$(".panel-body").empty();

	return false;

});


database.ref().on("child_added", function(childSnapshot, prevChildKey){
	var theTrainName = childSnapshot.val().trainName;
	var theTrainDestination = childSnapshot.val().destination;
	//var theFirstTrainTime = childSnapshot.val().firstTrainTime;
	var theTrainFrequency = childSnapshot.val().frequency;


		//var tFrequency = theTrainFrequency;
		//var firstTime = theFirstTrainTime;

		// First Time (pushed back 1 year to make sure it comes before current time)
		var firstTimeConverted = moment(childSnapshot.val().firstTrainTime,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
		var tRemainder = diffTime % childSnapshot.val().frequency;
		console.log(tRemainder);

		// Minute Until Train
		var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// Next Train
		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

		//Arrival time to display to html 
		var nextArrival = moment(nextTrain).format("hh:mm");

	console.log(childSnapshot.val());
	
	$('#tableRow > tbody').append('<tr><td>' + theTrainName + '</td><td>' + theTrainDestination + '</td><td>' + theTrainFrequency + '</td><td>' + nextArrival + '</td><td>' + tMinutesTillTrain + '</td></tr>');
}, function (erroObj){


})



