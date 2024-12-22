const templateData = {
    '0': {
        pointName: 'Early JavaScript',
        description: 'This time period is between the creation of Dream world I (started on 12/29/2020) and the creation of Car Obby (started on 6/30/2021). This time period is mainly defined by its lag and primitive code (excluding the new stuff I added in after this time period). My most advanced game would have to be Car Obby because of its explosion technology (still very primitive).',
        importance: 'This time period is important because it played an important role in getting me hooked on Roblox Studio. The only reason I am a good programmer today or even interested in programming is because Roblox Studio was so fun it made me not want to give up even when my code did not work, which allowed me to grow my programming skills.',
        firstImage: '../images/dreamworldI.png',
        firstLink: 'https://www.roblox.com/games/6157355653/Dream-world-I',
        secondImage: '../images/carObby.png',
        secondLink: 'https://www.roblox.com/games/7028222897/Car-Obby',
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
const playGameButton = document.getElementById('play_button');

gameTitle.textContent = templateData[pageID].pointName;
gameImage1.src = templateData[pageID].firstImage;
gameImage2.src = templateData[pageID].secondImage;
aboutDescription.textContent = templateData[pageID].description;
aboutImportance.textContent = templateData[pageID].importance;

playGameButton.addEventListener('click', function() {
    window.open(templateData[pageID].playPage, '_blank');
});
