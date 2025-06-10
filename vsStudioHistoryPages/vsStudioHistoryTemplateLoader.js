const templateData = {
    '0': {
        pointName: 'Early JavaScript',
        description: 'This time period is between the creation of Tic Tac Toe ULTRA and the creation of Red Battle Undying. This time period is defined by my rapid accumulation of knowledge in regard to GUI and web-based applications.',
        importance: 'This time period is important for many reasons. The first reason being that this is my first time using a markup language (HTML and CSS). The second reason being that this was my first time ever creating a game from scratch (no pre made engine).',
        firstImage: '../images/ticTacToeULTRA.png',
        firstLink: '../ticTacToeCopy/index.html',
        secondImage: '../images/redBattleUndying.png',
        secondLink: '../redBattleUndyingCopy/index.html',
    },
    '1': {
        pointName: 'Early C++',
        description: 'This time period is between the creation of the Chemistry Auto Balancer and the creation of the 4 In A Row game. This time period is defined by a rapid growth in my programming knowledge, mainly in regard to the nature of statically typed programming languages (like C++). In this period I also found interesting ways to utilize my coding expertise in forms other than just games, like, for example, my Roman Numerals Converter or my Pig Latin Converter.',
        importance: 'This time period is important for many reasons. The first being that I learned many advanced programming concepts like pointers and multithreading. The second reason why this time period is important is because it saw me add C++ to the list of programming languages that I have mastered. Usually mastering a language takes me a few months, if not a year; however, I was able to master C++ in under two months.',
        firstImage: '../images/cppChemistryAutoBalancer.png',
        firstLink: 'https://www.programiz.com/online-compiler/0TjSF6gMgWHb8',
        secondImage: '../images/fourInARow.png',
        secondLink: 'https://www.programiz.com/online-compiler/178bblxedOHVg',
    },
    '2': {
        pointName: 'React Native',
        description: 'At the start of my junior year of high school, I joined the Ready Set App (RSA) club at my school. The point of the club is to create a mobile app that solves a problem that affects the local community. My group decided to make an app that would allow users to report and search for lost items. My group also decided to use React Native to build the app, as it would allow the app to work on both Android and iOS. React Native is very similar to JavaScript, which made learning the language easy.',
        importance: 'Making an app from scratch using React Native not only taught me how to make mobile apps but also how to implement many mobile phone features such as the camera and location. I also learned how to implement a database into a project, which I had never done prior to making this app. Overall, using React Native taught me many important programming skills, especially if I decide to get into mobile app development.',
        firstImage: '../images/lafApp2.png',
        secondImage: '../images/lafApp.png',
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

if (!templateData[pageID].firstLink && !templateData[pageID].secondLink) {
    playGameButton1.style.display = "none";
    playGameButton2.style.display = "none";
} else {
    playGameButton1.addEventListener('click', function() {
        window.open(templateData[pageID].firstLink, '_blank');
    });
    
    playGameButton2.addEventListener('click', function() {
        window.open(templateData[pageID].secondLink, '_blank');
    });    
}