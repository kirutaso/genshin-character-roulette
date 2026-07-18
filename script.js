const spinButton = document.getElementById("spinButton");

const characterName = document.getElementById("characterName");
const characterImage = document.getElementById("characterImage");
const characterInfo = document.getElementById("characterInfo");

const characterList = document.getElementById("characterList");
const historyBox = document.getElementById("history");

const characterListButton =
document.getElementById("characterListButton");


let characters = [];

let history = [];



// キャラデータ読み込み

async function loadCharacters(){

    characterName.textContent =
    "読み込み中...";


    try{

        const response =
        await fetch("characters.json");


        characters =
        await response.json();


        characterName.textContent =
        "準備完了！";


        characterInfo.textContent =
        `${characters.length}人読み込み完了`;


        createCharacterList();


    }
    catch(error){

        characterName.textContent =
        "読み込み失敗";


        console.error(error);

    }

}




// キャラ一覧作成

function createCharacterList(){


    characterList.innerHTML="";


    characters.forEach(character=>{


        const card =
        document.createElement("div");


        card.className =
        "characterItem";


        card.innerHTML = `

        <img src="${character.image}">

        <p>${character.name}</p>

        `;


        card.onclick = ()=>{

            showCharacter(character);

        };


        characterList.appendChild(card);


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


    if(characters.length===0)
        return;



    spinButton.disabled=true;


    let count=0;

    let result;



    const timer =
    setInterval(()=>{


        result =
        characters[
            Math.floor(
                Math.random()*characters.length
            )
        ];


        characterName.textContent =
        result.name;


        count++;



        if(count>25){


            clearInterval(timer);


            showCharacter(result);


            addHistory(result);


            spinButton.disabled=false;


        }


    },80);

}




// 履歴追加

function addHistory(character){


    history.unshift(character);


    if(history.length>10){

        history.pop();

    }


    showHistory();

}




// 履歴表示

function showHistory(){


    historyBox.innerHTML =
    "<h3>📜 履歴</h3>";


    history.forEach(c=>{


        historyBox.innerHTML +=
        `<p>${c.name}</p>`;


    });

}





spinButton.addEventListener(
"click",
spinCharacter
);



characterListButton.onclick = ()=>{


    characterList.scrollIntoView({

        behavior:"smooth"

    });


};



loadCharacters();
