const spinButton = document.getElementById("spinButton");
const characterName = document.getElementById("characterName");
const characterImage = document.getElementById("characterImage");
const characterInfo = document.getElementById("characterInfo");

let characters = [];

// データ読み込み
async function loadCharacters() {

    characterName.textContent = "読み込み中...";
    characterInfo.textContent = "";

    try {

        const response = await fetch("characters.json");
        characters = await response.json();

        characterName.textContent = "準備完了！";
        characterInfo.textContent = `${characters.length}人のキャラを読み込みました`;

    } catch (e) {

        characterName.textContent = "読み込み失敗";
        characterInfo.textContent = "characters.json が見つかりません";

        console.error(e);

    }

}

// ランダム抽選
function spinCharacter(){

    if(characters.length === 0){
        return;
    }

    spinButton.disabled = true;

    let count = 0;

    const interval = setInterval(()=>{

        const random =
            characters[Math.floor(Math.random()*characters.length)];

        characterName.textContent = random.name;

        count++;

        if(count > 25){

            clearInterval(interval);

            characterImage.src = random.image;

            characterInfo.textContent =
            `★${random.rarity}　${random.element}`;

            spinButton.disabled = false;

        }

    },80);

}

spinButton.addEventListener("click",spinCharacter);

loadCharacters();
