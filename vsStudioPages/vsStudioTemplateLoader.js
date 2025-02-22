const templateData = {
    '0': {
        name: 'Tic Tac Toe ULTRA',
        image: '../images/ticTacToeULTRA.png',
        description: 'In this game, you can play tic-tac-toe. You can also pick your piece type and customize the game from a variety of different game settings.',
        importance: 'This game is important because it was my first ever HTML, CSS, and JavaScript game. This game is also important because it showed me the power of HTML, CSS, and JavaScript and is responsible for my decision to fully switch over from Roblox Studio.',
        playPage: '../ticTacToeCopy/index.html',
    },
    '1': {
        name: 'Snake Game',
        image: '../images/snakeGame.png',
        description: 'In this game you play as a hungry snake whose main objective is to eat as many apples as possible. Upon eating an apple, you grow in length, and you die if you eat yourself or go out of bounds.',
        importance: 'This game is important to me because it was my first game made entirely in a single JavaScript file (no external HTML or CSS pages). Through this game I learned how to add HTML elements via JavaScript.',
        playPage: '../snakeGameCopy/index.html',
    },
    '2': {
        name: 'Red Battle Undying',
        image: '../images/redBattleUndying.png',
        description: 'This game is a direct sequel to my scratch game titled Red Battle. In this game you must defeat the evil wizard Aldrin. To get to Aldrin you must defeat hordes upon hordes of different goblins. Each level you beat gives you access to new swords and bows.',
        importance: 'This game is important for two main reasons. The first reason is that I wrote this code in a very professional way (using semicolons, single quotes, and camel case). The second reason being that this was my first game to use an HTML canvas, which allowed me to render the graphics without having to use HTML or CSS. This game is also really big (just short of 5,000 lines of code).',
        playPage: '../redBattleUndyingCopy/index.html',
    },
    '3': {
        name: 'Chemistry Auto Balancer',
        image: '../images/chemistryAutoBalancer.png',
        description: 'This project was created to solve chemistry balancing equations. It is able to identify the components of a yeild equation and generate a multiplier which satisfies the equation.',
        importance: 'This project is important because it was one of my first projects I made where I had to really focus on optimization. The way the code works is by generating and testing random multipliers until it finds one that works. This takes a long time which is why I had to take optimization into account when making this project.',
        playPage: '../chemistryBalancing/index.html',
    },
};

let pageID = window.location.search.replace('?pageID=','');
if (!templateData[pageID]) {
    pageID = '0';
};

const gameTitle = document.getElementById('project_title');
const gameImage = document.getElementById('game_image');
const aboutDescription = document.getElementById('about_description');
const aboutImportance = document.getElementById('importance_description');
const playGameButton = document.getElementById('play_button');

gameTitle.textContent = templateData[pageID].name;
gameImage.src = templateData[pageID].image;
aboutDescription.textContent = templateData[pageID].description;
aboutImportance.textContent = templateData[pageID].importance;

playGameButton.addEventListener('click', function() {
    window.open(templateData[pageID].playPage, '_blank');
});
