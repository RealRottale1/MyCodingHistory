const templateData = {
    '0': {
        name: 'Tic Tac Toe',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: 'This project is a Rust port of the C++ version of Tic Tac Toe that I made. In it you play a bot in Tic Tac Toe.',
        importance: "This project is important because it was the first Rust program I ever made (that worked). This project got me familiarized with Rust's different syntax compared to other languages that borrow from the C family (Java, C++, JavaScript, etc.). This project also taught me about usize, which is the datatype used to index stuff like arrays and vectors.",
        image: '../images/ticTacToeRust.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '1': {
        name: 'Battle Ship',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "This project is a one-player (vs. bot) version of Battleship. You and the bot place your ships and take turns taking potshots until someone sinks all of their opponent's battleships.",
        importance: "This project is important because it was my first ever original Rust program that I made. This project also got me familiarized with transitioning between isize and usize data types, which were needed in inorder to ensure the ships remained on the board.",
        image: '../images/battleShip.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '2': {
        name: '2048',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "In this project you combine numbers into bigger numbers until you reach 2048 and win. As the game progresses, finding similar numbers to combine gets harder and harder.",
        importance: "This project is important because it was my first Rust project to contain complex code. This complexity comes from the use of 3 nested for loops, which are used to handle the movement of the numbers when merging.",
        image: '../images/2048.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '3': {
        name: 'Mouse Maze (Index Ver)',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "This project is similar to the C++ version, where you can create a maze for a mouse to navigate in order to reach a piece of cheese. The major difference for this project, however, is that it was redesigned to use no structs, objects, or references, instead using arrays and indexing to achieve the same goal (hence it being called version index).",
        importance: "This project is important because it showed me Rust's very strict use of references, which I was never accustomed to prior to this project. Unlike C++, which allows you to do whatever you want with references regardless of if it is safe or not, Rust is built from the ground up to prevent users from using references in an unsafe way. This made it unviable for me to recreate the C++ version in Rust without major reworks.",
        image: '../images/mouseMazeI.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '4': {
        name: 'Conways Game of Life',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "This project is a simulation of Conway's Game of Life. In it you can arrange alive and dead cells on a board and watch as they grow and die to create unique patterns.",
        importance: "This project is important because it highlights my familiarity with the Rust language, as I was able to make this project in about 10 minutes.",
        image: '../images/conwaysGameOfLife.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '5': {
        name: 'Two Player Chess',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "In this project you can play chess against another player. The project has all of the rules of normal chess.",
        importance: "This game is important because it contains some of, if not all of, my most complex Rust code. This is because checking for checkmate and stalemate requires a lot of steps.",
        image: '../images/twoPlayerChess.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
    '6': {
        name: 'Mouse Maze (Pointer Ver)',
        icon: '../images/replitRustIcon.jpg',
        iconLink: 'https://www.rust-lang.org/',
        about: "This project is similar to both the Rust index version and the C++ version. It combines the Rust language with the reference approach found in the C++ version. When I initially went about doing this project, I did a bunch of research into the Rust reference model but ultimately found that using raw pointers was the best way of accomplishing my goal (hence it being called version pointer).",
        importance: "This project is important because it taught me a lot about the Rust reference model and how to use references safely and unsafely.",
        image: '../images/mouseMazeP.png',
        link: 'https://replit.com/@CAMarkham/All-Rust-Creations?v=1#src/main.rs',
    },
};

let pageID = window.location.search.replace('?pageID=','');
if (!templateData[pageID]) {
    pageID = '0';
};

const gameTitle = document.getElementById('project_name');
const codeButton = document.getElementById('code_button');
const codeIcon = document.getElementById('code_icon');
const gameImage1 = document.getElementById('image1');
const aboutDescription = document.getElementById('about_description');
const aboutImportance = document.getElementById('importance_description');
const playGameButton1 = document.getElementById('image_button1');

gameTitle.textContent = templateData[pageID].name;
codeIcon.src = templateData[pageID].icon;
gameImage1.src = templateData[pageID].image;
aboutDescription.textContent = templateData[pageID].about;
aboutImportance.textContent = templateData[pageID].importance;

codeButton.addEventListener('click', function() {
    window.open(templateData[pageID].iconLink, '_blank');
});

playGameButton1.addEventListener('click', function() {
    window.open(templateData[pageID].link, '_blank');
});