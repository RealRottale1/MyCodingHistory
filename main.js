const mainCanvas = document.getElementById('background_canvas');
const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

function setUpStar(star) {
    const starIcon = document.createElement('img');
    starIcon.src = './images/starIcon.png';
    starIcon.style.overflow = 'visible';
    starIcon.style.position = 'absolute';
    starIcon.style.bottom = '65%';
    starIcon.style.left = '95%';
    starIcon.style.width = '25px';
    starIcon.style.height = '25px';
    starIcon.style.transition = "0.25s";
    star.append(starIcon);
    return starIcon;
} 
const singleLines = document.querySelectorAll('.single_line');
const observer = new IntersectionObserver(function(lines) {
    for (let line of lines) {
        if (line.target.id === "title") continue;
        if (line.isIntersecting) {
            line.target.style.transition = "0.25s";
            line.target.style.transform = "scale(1)";
        } else {
            line.target.style.transform = "scale(0.75)";
        } 
    }
})
singleLines.forEach(line => observer.observe(line));

for (let line of singleLines) {
    const star_span = document.createElement('span');
    star_span.className = "single_line_span";
    while (line.firstChild) {
        star_span.appendChild(line.firstChild);
    }
    line.appendChild(star_span);

    const star = line.classList.contains("star_anchor") ? setUpStar(line) : null;
    const mainIcon = line.parentElement.querySelector(".section_icon");
    if (mainIcon) {mainIcon.style.transition = "0.25s"};
    if (isTouchDevice) continue;
    line.addEventListener('mouseenter', function() {
        if (star) {star.style.transform = "rotate(12.5deg)"};
        if (mainIcon) {mainIcon.style.transform = "rotate(-12.5deg)"};
        line.style.filter = "brightness(1.125)";
    });
    line.addEventListener('mouseleave', function() {
        if (star) {star.style.transform = "rotate(0deg)"};
        if (mainIcon) {mainIcon.style.transform = "rotate(0deg)"};
        line.style.filter = "brightness(1)";
    });
};

document.getElementById("scratchProfileButton").addEventListener('click', function() {
    window.open("https://scratch.mit.edu/users/LES-CAM/", '_blank');
});
document.getElementById("robloxProfileButton").addEventListener('click', function() {
    window.open("https://www.roblox.com/users/589811664/profile", '_blank');
});
document.getElementById("githubProfileButton").addEventListener('click', function() {
    window.open("https://github.com/RealRottale1", '_blank');
});
document.getElementById("itchProfileButton").addEventListener('click', function() {
    window.open("https://rottale1.itch.io/", '_blank');
});


async function handleBackground() {
    let mousePositionUpdated = false;
    let useMouse = false;

    const canvasResolution = 5;
    const tickRate = 100;
    const minDotSpeed = 10;
    const maxDotSpeed = 20;
    const minDotSize = 20;
    const maxDotSize = 30;
    const maxTTL = 500;
    const canvasBackgroundColor = 'rgb(0, 0, 0)';

    const ctx = mainCanvas.getContext('2d');
    const dots = [];
    const mousePosition = {x: 0, y: 0};

    function resizeCanvas() {
        const zoomWidth = ((window.outerWidth - 10) / window.innerWidth);
        const zoomHeight = ((window.outerHeight - 10) / window.innerHeight);
        mainCanvas.width = window.innerWidth*zoomWidth*canvasResolution;
        mainCanvas.height = window.innerHeight*zoomHeight*canvasResolution;
    };

    function waitTick() {
        return new Promise((success) => {
            setTimeout(() => {
                success();
            }, tickRate);
        });
    };

    function renderCanvas() {
        ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        ctx.beginPath();
        ctx.fillStyle = canvasBackgroundColor;
        ctx.rect(0, 0, mainCanvas.width, mainCanvas.height);
        ctx.fill();
        ctx.closePath();
        
        const dotsLength = dots.length;
        for (let i = 0; i < dotsLength; i++) {
            const dot = dots[i];
            ctx.beginPath();
            ctx.fillStyle = dot.color;
            ctx.arc(dot.position.x - dot.size, dot.position.y - dot.size, dot.size/2, 0, Math.PI*2)
            //ctx.rect(dot.position.x - dot.size, dot.position.y - dot.size, dot.size, dot.size);
            ctx.fill();
            ctx.closePath();
        };
    };

    function makeDot() {
        function makePosition() {
            const randomX = (Math.random()>=0.5)
            const x = randomX ? (Math.random()*mainCanvas.width) : ((Math.random()>=0.5) ? 0 : mainCanvas.width);
            const y = !randomX ? (Math.random()*mainCanvas.height) : ((Math.random()>=0.5) ? 0 : mainCanvas.height);
            return({x: x, y: y});
        };

        function makeAngle(position) {
            const xDifference = (mainCanvas.width/2 - position.x);
            const yDifference = (mainCanvas.height/2 - position.y);
            const angle = Math.atan2(yDifference, xDifference) + ((Math.random()>0.5?1:-1)*Math.random()*0.087);
            return(angle);
        };

        function makeSpeed() {
            return(Math.random()*(maxDotSpeed-minDotSpeed)+minDotSpeed);
        };

        function makeSize() {
            return((Math.random()*(maxDotSize-minDotSize))+minDotSize);
        };

        const dot = {
            position: makePosition(),
            angle: 0,
            mouseAngle: null,
            speed: makeSpeed(),
            size: makeSize(),
            color: 'rgb(255, 255, 255)',
            TTL: 0,
        };
        
        dot.angle = makeAngle(dot.position);
        dots.push(dot);
    };

    function moveDots() {
        const dotsLength = dots.length;
        for (let i = dotsLength-1; i >= 0; i--) {
            const dot = dots[i];
            dot.TTL += 1;
            if (dot.TTL >= maxTTL) {
                dots.splice(i, 1);
                continue;
            }
            if (!useMouse) {
                if (!dot.mouseAngle) {
                    dot.position.x += (dot.speed * Math.cos(dot.angle));
                    dot.position.y += (dot.speed * Math.sin(dot.angle));
                } else {
                    dot.position.x += (dot.speed * Math.cos(dot.mouseAngle));
                    dot.position.y += (dot.speed * Math.sin(dot.mouseAngle));
                };
            } else {
                const xDifference = (mousePosition.x - dot.position.x);
                const yDifference = (mousePosition.y - dot.position.y);
                dot.mouseAngle = Math.atan2(yDifference, xDifference);
                dot.position.x += (dot.speed * Math.cos(dot.mouseAngle));
                dot.position.y += (dot.speed * Math.sin(dot.mouseAngle));
            };
        };
        mousePositionUpdated = false;
    };

    mainCanvas.addEventListener('mouseenter', function() {
        useMouse = true;
    });

    mainCanvas.addEventListener('mousemove', function(event) {
        const rect = mainCanvas.getBoundingClientRect();
        mousePosition.x = (event.clientX - rect.left) * (mainCanvas.width / rect.width);
        mousePosition.y = (event.clientY - rect.top) * (mainCanvas.height / rect.height);
    });

    mainCanvas.addEventListener('mouseleave', function() {
        useMouse = false;
    }); 

    while (true) {
        section_buttons_render();
        resizeCanvas();
        makeDot();
        renderCanvas();
        moveDots();
        await waitTick();
    };
};

