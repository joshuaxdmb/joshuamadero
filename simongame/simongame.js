var gameOn = false
var currentSequence = [] //sequence of remaining buttons to be pressed
var colorSequence = [] //cumulative sequence of colors to be pressed as game progresses


$('.btn').on('click',(event)=>{ //On any button click
    $(event.target).fadeOut(50).fadeIn(50);
    makesSound(event.target.id)
    if(gameOn){ //Check that the game has started
            if (event.target.id === currentSequence.shift()){ //Check the button pressed matches the first color in the current sequence
                console.log(colorSequence)
                if (currentSequence.length < 1){ //If there are no more colors, start again and add an extra color
                    $('h1').text('Nice Job!') 
                    setTimeout(newRandomButton,800)
                 }
            }
            else(
                endGame()
            )
         }
    })

makesSound = (id) =>{ //Make a sound based on the button id
    var sound = new Audio('sounds/'+id+'.mp3')
    sound.play();
}

newRandomButton = () =>{ //Adds a random button to the sequence
    $('h1').text('Here it comes...') 
    var rndIndex = Math.floor(Math.random()*4)
    colorSequence.push($('.btn')[rndIndex].id)
    currentSequence = [...colorSequence]
    console.log('Color Sequence: ',colorSequence)
    colorSequence.forEach((button,i)=>{ //Plays the current sequence for the user
        setTimeout(()=>{
            makesSound(button);
            $('#'+button).fadeOut(50).fadeIn(50);
        },i*800)
    })
}

$(document).on('keypress', ()=>{ //Listens to key presses to start the game
    if(!gameOn){
        $('h1').text('Follow the sequence!') 
        setTimeout(()=>{startGame()
            newRandomButton()},800);
        };
    })
  

startGame = () =>{ 
    console.log('GAME HAS STARTED')
    colorSequence = []
    currentSequence = []
    gameOn = true
}

endGame = () =>{
    console.log('GAME HAS ENDED')
    $('h1').text('Game Over. Press Any Key to Reset.') 
    gameOn = false
}


