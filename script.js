const spinButton = document.getElementById("spinButton");

const characterName = document.getElementById("characterName");
const characterImage = document.getElementById("characterImage");
const characterInfo = document.getElementById("characterInfo");

const characterList = document.getElementById("characterList");

let characters = [];


// データ読み込み
async function loadCharacters(){

    characterName.textContent = "読み込み中...";
    characterInfo.textContent = "";

    try{

        const response =
        await fetch("characters.json");

        characters =
        await response.json();


        characterName.textContent = "準備完了！";

        characterInfo.textContent =
        `${characters.length}人のキャラを読み込みました`;


        displayCharacters();


    }catch(e){

        characterName.textContent =
        "読み込み失敗";

        characterInfo.textContent =
        "characters.json が見つかりません";

        console.error(e);

    }

}



// キャラ一覧表示
function displayCharacters(){

    characterList.innerHTML = "";


    characters.forEach(character=>{


        const div =
        document.createElement("div");


        div.className =
        "characterItem";


        div.innerHTML = `

            <img src="${character.image}">

            <p>${character.name}</p>

        `;


        div.addEventListener("click",()=>{

            showCharacter(character);

        });


        characterList.appendChild(div);


    });

}



// キャラ表示
function showCharacter(character){


    characterName.textContent =
    character.name;


    characterImage.src =
    character.image;


    characterInfo.textContent =
    `★${character.rarity}　${character.element}`;

}



// ランダム抽選
function spinCharacter(){


    if(characters.length === 0){

        return;

    }


    spinButton.disabled = true;


    let count = 0;


    let randomCharacter;


    const interval =
    setInterval(()=>{


        randomCharacter =
        characters[
            Math.floor(
                Math.random()*characters.length
            )
        ];


        characterName.textContent =
        randomCharacter.name;


        count++;


        if(count > 25){


            clearInterval(interval);


            showCharacter(randomCharacter);


            spinButton.disabled = false;


        }


    },80);


}



spinButton.addEventListener(
    "click",
    spinCharacter
);


loadCharacters();
