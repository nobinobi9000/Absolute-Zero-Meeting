// script.js
const data = {
    "jokes": ["布団がふっとんだ！", "アルミ缶の上にあるみかん。", "会議の結論？けつろん（ケツ論）は出ないな。"],
    "wisdom": ["早寝早起きは、明日への一番の投資だぞ。", "聞くは一時の恥、聞かぬは一生の恥。"]
};

// 画像のファイル名リスト
const catImages = ["cat1.png", "cat2.png", "cat3.png", "cat4.png", "cat5.png"];

// 音声ファイルの準備
const jokeSound = new Audio('joke.mp3');     // ダジャレ用（ひゅ〜）
const wisdomSound = new Audio('wisdom.mp3'); // ためになる話用
const timerEndSound = new Audio('alarm.mp3'); // タイマー終了用

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

// セリフを喋る共通関数
function speakRandom(isTimerEnd = false) {
    if (appData.jokes.length === 0) return;

    // 1. セリフのカテゴリをランダムに決定 (80%の確率でダジャレ)
    const isJoke = Math.random() < 0.8;
    const category = isJoke ? "jokes" : "wisdom";
    const msg = appData[category][Math.floor(Math.random() * appData[category].length)];
    
    // 表示更新
    document.getElementById('message-box').innerText = msg;
    document.getElementById('cat-img').src = "images/" + catImages[Math.floor(Math.random() * catImages.length)];

    // 2. 音声の再生
    if (isTimerEnd) {
        // タイマー終了時はまず終了音を鳴らす（必要に応じて遅延再生も可能）
        timerEndSound.play();
    } else {
        // ボタン操作時はタイプに応じた音を鳴らす
        isJoke ? jokeSound.play() : wisdomSound.play();
    }
}

// タイマー監視
setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) {
            speakRandom(true); // タイマー終了時はtrueを渡す
        }
    }
}, 1000);
