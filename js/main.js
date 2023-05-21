function getCorrespondingPixel(smallFrame, largeFrame, pixelX, pixelY) {
  // Get the dimensions of the small frame
  var smallWidth = smallFrame.cols;
  var smallHeight = smallFrame.rows;

  // Get the dimensions of the large frame
  var largeWidth = largeFrame.cols;
  var largeHeight = largeFrame.rows;

  // Calculate the scaling factor
  var scaleX = largeWidth / smallWidth;
  var scaleY = largeHeight / smallHeight;

  // Calculate the corresponding pixel coordinates in the large frame
  var largePixelX = Math.round(pixelX * scaleX);
  var largePixelY = Math.round(pixelY * scaleY);

  // Return the corresponding pixel from the large frame
  return largePixelY, largePixelX;
}


function process_3ball(frame) {
  let x = first_x;
  let visibleCount = 0;



  cv.cvtColor(frame, frame, cv.COLOR_RGB2HSV); // convert the entire frame from RGB to HSV
  cv.cvtColor(frame, frame, cv.COLOR_HSV2RGB, 0);

  var frameToWrite = frame.clone();

  frame = reduceImageSize(frame, video.width/4,  video.height/4)


  frame = smudgeColorsAndPreserveEdges(frame);
  // frame = reduceColors(frame);
  cv.cvtColor(frame, frame, cv.COLOR_RGB2HSV);

  for (let i = 0; i < ball_set.length; i++) {
    let ball = ball_set[i];
    x = prepare_set(frame, frameToWrite, x, ball);

    if (ball.visible) {
      visibleCount += 1;
    }
  }

  main_timer(visibleCount, frameToWrite);

  return frameToWrite;
}


function prepare_set(frame, frameToWrite, prev_x, ball) {
  let curr_x = prev_x + offset;
  draw_rectangles(frameToWrite, curr_x, ball); // make rectangle for each ball
  let result = setup_ball(frame, curr_x, ball); // detect the ball as per color and return center coordinates and radius

  // updating the ball timing
  let [ center, radius ] = balls_timer(result, ball, current_attempt);

  // if ball is visible, draws the circle on frame
  if (ball.visible) {
    console.log("center values", center.x, center.y);
    center.x = center.x * 4;
    center.y = center.y * 4;
    // center = getCorrespondingPixel(frame, frameToWrite, center.x, center.y);
    console.log("center values new", center.x, center.y);
    draw_ball(frameToWrite, ball, center, radius * 4, curr_x);
  }

  return curr_x + w;
}
