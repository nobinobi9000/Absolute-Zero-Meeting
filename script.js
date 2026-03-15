// 画像リスト（cat1は初期用、それ以外をランダム用にする）
const catImages = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png", "cat6.png", "cat7.png", "cat8.png", "cat9.png", "cat10.png", "cat11.png", "cat12.png"];
const alarmSound = new Audio('alarm.mp3'); 
const jokeSound = new Audio('joke.mp3');
const wisdomSound = new Audio('wisdom.mp3');

let timeLeft = 0;
let timerId = null;
let appData = { jokes: [], wisdom: [] };

// 読み込み
fetch('./data.json').then(r => r.json()).then(d => appData = d);

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
// 1. 確率判定 (wisdomが8%)
    const isWisdom = Math.random() < 0.08;
    const category = isWisdom ? "wisdom" : "jokes";
    const msg = appData[category][Math.floor(Math.random() * appData[category].length)];

    // 2. 音の処理
    if (isTimerEnd) {
        alarmSound.play();
        // 少し遅らせてセリフの音を鳴らす
        setTimeout(() => { isWisdom ? wisdomSound.play() : jokeSound.play(); }, 1500);
    } else {
        isWisdom ? wisdomSound.play() : jokeSound.play();
    }

    // 3. 表示 (モーダルを表示)
    // ランダム画像は cat2.png ～ cat12.png から選ぶ
    const randomImg = catImages[Math.floor(Math.random() * 11) + 1]; 
    document.getElementById('modal-cat-img').src = "images/" + randomImg;
    document.getElementById('modal-message').innerHTML = msg.replace(/\n/g, '<br>');
    document.getElementById('result-modal').style.display = 'block';
}

// ページ読み込み時に cat1.png をセット
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cat-img').src = "images/cat1.png";
});
