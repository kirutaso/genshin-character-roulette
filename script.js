const spinButton = document.getElementById("spinButton");
const characterName = document.getElementById("characterName");
const characterImage = document.getElementById("characterImage");
const characterInfo = document.getElementById("characterInfo");

spinButton.addEventListener("click", () => {
    characterName.textContent = "🎲 準備中...";
    characterInfo.textContent = "キャラクターデータを読み込み予定";
    characterImage.src = "";
});
