prediction_1 = "";
prediction_2 = "";

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/s9H7HSIqF/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function speak() {
    speak_data_1 = "The First Prediction Is " + prediction_1;
    speak_data_2 = "The Second Predicion Is " + prediction_2;
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}



Webcam.set({
    width:350,
    height:300,
    imsge_format:'png',
    png_quality:90,
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResults);
}

function gotResults(error,result) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_1 = result[1].label;
        speak();
    }
    if(result[0].label == "Happy") {
        document.getElementById("update_emoji").innerHTML = "&#128522";
    }
    if(result[0].label == "Angry") {
        document.getElementById("update_emoji").innerHTML = "&#128548";
    }
    if(result[0].label == "Sad") {
        document.getElementById("update_emoji2").innerHTML = "&#128532";
    }
    if(result[0].label == "Very Hsppy") {
        document.getElementById("update_emoji2").innerHTML = "&#128512";
    }
    if(result[0].label == "Very Sad") {
        document.getElementById("update_emoji2").innerHTML = "&#128546";
    }
    if(result[0].label == "Very Angry") {
        document.getElementById("update_emoji2").innerHTML = "&#128545";
    }
}






