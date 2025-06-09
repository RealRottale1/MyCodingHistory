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
        importance: "This project is important because it was the first Rust program I ever made (that worked). This project got me familiarized with Rust's different syntax compared to other languages that borrow from the C family (Java, C++, JavaScript, etc.). This project also taught me about usize, which is the datatype used to index stuff like arrays and vectors.",
        image: '../images/battleShip.png',
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