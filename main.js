
const mainCanvas = document.getElementById('background_canvas');



async function handleBackground() {
    let mousePositionUpdated = false;
    let useMouse = false;

    const maxCanvasSize = 4000;
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
    const zoom = ((window.outerWidth - 10) / window.innerWidth);
    mainCanvas.width = window.innerWidth*zoom*canvasResolution;
    mainCanvas.height = window.innerHeight*zoom*canvasResolution;

    console.log(mainCanvas.height);
    console.log(window.innerHeight*canvasResolution);
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
            ctx.rect(dot.position.x - dot.size, dot.position.y - dot.size, dot.size, dot.size);
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
        mousePosition.x = mainCanvas.width*(event.clientX/window.innerWidth);
        mousePosition.y = mainCanvas.height*(event.clientY/window.innerHeight);
    });

    mainCanvas.addEventListener('mouseleave', function() {
        useMouse = false;
    }); 

    while (true) {
        makeDot();
        renderCanvas();
        moveDots();
        await waitTick();
    };
};

handleBackground();

/*
    <a href="./coolmath.html">My coolmath page</a>
    <button onclick="
        window.open('./scratchPages/scratchTemplate.html?pageID=0', '_self')">
        Click To Test Scratch!
    </button>

    <button onclick="
        window.open('./studioPages/studioTemplate.html?pageID=0', '_self')">
        Click To Test Roblox!
    </button>

    <button onclick="
        window.open('./vsStudioPages/vsStudioTemplate.html?pageID=0', '_self')">
        Click To Test Visual Studio!
    </button>

*/