const catImages = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"];
const alarmSound = new Audio('alarm.mp3'); 
const jokeSound = new Audio('joke.mp3');
const wisdomSound = new Audio('wisdom.mp3');

let timeLeft = 0;
let timerId = null;
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

function showModal(msg, isJoke) {
    const modal = document.getElementById('result-modal');
    document.getElementById('modal-message').innerHTML = msg.replace(/\n/g, '<br>');
    document.getElementById('modal-cat-img').src = "images/" + catImages[Math.floor(Math.random() * catImages.length)];
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('result-modal').style.display = 'none';
}

function speakRandom(isTimerEnd = false) {
    if (appData.jokes.length === 0) return;

    // 1. カテゴリを決定 (タイマー終了時は強制的にアラーム音用の判定にする等の調整も可能)
    const isJoke = Math.random() < 0.8;
    const category = isJoke ? "jokes" : "wisdom";
    const msg = appData[category][Math.floor(Math.random() * appData[category].length)];
    
    // 2. 音声再生
    if (isTimerEnd) {
        alarmSound.play();
    } else {
        isJoke ? jokeSound.play() : wisdomSound.play();
    }

    // 3. モーダル表示
    showModal(msg, isJoke);
}
