const spinButton = document.getElementById("spinButton");
const partyButton = document.getElementById("partyButton");
const abyssButton = document.getElementById("abyssButton");


const characterImage =
document.getElementById("characterImage");

const characterName =
document.getElementById("characterName");

const characterInfo =
document.getElementById("characterInfo");


const characterList =
document.getElementById("characterList");


const partyList =
document.getElementById("partyList");


const abyssList =
document.getElementById("abyssList");


const historyBox =
document.getElementById("history");


// 検索・フィルター

const searchBox =
document.getElementById("searchBox");


const allFilter =
document.getElementById("allFilter");


const fiveFilter =
document.getElementById("fiveFilter");


const fourFilter =
document.getElementById("fourFilter");



let characters = [];

let history = [];

let currentFilter = "all";




// ======================
// キャラ読み込み
// ======================


async function loadCharacters(){


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



}catch(error){


characterName.textContent =
"読み込み失敗";


characterInfo.textContent =
"characters.jsonを確認してね";


console.error(error);


}


}




// ======================
// キャラ一覧
// ======================


function createCharacterList(){


characterList.innerHTML = "";



const keyword =
searchBox.value;



const filtered =
characters.filter(character=>{


const nameMatch =
character.name.includes(keyword);



const rarityMatch =
currentFilter === "all" ||
character.rarity == currentFilter;



return nameMatch && rarityMatch;


});




filtered.forEach(character=>{


const div =
document.createElement("div");


div.className =
"characterItem";



div.innerHTML = `

<img src="${character.image}">

<p>${character.name}</p>

<small>
★${character.rarity} ${character.element}
</small>

`;



div.onclick = ()=>{

showCharacter(character);

};



characterList.appendChild(div);



});


}





// ======================
// キャラ表示
// ======================


function showCharacter(character){


characterImage.src =
character.image;



characterName.textContent =
character.name;



characterInfo.textContent =
`★${character.rarity} ${character.element}`;


}


// ======================
// 1人抽選
// ======================


function spinCharacter(){


if(characters.length === 0){

return;

}



spinButton.disabled = true;



let count = 0;

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



if(count >= 25){


clearInterval(timer);



showCharacter(result);



addHistory(result);



spinButton.disabled = false;


}


},80);



}




// ======================
// 4人パーティ
// ======================


function createParty(){


partyList.innerHTML = "";



const party =
randomCharacters(4);



party.forEach(character=>{


partyList.innerHTML += `

<div class="partyCharacter">

<img src="${character.image}">

<p>
${character.name}
</p>

</div>

`;


});


}




// ======================
// 螺旋8人
// ======================


function createAbyss(){


abyssList.innerHTML = "";



const team =
randomCharacters(8);



team.forEach((character,index)=>{


abyssList.innerHTML += `

<div class="abyssCharacter">

<img src="${character.image}">

<p>
${index+1}人目 ${character.name}
</p>


</div>


`;


});


}





// ======================
// 重複なしランダム
// ======================


function randomCharacters(number){


const copy =
[...characters];


const result = [];



while(
result.length < number &&
copy.length > 0
){


const index =
Math.floor(
Math.random()*copy.length
);



result.push(
copy[index]
);



copy.splice(index,1);


}



return result;


}




// ======================
// 履歴
// ======================


function addHistory(character){


history.unshift(character);



if(history.length > 10){

history.pop();

}



historyBox.innerHTML = "";



history.forEach(c=>{


historyBox.innerHTML +=

`<p>${c.name}</p>`;


});


}




// ======================
// ボタン
// ======================


spinButton.onclick =
spinCharacter;


partyButton.onclick =
createParty;


abyssButton.onclick =
createAbyss;



searchBox.addEventListener(
"input",
createCharacterList
);



allFilter.onclick = ()=>{


currentFilter =
"all";


createCharacterList();


};



fiveFilter.onclick = ()=>{


currentFilter =
5;


createCharacterList();


};



fourFilter.onclick = ()=>{


currentFilter =
4;


createCharacterList();


};





// 起動

loadCharacters();