function section_buttons_render() {
    const titleDiv = document.getElementById("title");
    if (isTouchDevice) {
        titleDiv.style.fontSize = "45px";
    } else {
        titleDiv.style.fontSize = "75px";
    }
    titleDiv.style.position = "absolute";
    titleDiv.style.width = `${Math.max(Math.min((window.innerWidth / 1536), 1), 1) * 100}%`;
    titleDiv.style.left = `calc(50%)`;
    titleDiv.style.transform = "translateX(-50%)";

    const sectionDivs = document.getElementsByClassName("div-section");
    const orderedDivs = [];
    for (let _ of sectionDivs) {
        orderedDivs.push([]);
    }
    const usingLinear = window.innerWidth <= 750 || window.innerHeight <= 500;
    for (let sectionDiv of sectionDivs) {
        const sectionID = usingLinear ? sectionDiv.dataset.sectionLinearId : sectionDiv.dataset.sectionid;
        orderedDivs[sectionID-1].push(sectionDiv);
    }
    for (let i = 0; i < orderedDivs.length; i++) {
        for (const sectionDiv of orderedDivs[i]) {
            sectionDiv.style.position = "absolute";
            sectionDiv.style.left = `calc(50% + ${sectionDiv.dataset.offset && !usingLinear ? (sectionDiv.dataset.offset * (1536 / window.innerWidth)) + "%" : "0px"})`;
            
            const isTitleDiv = sectionDiv.getElementsByClassName("section_icon").length == 1;
            for (const child of sectionDiv.getElementsByClassName("single_line")) {
                child.style.width = `${Math.max(Math.min((window.innerWidth / 450), 2), 0.75) * (isTitleDiv ? (usingLinear ? 1.25 : 1.125) : (usingLinear ? 1.125 : 1)) * 200}px`;
                if (child.classList.contains('stretch_content') || child.classList.contains('start_stretch_content')) {
                    child.style.margin = usingLinear ? "2.5px 0px 2.5px 0px" : "21px 0px 21px 0px";
                }
            }
            
            sectionDiv.style.transform = "translateX(-50%)";
            if (i == 0) {
                sectionDiv.style.top = `${titleDiv.offsetTop + titleDiv.offsetHeight + 10}px`; 
            } else {
                const previousDiv = orderedDivs[i-1][0];
                const previousDivBottom = previousDiv.offsetTop + previousDiv.offsetHeight;
                sectionDiv.style.top = `${previousDivBottom + (sectionDiv.dataset.offsety && !usingLinear ? Number(sectionDiv.dataset.offsety) : 0) + 10}px`;
            }
        }
    }
}
section_buttons_render();
window.addEventListener('resize', section_buttons_render);
handleBackground();

