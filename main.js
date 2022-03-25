song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
status_song1 = "";


function preload()
{
    song1 = loadSound("ShatterMe.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Initialized");
}

function gotPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + leftWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }

}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('#FF0000');
    stroke('#FF0000');

    status_song1 = song1.isPlaying();
    console.log(status_song1);


    if (leftWristScore > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if (status_song1 == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Shatter Me";
        }
    }
}

