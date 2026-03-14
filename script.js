// script.js
const data = {
    "jokes": ["布団がふっとんだ！", "アルミ缶の上にあるみかん。", "会議の結論？けつろん（ケツ論）は出ないな。"],
    "wisdom": ["早寝早起きは、明日への一番の投資だぞ。", "聞くは一時の恥、聞かぬは一生の恥。"]
};

// 画像のファイル名リスト
const catImages = ["cat1.jpg", "cat2.jpg"]; // imagesフォルダ内の画像名を指定

let timeLeft = 0;

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
    // セリフの決定
    const all = [...data.jokes, ...data.wisdom];
    const msg = all[Math.floor(Math.random() * all.length)];
    document.getElementById('message-box').innerText = msg;
    
    // 猫の画像の切り替え
    const randomImg = catImages[Math.floor(Math.random() * catImages.length)];
    document.getElementById('cat-img').src = "images/" + randomImg;
}

setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
        if (timeLeft === 0) speakRandom();
    }
}, 1000);
