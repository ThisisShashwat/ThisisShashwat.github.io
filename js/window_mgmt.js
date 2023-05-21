function draw_rectangles(frame, curr_x, ball){

    cv.rectangle(frame, new cv.Point(curr_x, y), new cv.Point(curr_x + w, y + h), new cv.Scalar(ball.color[0], ball.color[1], ball.color[2], 1), 2);


    // let text_size = new cv.Size();
    // let baseLine = new cv.Point();
    // cv.getTextSize(ball.name, cv.FONT_HERSHEY_SIMPLEX, 0.5, 1, text_size, baseLine);

    cv.putText(frame, ball.name, new cv.Point(curr_x + 5, y + h - 5),
               cv.FONT_HERSHEY_SIMPLEX, 0.5, new cv.Scalar(ball.color[0], ball.color[1], ball.color[2], 1), 1, cv.LINE_AA); // TODO: here fix text pos

}

function draw_ball(frame, ball, center, radius, curr_x) {

    console.log("indraw ball", center, ball.name);

    let textColor = new cv.Scalar(ball.color[0], ball.color[1], ball.color[2], 1)
    let elapsedTimeText = `Time: ${ball.elapsed_time.toFixed(2)}`;

    cv.putText(frame, elapsedTimeText, new cv.Point(curr_x, y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.6, textColor, 1, cv.LINE_AA);
    cv.circle(frame, new cv.Point(center.x, center.y), radius, new cv.Scalar(0, 255, 0), 2);

}

function draw_main_timer(frame) {
    cv.putText(frame, current_attempt.overall_time.toString(), new cv.Point(50, 50), cv.FONT_HERSHEY_SIMPLEX, 1, new cv.Scalar(255, 255, 255), 1, cv.LINE_AA);
}

function append_usertime_to_div(text) {
    if (client === "browser") {
        let paratext = document.createElement("p");
        let history = document.getElementById("history")
        paratext.innerHTML = text;
        history.insertBefore(paratext, history.firstChild);
    } else {
        console.log("usertime display final", text);
    }
}
