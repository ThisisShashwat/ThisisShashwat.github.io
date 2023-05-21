function analyse_attempt() {
  let attempt = current_attempt;
  let total_time = attempt.overall_time;
  let ball_timings = attempt.ball_timings;
  let highest_level = null;
  let highest_value = 0;

  if (ball_timings.blue > highest_value) {
    highest_level = 'blue';
    highest_value = ball_timings.blue;
  } else if (ball_timings.yellow > highest_value) {
    highest_level = 'yellow';
    highest_value = ball_timings.yellow;
  } else {
    highest_level = 'red';
    highest_value = ball_timings.red;
  }

  return [highest_level, highest_value];
}

function find_highest_level(attempt) {
  let overall_time = attempt.overall_time;
  let ball_timings = attempt.ball_timings;
  let highest_level = null;
  let highest_value = 0;
  let userattempt = { total_time: overall_time, highest_level: null, highest_value: 0 };

  if (overall_time > 0 && ball_timings) {
    let level_order = ['blue', 'yellow', 'red'];
    for (let level of level_order) {
      let value = ball_timings[level] || 0;
      if (value > 0) {
        highest_level = level;
        highest_value = value;
        break;
      }
    }
  }

  if (highest_value > 0) {
    userattempt = { total_time: overall_time, highest_level: highest_level, highest_value: highest_value };
  }

  return userattempt;
}

function usertime_display(userattempt) {
  let usertime = 'invalid attempt';
  if (userattempt.highest_value > 0) {
    usertime = `total ${userattempt.total_time} sec : ${userattempt.highest_level} level - ${userattempt.highest_value.toFixed(2)} sec`;
  }

  return usertime;
}
