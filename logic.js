
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyATpExaQLzfI-_YwKG26m6j2IgkO_IefPw",
    authDomain: "train-homework-8797d.firebaseapp.com",
    databaseURL: "https://train-homework-8797d.firebaseio.com",
    projectId: "train-homework-8797d",
    storageBucket: "train-homework-8797d.appspot.com",
    messagingSenderId: "494883620954"
  };
  firebase.initializeApp(config);


let database = firebase.database();

let trainList = database.ref("Trains")

$("#add-info-btn").on("click", function(event){
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim()
    var destination = $("#destination-name-input").val().trim()
    var firstTrain = moment($("#train-time-input").val().trim(),"hh:mm").format("hh:mm")
    var frequency = $("#train-frequency-input").val().trim()

    // console.log (trainName)
    // console.log (destination)
    console.log (firstTrain)
    // console.log (frequency)

    var newTrain = {
        name: trainName,
        trainDestination: destination,
        firstLeave: firstTrain,
        trainFrequency: frequency
    };


    trainList.push(newTrain)

    // console.log(newTrain.name);
    // console.log(newTrain.trainDestination);
    // console.log(newTrain.firstLeave);
    // console.log(newTrain.trainFrequency);

    alert("Employee successfully added");

    $("#train-name-input").val("")
    $("#destination-name-input").val("")
    $("#train-time-input").val("")
    $("#train-frequency-input").val("")
});

trainList.on("child_added", function(snapshot){
    // console.log(snapshot.val())

    var name = snapshot.val().name
    var trainDestination = snapshot.val().trainDestination
    var firstLeave = snapshot.val().firstLeave
    var displayFrequency = snapshot.val().trainFrequency

    
    var currentTime = moment().format("hh:mm")
    console.log("current time" + currentTime)

    var firstTime = moment(firstLeave,"hh:mm")
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log("first time converted:" + firstTimeConverted);

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var trainFrequency = parseInt(displayFrequency)
    console.log(trainFrequency)

    var tRemainder = diffTime % trainFrequency;
    console.log("tRemainder:" + tRemainder);

    var minutesAway = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    // console.log(name)
    // console.log(trainDestination)
    // console.log(firstLeave)
    // console.log(trainFrequency)

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(trainDestination),
        $("<td>").text(displayFrequency),
        $("<td>").text(moment(nextTrain).format("hh:mm")),
        $("<td>").text(minutesAway),
    )

    $("#train-table > tbody").append(newRow)
})