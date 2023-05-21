let refPt = [];
let wait_time = 0.5;

// settings for rectangles
let offset = 20;
let y =  100;
let w = 125;
let h = 125;

let device_3ball = "3ballspiro";
let device_1ball = "1ballspiro";

// all colors in BGR format not RGB
let ball_set = [
    {
        "name": "blue",
        "color": [0, 0, 100],
        "colorhlow": 100,
        "colorhup": 150,
        "visible": false,
        "elapsed_time": 0,
        "start_time": 0,
        "prev_time": 0
    },
    {
        "name": "yellow",
        "color": [255, 255, 0],
        "colorhlow": 20,
        "colorhup": 60,
        "visible": false,
        "elapsed_time": 0,
        "start_time": 0,
        "prev_time": 0  // debounce
    },
    {
        "name": "red",
        "color": [255, 0, 0],
        "colorhlow": 0,
        "colorhup": 10,
        "visible": false,
        "elapsed_time": 0,
        "start_time": 0,
        "prev_time": 0
    },
];

let user_benchmark_current = {"level": "", "time": ""};
let level_broken = "";  // levelup message
let time_broken = "";  // timeup message
let benchmark_broken = "";  // benchmarkup message
let benchmark1 = {"level": "blue", "time": "10"};
let benchmark2 = {"level": "blue", "time": "20"};
let benchmark3 = {"level": "blue", "time": "40"};

let min_time_record_duration = 1;
let session_attempts = {
    "start_datetime": null,
    "attempts": [],
};

let current_attempt = {
    "overall_time": 0,
    "start_time": null,
    "ball_timings": {}
};

let current_attempt_display = "";
let display_attempts = [];

let userattempt = "";

let client = "browser";
