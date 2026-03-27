// ================= ELEMENTS =================
const boxes = document.querySelectorAll(".box");
const result = document.getElementById("result");
const message = document.getElementById("message");


// focus page to allow typing
window.onload = function(){
    document.body.focus()
};
document.addEventListener("click", function(){
document.body.focus();
});


// ================= WORD LIST =================
const words = [
"APPLE","MANGO","GRAPE","PEACH","BERRY","LEMON","GUAVA","OLIVE","CHILI","ONION",
"BREAD","SUGAR","SPICE","HONEY","COCOA","LATTE","CANDY","PASTA","PIZZA","SALAD",
"WATER","RIVER","OCEAN","BEACH","SHELL","CLOUD","STORM","RAINY","SUNNY","NIGHT",
"EARTH","VENUS","PLUTO","STONE","BRICK","FLOOR","WALLS","DOORS","FRAME","CLOCK",
"WATCH","ALARM","PHONE","RADIO","MUSIC","VOICE","LAUGH","SMILE","HAPPY","ANGRY",
"PEACE","TRUST","FAITH","DREAM","SLEEP","AWAKE","STUDY","LEARN","TEACH","WRITE",
"READS","BOOKS","PAPER","NOTES","BOARD","CLASS","EXAMS","QUIET","NOISE","SOUND",
"SCORE","POINT","MATCH","GAMES","TRAIN","CHAIR","TABLE","SHEEP","HORSE","ZEBRA",
"TIGER","SNAKE","BISON","EAGLE","ROBIN","WHALE","SHARK","MOUSE","CABLE","CABIN",
"CANAL","CARGO","CHAIN","CHARM","CHASE","CHEST","CHOIR","CLAIM","CLEAN","CLERK",
"CLIFF","CLIMB","CLOAK","CLOTH","COACH","COAST","COLOR","COMET","CORAL","COVER",
"CRANE","CROWN","CYCLE","DAILY","DEBUT","DECOR","DEPOT","DIARY","DIGIT","DINER",
"DODGE","DRAFT","DRILL","DRIVE","DRONE","DWELL","EAGER","ELBOW","ELDER","ELITE",
"EMBER","ENJOY","ENTER","ENTRY","EQUAL","EVENT","FAIRY","FALSE","FANCY","FIBER",
"FIELD","FLASK","FLEET","FLUTE","FOCUS","FORCE","FORGE","FORUM","FRESH","FRONT",
"FROST","GIANT","GLIDE","GLOVE","GRACE","GRADE","GRANT","GRASS","GREET","GUARD",
"GUIDE","GUEST","HABIT","HATCH","HAZEL","HEART","HEAVY","HUMAN","HUMID","IDEAL",
"IMAGE","INDEX","INNER","INPUT","ISSUE","IVORY","JEWEL","JOINT","JUDGE","JUICE",
"KNIFE","KNEES","LABEL","LAYER","LEAFY","LIGHT","SMOKE","FLAME","METAL","PLANT",
"GRASS","STONE","SWEET","BRAVE","SHINE","BLINK","BLEND","BRUSH","WHEEL","ENGINE",
"TRUCK","PLANE","BOATS","SPOON","FORKS","PLATE","GLASS","CUPPA","BOWLS","BAGEL"
];


// pick random word
let secretWord = words[Math.floor(Math.random()*words.length)];
console.log("SECRET:", secretWord); // testing


// ================= GAME STATE =================
let currentRow = 0;
let currentCol = 0;
const maxRows = 5;


// ================= KEYBOARD INPUT =================
document.addEventListener("keydown", handleTyping);

function handleTyping(e){

    let key = e.key;

    // ----------- LETTERS -----------
    if(/^[a-zA-Z]$/.test(key)){

        if(currentCol < 5){
            let index = currentRow*5 + currentCol;
            boxes[index].textContent = key.toUpperCase();
            currentCol++;
        }
        return;
    }

    // ----------- BACKSPACE -----------
    if(key === "Backspace"){
        e.preventDefault();

        if(currentCol > 0){
            currentCol--;
            let index = currentRow*5 + currentCol;
            boxes[index].textContent = "";
        }
        return;
    }

    // ----------- ENTER -----------
    if(key === "Enter"){

        if(currentCol < 5){
            alert("Enter a full 5 letter word");
            return;
        }

        checkWord();
    }
}


// ================= CHECK WORD =================
function checkWord(){

    let start = currentRow*5;
    let guess = "";

    for(let i=0;i<5;i++){
        guess += boxes[start+i].textContent;
    }

    // ---- TRUE WORDLE COLOR LOGIC ----
    let secretArr = secretWord.split("");
    let guessArr = guess.split("");
    let status = ["","","","",""];

    // PASS 1 (GREEN)
    for(let i=0;i<5;i++){
        if(guessArr[i] === secretArr[i]){
            status[i] = "green";
            secretArr[i] = null;
        }
    }

    // PASS 2 (YELLOW / GRAY)
    for(let i=0;i<5;i++){

        if(status[i] === "green") continue;

        let idx = secretArr.indexOf(guessArr[i]);

        if(idx !== -1){
            status[i] = "yellow";
            secretArr[idx] = null;
        }
        else{
            status[i] = "gray";
        }
    }

    // APPLY COLORS
    for(let i=0;i<5;i++){
        let box = boxes[start+i];

        if(status[i] === "green"){
            box.style.backgroundColor = "#6aaa64";
            box.style.color = "white";
        }
        else if(status[i] === "yellow"){
            box.style.backgroundColor = "#c9b458";
            box.style.color = "white";
        }
        else{
            box.style.backgroundColor = "#787c7e";
            box.style.color = "white";
        }
    }

    // -------- WIN --------
    if(guess === secretWord){

        result.style.display = "block";
        result.textContent = "Result is: " + secretWord;

        setTimeout(()=>{
            alert("🎉 You guessed the right word!");
        },200);

        message.textContent = "YOU GUESSED RIGHT!";
        message.style.fontSize = "40px";
        message.style.color = "green";

        document.removeEventListener("keydown", handleTyping);
        return;
    }

    // move to next row
    currentRow++;
    currentCol = 0;

    // -------- LOSE --------
    if(currentRow >= maxRows){

        result.style.display = "block";
        result.textContent = "Result is: " + secretWord;

        setTimeout(()=>{
            alert("Game Over! The word was " + secretWord);
        },300);

        document.removeEventListener("keydown", handleTyping);
    }
}
