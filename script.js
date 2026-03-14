const catImages = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"];
const alarmSound = new Audio('alarm.mp3'); 
const jokeSound = new Audio('joke.mp3');
const wisdomSound = new Audio('wisdom.mp3');

let timeLeft = 0;
let timerId = null; // ここで定義！
let appData = { jokes: [], wisdom: [] };

fetch('./data.json')
    .then(response => response.json())
    .then(data => { appData = data; })
    .catch(err => console.error("データ読み込み失敗:", err));

function addTime(min) {
    timeLeft += min * 60;
    updateDisplay();
}

function updateDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById('timer').innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId !== null || timeLeft <= 0) return;
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            speakRandom(true);
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 0;
    updateDisplay();
}

function speakRandom(isTimerEnd = false) {
    // 割り込み優先：ボタン押下時はタイマーを止めずに表示だけ変える
    if (isTimerEnd) {
        alarmSound.play();
    } else {
        // 「終わりの一言」ボタン優先（タイマーは継続）
        const isJoke = Math.random() < 0.8;
        isJoke ? jokeSound.play() : wisdomSound.play();
    }

    if (appData.jokes.length === 0) return;

    const isJoke = Math.random() < 0.8;
    const category = isJoke ? "jokes" : "wisdom";
    const msg = appData[category][Math.floor(Math.random() * appData[category].length)];
    
    document.getElementById('message-box').innerHTML = msg.replace(/\n/g, '<br>');
    document.getElementById('cat-img').src = "images/" + catImages[Math.floor(Math.random() * catImages.length)];
}
