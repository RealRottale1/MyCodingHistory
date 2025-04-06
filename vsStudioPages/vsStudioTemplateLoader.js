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
    '4': {
        name: 'Chemistry Auto Balancer',
        image: '../images/cppChemistryAutoBalancer.png',
        description: 'This project is very similar to the JavaScript version I made. The main difference between the two is that the C++ version is slightly faster.',
        importance: 'This project is important because it was my first C++ project. Similarly to how I learned JavaScript, I decided to dive straight into the depths of C++.',
        playPage: 'https://www.programiz.com/online-compiler/0TjSF6gMgWHb8',
    },
    '5': {
        name: 'Pig Latin Converter',
        image: '../images/pigLatinConverter.png',
        description: 'This project allows a user to convert plain text into Pig Latin. It can convert multiple paragraphs of text in mere milliseconds thanks to its use of multithreading.',
        importance: 'This project is important because it was my first ever to use multithreading. This project is especially important because it was my second C++ project, which made my professional implementation of multithreading even more impressive.',
        playPage: 'https://www.programiz.com/online-compiler/6apVJFNNoexSF',
    },
    '6': {
        name: 'Roman Numerals Converter',
        image: '../images/romanNumeralConverter.png',
        description: 'This project allows a user to convert numbers to Roman numerals and Roman numerals to numbers. The program also detects invalid Roman numerals.',
        importance: 'This project is important because it highlights my growth as a programmer. I made a similar converter in Python about 1-2 years prior. I improved my code in every way, making it faster and safer (checks if input is valid).',
        playPage: 'https://www.programiz.com/online-compiler/6apVJFNNoexSF',
    },
    '7': {
        name: 'Tic Tac Toe',
        image: '../images/cppTicTacToe.png',
        description: 'This project allows a user to play tic-tac-toe against a bot.',
        importance: 'This project is important because it was my first project to ever utilize a bot to allow a user to play a two-player game by themself.',
        playPage: 'https://www.programiz.com/online-compiler/9tHwDYoiBM4BD',
    },
    '8': {
        name: 'Mouse Maze',
        image: '../images/mouseMaze.png',
        description: 'This project allows a user to create a maze for a mouse to complete. The mouse uses the A-star pathfinding algorithm to navigate through the maze.',
        importance: 'This project is important because it was my first project to use pointers, which are variables that point to a memory address. Pointers are a very complex and hard to learn topic so me utilizing it is impressive.',
        playPage: 'https://www.programiz.com/online-compiler/7TjS9RfhjWSaw',
    },
    '9': {
        name: 'Square Intersection',
        image: '../images/squareIntersects.png',
        description: 'This project allows a user to check if two two-dimensional squares intersect each other.',
        importance: 'This project is important because it exemplifies my programming growth. Not only does this project utilize pointers, but the way I went about checking intersections is unique and quite complex.',
        playPage: 'https://www.programiz.com/online-compiler/10nFRo8KnUgxh',
    },
    '10': {
        name: 'Calculator',
        image: '../images/calculator.png',
        description: 'This project is a fully working calculator that allows for all normal math operations (+, -, *, /, ^) and also allows for the use of parentheses.',
        importance: 'This project is important because it is by far one of, if not the most, complex codes I have ever made. This is mainly the case because of the parenthesies system which takes about 80% of the code.',
        playPage: 'https://www.programiz.com/online-compiler/1kNDdmtPBAiKs',
    },
    '11': {
        name: '4 In A Row',
        image: '../images/fourInARow.png',
        description: 'This project is a fully working four-in-a-row game where you play against a bot. The bot is very advanced, so winning will be a challenge.',
        importance: 'This project is important because it was my first ever project to include an advanced algorithm/bot. Not only can the bot play four in a row really well, but it can also predict the player\'s next move, giving it an advantage on where to play its next piece.',
        playPage: 'https://www.programiz.com/online-compiler/178bblxedOHVg',
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
