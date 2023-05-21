function balls_timer(result, ball, current_attempt) {
  let center, radius;

  if (result && result[2]) { // if ball is inside rectangle i.e. 'fit'
    [center, radius, inside] = result;

    ball["visible"] = true;

    if (ball["start_time"] === 0) {
      ball["start_time"] = Date.now() / 1000;
    } else {
      ball["elapsed_time"] = Math.round((Date.now() / 1000) - ball["start_time"], 2);
    }
  } else {
    ball["visible"] = false;
    current_attempt["ball_timings"] = current_attempt["ball_timings"] || {};
    current_attempt["ball_timings"][ball["name"]] = current_attempt["ball_timings"][ball["name"]] || 0;
    current_attempt["ball_timings"][ball["name"]] += Math.round(ball["elapsed_time"], 2);
    ball["start_time"] = 0;
    ball["elapsed_time"] = 0;
  }

  if (ball["visible"]) {
    ball["prev_time"] = Date.now() / 1000;
  } else {
    if ((Date.now() / 1000) - ball["prev_time"] > wait_time) {
      ball["elapsed_time"] = 0;
      ball["prev_time"] = Date.now() / 1000;
    }
  }

  return [center, radius];
}

function main_timer(visible_count, frame) {
  if (visible_count !== 0) {
    if (!current_attempt["start_time"]) {
      current_attempt["start_time"] = Date.now() / 1000;
    }

    current_attempt["overall_time"] = Math.round((Date.now() / 1000) - current_attempt["start_time"], 2);

    draw_main_timer(frame);
  } else if (current_attempt["overall_time"] > min_time_record_duration) {
    delete current_attempt["start_time"];

    let isNewAttempt = true;
    for (let attempt of session_attempts["attempts"]) {
      if (JSON.stringify(attempt) === JSON.stringify(current_attempt)) {
        isNewAttempt = false;
        break;
      }
    }

    if (isNewAttempt) {
      session_attempts["attempts"].push(JSON.parse(JSON.stringify(current_attempt)));

      let userattempt = find_highest_level(current_attempt);
      display_attempts.push(userattempt);
      current_attempt_display = usertime_display(userattempt);

      append_usertime_to_div(current_attempt_display);
    }

    current_attempt["overall_time"] = 0;
    current_attempt["ball_timings"] = {};
    current_attempt["start_time"] = 0;
  }
}
