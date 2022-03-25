song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

leftWristScore = 0;
status_song1 = "";

rightWristScore = 0;
status_song2 = "";


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
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = " + leftWristScore + " Score Right Wrist = " + rightWristScore);

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
    status_song2 = song2.isPlaying();
    console.log("Song 1 = " + status_song1 + "Song 2 = " + status_song2);

    if (rightWristScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if (status_song2 == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Peter Pan";
        }
    }

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

