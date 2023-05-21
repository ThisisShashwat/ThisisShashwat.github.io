function is_pixel_inside_rect(pixel, top_left, bottom_right) {
  /*
    Check if a given pixel is inside a rectangle defined by its top-left and bottom-right corners.
    pixel: a tuple of (x, y) coordinates of the pixel
    top_left: a tuple of (x, y) coordinates of the top-left corner of the rectangle
    bottom_right: a tuple of (x, y) coordinates of the bottom-right corner of the rectangle
    returns: true if the pixel is inside the rectangle, false otherwise
  */
  let [x, y] = pixel;
  let [x1, y1] = top_left;
  let [x2, y2] = bottom_right;
  // console.log(x, y, x1, x2, y1, y2);
  return x1 <= x && x <= x2 && y1 <= y && y <= y2;
}
function reduceColors(image) {
    var rows = image.rows;
    var cols = image.cols;
    var channels = image.channels();

    // Create a new Mat to hold the processed image
    var processedImage = new cv.Mat(rows, cols, cv.CV_8UC3);

    // Apply color reduction
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var pixel = image.ucharPtr(i, j);
            var processedPixel = processedImage.ucharPtr(i, j);

            processedPixel[0] = reduceVal(pixel[0]);  // R
            processedPixel[1] = reduceVal(pixel[1]);  // G
            processedPixel[2] = reduceVal(pixel[2]);  // B
        }
    }

    return processedImage;
}

function reduceVal(val) {
    if (val < 32) return 0;
    if (val < 96) return 64;
    if (val < 160) return 192;
    return 255;
}

function smudgeColorsAndPreserveEdges(inputImage) {
  

  // Create a copy of the input image
  var outputImage = new cv.Mat();
  
  cv.bilateralFilter(inputImage, outputImage, 20, 100, 75, cv.BORDER_DEFAULT);

  // Return the processed image
  return outputImage;
}


function reduceImageSize(inputImage, targetWidth, targetHeight) {
  // Create a resized image matrix
  var resizedImage = new cv.Mat();

  // Specify the target size for the resized image
  var targetSize = new cv.Size(targetWidth, targetHeight);

  // Perform the resizing operation
  cv.resize(inputImage, resizedImage, targetSize, 0, 0, cv.INTER_AREA);

  // Return the resized image
  return resizedImage;
}

function detect_ball(hsv_frame, hsvlow, hsvup, top_left, bottom_right) {

  let mask = new cv.Mat();

  let lowerRed = new cv.Mat(hsv_frame.rows, hsv_frame.cols, hsv_frame.type(), [hsvlow, 100, 100, 1]);
  let upperRed = new cv.Mat(hsv_frame.rows, hsv_frame.cols, hsv_frame.type(), [hsvup, 255, 255, 1]);
  
  cv.inRange(hsv_frame, lowerRed, upperRed, mask); // create binary mask of desired color if it falls within the lower and upper range

  
  let kernel = cv.Mat.ones(5, 5, cv.CV_8U); // create a kernel filled with ones for morphological transformations on the image

  cv.erode(mask, mask, kernel, new cv.Point(-1, -1), 2); // modify the mask image to reduce the size and smooth out the boundaries of the foreground objects
  cv.dilate(mask, mask, kernel, new cv.Point(-1, -1), 2); // modify the image to expand the size and reinforce the boundaries of the foreground objects

  // cv.imshow("canvas_output", mask)

  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE); // get contours and hierarchy of child, parent, next, prev contours for each

  let max_contour = null;
  let max_area = -1;

  for (let i = 0; i < contours.size(); i++) {
    let contour = contours.get(i);
    let area = cv.contourArea(contour);
    if (area > max_area) {
      max_area = area;
      max_contour = contour;
    }
  }

  if (max_contour === null) {
    return null;
  } else {
    let circle = cv.minEnclosingCircle(max_contour); // get the best-fit circle, its center coordinates, and radius
    let center = circle.center;
    let radius = circle.radius;

    let fit = is_pixel_inside_rect([center.x, center.y], top_left, bottom_right); // check if center is inside the rectangle
    console.log("fit", fit);
    return [center, radius, true];
  }
}


function setup_ball(frame, curr_x, ball) {
  // let lower_color = new cv.Mat(1, 1, cv.CV_8UC3);
  // lower_color.data[0] = ball.colorh;
  // lower_color.data[1] = 50;
  // lower_color.data[2] = 100;

  // let upper_color = new cv.Mat(1, 1, cv.CV_8UC3);
  // upper_color.data[0] = ball.colorh;
  // upper_color.data[1] = 100;
  // upper_color.data[2] = 100;

  // console.log("color", ball.name, upper_color.data, lower_color.data)

  let result = detect_ball(frame, ball.colorhlow, ball.colorhup, [curr_x, y], [curr_x + w, y + h]);
  return result;
}