let userScore=0;
let compScore=0;

const choices = document.querySelectorAll(".choice");
const msg= document.querySelector("#msg");

const userScorePara= document.querySelector("#user-score");
const compScorePara= document.querySelector("#comp-score");
const genCompChoice=() =>{
    const options=["rock", "paper", "scissor"];
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
};

const drawGame=() =>{
    // console.log("game was draw.");
    msg.innerText="OOps Draw!"
     msg.style.backgroundColor="navy";
};

const showWinner= (userWin)=> {
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        // console.log("you win!");
        msg.innerText="You Win!";
        msg.style.backgroundColor="green";
    }else{
        compScore++;
        compScorePara.innerText=compScore;
        // console.log("you lose");
        msg.innerText="You lose!";
        msg.style.backgroundColor="red";
    }
};
const playGame=(userChoice) =>{
    console.log("user choice= ", userChoice);
    // generate computer choice->modular
    const compChoice= genCompChoice();
    console.log("compchoice= ", compChoice);  

    if(userChoice=== compChoice ){
        //draw game
        drawGame();
    } else{
         let userWin =true;
         if(userChoice==="rock"){
             //scissor , paper
           userWin=  compChoice==="paper"? false:true;
         } else if(userChoice==="paper"){
            //rock, scissors
          userWin=  compChoice==="scissor"? false:true;
         } else{
            //rock, paper
           userWin= compChoice==="rock"? false:true;
         }
         showWinner(userWin);
    }
};

choices.forEach((choice) => {
    // console.log(choice);
    choice.addEventListener("click", () =>{
        const userChoice= choice.getAttribute("id");
        console.log("choice was clicked", userChoice);
        playGame(userChoice);
    });
});
