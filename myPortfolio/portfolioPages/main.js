const project_template = document.getElementById("project_template");
const main_div = document.getElementById("main_div");

const projectData = {
    '1': {
        name: "Lost and Find",
        language: "Full Stack Android App",
        description: "As part of a project in my junior year of high school, two of my teammates and I were tasked with developing an Android-based application to help our local community. We designed the Lost and Find app, which allows users to report and recover lost items. In my team I was in charge of developing the front and back end as well as designing the database for the application.",
        image: "../../images/lostAndFinLogo.png",
        ref: "https://github.com/rudra-s-1027/LostAndFind/tree/master",
    },
    '2': {
        name: "Big Boggle Solver",
        language: "Swift Application",
        description: "A Swift-based application that parses through a Big Boggle board and finds every possible point that can be earned on the board. This is accomplished through the use of depth-first search (DFS) coupled with the use of a trie-node data structure.",
        image: "../../images/bigBoggleIcon.png",
        ref: "https://github.com/RealRottale1/Playground/tree/main/SwiftCreations/boggleSolver",
    },
    '3': {
        name: "Hangman Helper",
        language: "Swift Application",
        description: "A Swift-based application that can predict the next best letter in a game of hangman. This is accomplished through highly optimised code that allows for fast searching through over 37,000 english words.",
        image: "../../images/swiftIcon.png",
        ref: "https://github.com/RealRottale1/Playground/tree/main/SwiftCreations/hangmanHelper",
    },
    '4': {
        name: "Calculator",
        language: "C++ Program",
        description: "A C++-based program that implements a fully functional calculator. It accepts all operations, including parentheses and exponents. This is accomplished through its unique tokening mechanism.",
        image: "../../images/cppIcon.webp",
        ref: "https://github.com/RealRottale1/Playground/blob/main/CPPCreations/calculator.cpp",
    },
    '5': {
        name: "Eval Calculator",
        language: "Swift Program",
        description: `A Swift-based program that implements a fully functional eval function. It accepts all operations, including parentheses and exponents. The function also validates input, minimizing user errors.`,
        image: "../../images/swiftIcon.png",
        ref: "https://github.com/RealRottale1/Playground/blob/main/SwiftCreations/evalFunc.swift",
    },
    '6': {
        name: "Chemistry Balancer",
        language: "Swift Program",
        description: `A Swift-based program capable of balancing an atomic equation in a very minimal amount of time. This is accomplished through its implementation of variable-solving mechanisms, which solve the atomic equation piece by piece.`,
        image: "../../images/swiftIcon.png",
        ref: "https://github.com/RealRottale1/Playground/blob/main/SwiftCreations/betterChemistryBalancer.swift",
    },
    '7': {
        name: "Text Analyser",
        language: "C Application",
        description: `A C-based application capable of outputting the frequency and length of all words in a text file from least to greatest or vice versa. It also shows the percentage of the file that is a given word.`,
        image: "../../images/cIcon.webp",
        ref: "https://github.com/RealRottale1/Playground/blob/main/Lyrinth_Lore/WordAnalysis.c",
    },
    '8': {
        name: "2048",
        language: "Rust Game",
        description: "A Rust-based implementation of the classic game 2048.",
        image: "../../images/rustIcon.png",
        ref: "https://github.com/RealRottale1/Playground/blob/main/RustCreations/Creations/2048.rs",
    },
    '9': {
        name: "Battle Ship",
        language: "Rust Game",
        description: `A Rust-based implementation of the Hasbro board game Battle Ship, including a bot to play against. The bot is designed to play just like a human, meaning it does not go easy on the player.`,
        image: "../../images/rustIcon.png",
        ref: "https://github.com/RealRottale1/Playground/blob/main/RustCreations/Creations/battleShip.rs",
    },
    '10': {
        name: "Red Battle: Undying",
        language: "Custom Engine",
        description: "A JavaScript-based game that utilizes my Battle Engine. I created the Battle Engine my junior year of high school to be lightweight and fast.",
        image: "../../images/redBattleUndyingPortfolio.png",
        ref: "https://rottale1.itch.io/red-battle-undying",
    },
    '11': {
        name: "Red Battle: Battle for Lyrinth",
        language: "Custom Engine",
        description: "A JavaScript-based simulator that utilizes my custom Battle Engine 2. The Battle Engine 2 utilizes a shared A-Star pathfinding system to heavily reduce movement computation, allowing for hundreds of units to operate simultaneously with minimal lag.",
        image: "../../images/redBattleBattleForLyrinthPortfolio.png",
        ref: "https://rottale1.itch.io/red-battle-battle-for-lyrinth",
    },
    '12': {
        name: "Red Battle: Overrun",
        language: "Game Maker Engine",
        description: "A short GML-based game I created to learn the game maker language and engine for a college club. I managed the development of the game in under a week.",
        image: "../../images/redBattleOverrunPortfolio.png",
        ref: "https://rottale1.itch.io/red-battle-overrun",
    },
    '13': {
        name: "Chaotic Construction",
        language: "Game Maker Engine",
        description: `A GML-based game created for UNC Charlotte's Game Developers Fall Game Jam of 2026. The theme of the game jam was "out of control." To match the theme, I designed a fast-paced task game where your controls are slowly randomized, making even the easiest of tasks hard.`,
        image: "../../images/chaoticConstructionPortfolio.png",
        ref: "https://rottale1.itch.io/chaotic-construction",
    },
    '14': {
        name: "Recursive Tree Simulator",
        language: "JavaScript Program",
        description: `A JavaScript-based simulator that allows users to render recursive trees. The simulator also allows the user to modify a multitude of aspects about the tree, including the number of branches and the depth of the tree.`,
        image: "../../images/recursiveTreeSimulatorPortfolio.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
}

function loadProjects() {
    Object.values(projectData).forEach(project => {
        const newProject = project_template.children[0].cloneNode(true);
        newProject.href = project.ref;
        const title_texts = newProject.getElementsByClassName("title_text");
        title_texts[0].textContent = project.name;
        title_texts[2].textContent = project.language;
        newProject.getElementsByClassName("description_text")[0].textContent = project.description;
        newProject.getElementsByClassName("profile_image")[0].src = project.image;
        main_div.appendChild(newProject);
    });
}

function updateGUIElements() {
    const title_div = document.getElementsByClassName("title_div");
    const title_text = document.getElementsByClassName("title_text");
    const description_text = document.getElementsByClassName("description_text");
    const right_div = document.getElementsByClassName("right_div");
    const shrink = window.innerWidth <= 1300 || window.innerHeight <= 500;
    document.getElementById("title").style.justifyContent = shrink ? "flex-start" : "center";
    for (const t of title_div) {
        t.style.justifyContent = shrink ? "center" : "start";
    }
    for (const t of description_text) {
        t.style.textAlign = shrink ? "center" : "left";
        t.style.fontSize = shrink ? "32px" : "32px";
        t.style.width = shrink ? "max(calc(100vw - 50px), 1000px)" : "auto";
        t.style.textAlign = shrink ? "center" : "start";
        t.style.alignSelf = shrink ? "center" : "start";
    }
    for (const t of title_text) {
        t.style.fontSize = shrink ? "34px" : "38px";
    }
    for (const d of right_div) {
        d.style.display = shrink ? "none" : "flex";
    }
}

loadProjects();
window.addEventListener('resize', () => {
    updateGUIElements();
});

window.visualViewport.addEventListener('resize', () => {
    updateGUIElements();
});
updateGUIElements();