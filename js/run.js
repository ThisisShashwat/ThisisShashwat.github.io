function openCvReady() {
    cv['onRuntimeInitialized'] = () => {
        video = document.getElementById("cam_input"); // video is the id of video tag
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred! " + err);
            });

        // schedule first frame
        setTimeout(init, 0);
    };
}

function init() {

    device = "3ballspiro" // TODO: device selection

    src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    frame = new cv.Mat();

    // camera of device
    cap = new cv.VideoCapture(cam_input);

    first_x = Math.round((video.width - ((ball_set.length * w) + ((ball_set.length - 1) * offset))) / 2 ) - offset;
    
    session_attempts["start_datetime"] = new Date();

    FPS = 30;

    handleSlider();

    setTimeout(displayFrame, 0);
}

function isUserActive() {
  return !document.hidden;
}

// gets called every frame, reads, processes and displays frame
function displayFrame() {
    let begin = Date.now();
            
    // try {
        if (isUserActive()) {

            cap.read(src); // reads frame from video
            src.copyTo(frame); // makes a copy of read frame so we can process it


            if (device == device_3ball) {
                dst = process_3ball(frame) // all processing of the frame happens here
            }


            cv.imshow("canvas_output", dst);
        }
    // } catch (error) {
    //   console.error('An error occurred:', error.message);
    // }

    let delay = 1000 / FPS - (Date.now() - begin);

    // repeat every next frame
    setTimeout(displayFrame, delay);
}


function handleSlider() {
    
    let mySlider = document.getElementById("mySlider");

    mySlider.min = y
    mySlider.max = video.height - y*2 //TODO: add switch, flip, start, stop camera button

    mySlider.addEventListener("input", function() {
      y = parseInt(mySlider.value);
    });

}