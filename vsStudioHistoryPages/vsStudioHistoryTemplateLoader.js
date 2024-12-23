const templateData = {
    '0': {
        pointName: 'Early JavaScript',
        description: 'As of right now this time period is still on going. This time period started upon the creation of Tic Tac Toe ULTRA.',
        importance: 'This time period is important for many reasons. The first reason being that this is my first time using a markup language (HTML and CSS). The second reason being that this was my first time ever creating a game from scratch (no pre made engine).',
        firstImage: '../images/ticTacToeULTRA.png',
        firstLink: '../ticTacToeCopy/index.html',
        secondImage: '../images/redBattleUndying.png',
        secondLink: '../redBattleUndyingCopy/index.html',
    },
};

let pageID = window.location.search.replace('?pageID=','');
if (!templateData[pageID]) {
    pageID = '0';
};

const gameTitle = document.getElementById('project_title');
const gameImage1 = document.getElementById('game_image1');
const gameImage2 = document.getElementById('game_image2');
const aboutDescription = document.getElementById('about_description');
const aboutImportance = document.getElementById('importance_description');
const playGameButton1 = document.getElementById('play_button1');
const playGameButton2 = document.getElementById('play_button2');

gameTitle.textContent = templateData[pageID].pointName;
gameImage1.src = templateData[pageID].firstImage;
gameImage2.src = templateData[pageID].secondImage;
aboutDescription.textContent = templateData[pageID].description;
aboutImportance.textContent = templateData[pageID].importance;

playGameButton1.addEventListener('click', function() {
    window.open(templateData[pageID].firstLink, '_blank');
});

playGameButton2.addEventListener('click', function() {
    window.open(templateData[pageID].secondLink, '_blank');
});
