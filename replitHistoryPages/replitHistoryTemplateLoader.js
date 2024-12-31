const templateData = {
    '0': {
        name: 'Python',
        icon: 'https://storage.googleapis.com/replit/images/1664475603315_1442b3c69cc612aff6ef60cce0c69328.jpeg',
        iconLink: 'https://www.python.org/about/',
        about: 'During the first two years of high school, I attended a Python 1 and Python 2 class. In these classes I not only learned how to program in Python, but I also earned two certifications showing my knowledge of Python.',
        importance: 'Learning Python helped make the jump from Luau to Java very smooth. Learning Python also made it easier for me to learn other programming languages in general (like JavaScript).',
        firstImage: '../images/itsCert.png',
        firstLink: 'https://www.linkedin.com/in/christopher-markham-782645329/details/certifications/1731586515692/single-media-viewer/?type=DOCUMENT&profileId=ACoAAFLawhIBcSM23AneUXqIZLwycDOa7eib0Tc',
        secondImage: '../images/pcapCert.png',
        secondLink: 'https://www.linkedin.com/in/christopher-markham-782645329/details/certifications/1731586382184/single-media-viewer/?profileId=ACoAAFLawhIBcSM23AneUXqIZLwycDOa7eib0Tc',
    },
    '1': {
        name: 'Java',
        icon: 'https://storage.googleapis.com/replit/images/1664475636706_4242518983fa1131df568c361d7dc030.jpeg',
        iconLink: 'https://www.java.com/en/download/help/whatis_java.html',
        about: 'During my junior year of high school, I decided that I wanted to learn other programming languages besides Luau and Python. I decided I would dip my toes into Java. I am by no means an expert at Java, but I am somewhat fluent with its syntax.',
        importance: 'Learning Java made learning JavaScript extremely easy, as Java and JavaScript share a lot of components. The games to the right are the only two Java games I made (those being Minesweeper and Sudoku).',
        firstImage: '../images/minesweeper.png',
        firstLink: 'https://replit.com/@CAMarkham/Minesweeper',
        secondImage: '../images/sudoku.png',
        secondLink: 'https://replit.com/@CAMarkham/Sudoku',
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
const gameImage2 = document.getElementById('image2');
const aboutDescription = document.getElementById('about_description');
const aboutImportance = document.getElementById('importance_description');
const playGameButton1 = document.getElementById('image_button1');
const playGameButton2 = document.getElementById('image_button2');

gameTitle.textContent = templateData[pageID].name;
codeIcon.src = templateData[pageID].icon;
gameImage1.src = templateData[pageID].firstImage;
gameImage2.src = templateData[pageID].secondImage;
aboutDescription.textContent = templateData[pageID].about;
aboutImportance.textContent = templateData[pageID].importance;

codeButton.addEventListener('click', function() {
    window.open(templateData[pageID].iconLink, '_blank');
});

playGameButton1.addEventListener('click', function() {
    window.open(templateData[pageID].firstLink, '_blank');
});

playGameButton2.addEventListener('click', function() {
    window.open(templateData[pageID].secondLink, '_blank');
});
