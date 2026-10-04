const project_template = document.getElementById("project_template");
const main_div = document.getElementById("main_div");

const projectData = {
    '0': {
        name: "Python",
        language: "Proficient",
        description: `I got PCAP and ITS+ certified in my sophomore year of high school. Both of those certifications are industry-level certifications used to demonstrate knowledge of the Python language.`,
        image: "../../images/pythonLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '1': {
        name: "Java",
        language: "Proficient",
        description: `I took Java 1 and 2 in my senior year of high school through Wake Tech. I furthered my Java education by taking a data structures and algorithms class based around Java in college.`,
        image: "../../images/javaLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '2': {
        name: "JavaScript",
        language: "Proficient",
        description: `I took an intro to JavaScript class in my junior year of high school through Wake Tech. I have made many websites like this one using JavaScript paired with HTML and CSS.`,
        image: "../../images/javaScriptLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '3': {
        name: "React Native",
        language: "Novice",
        description: `As part of a club in my junior year of high school, I used React Native to build the Lost and Found mobile app. The core of React Native is very similar to JavaScript.`,
        image: "../../images/reactNativeLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '4': {
        name: "C",
        language: "Intermediate",
        description: `I self-taught myself C before taking an intro to computer systems class in college, which taught the basics of C. The core of C is very similar to C++.`,
        image: "../../images/cIcon.webp",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '5': {
        name: "C++",
        language: "Proficient",
        description: `I self-taught myself C++, including threads, data structures, and advanced pointers. I have taken college classes designed to teach C, which is similar to C++.`,
        image: "../../images/cPPIcon.webp",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '6': {
        name: "Swift",
        language: "Intermediate",
        description: `I self-taught myself Swift and have made many big terminal projects.`,
        image: "../../images/swiftIcon.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '7': {
        name: "Rust",
        language: "Novice",
        description: `I self-taught myself Rust and have made many terminal projects.`,
        image: "../../images/rustIcon.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '8': {
        name: "Lua",
        language: "Proficient",
        description: `Lua is the base language used in Roblox Studio, which I have developed games in for over 5 years. Lua was my first programming language and is the one I have used the most.`,
        image: "../../images/luaLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '9': {
        name: "GML",
        language: "Novice",
        description: `I self-taught myself GML for a club in college. I have made a few games using the engine.`,
        image: "../../images/gameMakerLogo.webp",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '10': {
        name: "Risc-V",
        language: "Novice",
        description: `I self-taught myself Risc-V before taking an intro to computer systems class in college, which focuses primarily on Risc-V.`,
        image: "../../images/riscVLogo.webp",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '11': {
        name: "Verilog",
        language: "Novice",
        description: `I self-taught myself Verilog and know the very basics.`,
        image: "../../images/verilogLogo.png",
        ref: "../../RecursiveTreeSimulator/index.html",
    },
    '12': {
        name: "Excel",
        language: "Proficient",
        description: `I got Excel Associate and Excel Expert certified in my sophomore year of high school. Both of those certifications are industry-level certifications awarded by Microsoft themself.`,
        image: "../../images/excelIcon.webp",
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