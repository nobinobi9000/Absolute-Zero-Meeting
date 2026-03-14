// script.js
const data = {
    "jokes": ["布団がふっとんだ！", "アルミ缶の上にあるみかん。", "会議の結論？けつろん（ケツ論）は出ないな。"],
    "wisdom": ["早寝早起きは、明日への一番の投資だぞ。", "聞くは一時の恥、聞かぬは一生の恥。"]
};

// 画像のファイル名リスト
const catImages = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"];
const alarmSound = new Audio('alarm.mp3'); 
let timeLeft = 0;
let appData = { jokes: [], wisdom: [] };

// JSONデータの読み込み
fetch('data.json')
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

function speakRandom() {
    if (appData.jokes.length === 0) return;
    
    // セリフの決定
    const all = [...appData.jokes, ...appData.wisdom];
    const msg = all[Math.floor(Math.random() * all.length)];
    document.getElementById('message-box').innerText = msg;
    
    // 猫の画像の切り替え
    const randomImg = catImages[Math.floor(Math.random() * catImages.length)];
    document.getElementById('cat-img').src = "images/" + randomImg;

    // 音声を再生
    alarmSound.play().catch(e => console.log("音声再生待ちです"));
}

setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) speakRandom();
    }
}, 1000);
