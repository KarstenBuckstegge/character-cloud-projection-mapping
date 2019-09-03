const containerElement = document.querySelector('.container');
const cloud = document.querySelector('#character-cloud');
const controls = document.querySelectorAll('.control');

const outlines = document.querySelectorAll('#character-cloud .outline');
const blockColors = document.querySelectorAll('#character-cloud .c');
const allCharsSelector = document.querySelectorAll('#character-cloud .character');

const allCharacters = [
    'AlienFish',
    'Snake',
    'Mouse',
    'MiniShark',
    'Birdman',
    'Waspman',
    'HappySnake',
    'ConfusedFish',
    'Mexican',
    'Jet',
    'Worm',
    'HappyShark',
    'BigFish',
    'FatHead',
    'Bird',
    'Octopus',
    'Octopus_Bubble',
    'Ghost',
    'ScaredMouse',
    'UFO',
    'Rubberhose',
    'Whale',
    'Ray',
    'Mantanee',
    'Airplane',
    'Seagull',
    'Maggot'
]

const allCharacterElements = [];

let animationSpeed = 2;
const animationSpeedStep = .6;

let hideCharacters = false;
let hideCharLoop;

const setAnimationSpeed = animationInt => {
    let animationSpeedTemp = 0;
    
    if (animationInt === 1) {
        animationSpeedTemp = animationSpeed + animationSpeedStep;
    } else {
        animationSpeedTemp = animationSpeed - animationSpeedStep;
    }

    if (animationSpeedTemp > 0.1 && animationSpeedTemp < 5.1) {
        animationSpeed = animationSpeedTemp;
    }

    cloud.style.animationDuration = `${animationSpeed}s`;
    speedChangeCharHide();
}

const getRandomCharacter = () => {
    const i = Math.max(0, Math.round(Math.random() * allCharacters.length - 1));
    return i;
}

const hideCharacter = () => {
    const charId = getRandomCharacter();

    const char = allCharacterElements[charId];
    char.style.opacity = 0;

    setTimeout(() => {
        char.style.opacity = 1;
    }, 2500);
}

const hideCharactersLoop = () => {
    if (!hideCharacters) {
        hideCharLoop = setInterval(hideCharacter, animationSpeed * 500);
    } else {
        clearInterval(hideCharLoop);
    }

    hideCharacters = !hideCharacters;
}

const speedChangeCharHide = () => {
    if (!hideCharacters) { return; };

    clearInterval(hideCharLoop);
    hideCharLoop = setInterval(hideCharacter, animationSpeed * 500);
}

const queryAllCharacterElements = () => {
    allCharacters.forEach(charName => {
        const charElement = document.querySelector(`.${charName}`);
        allCharacterElements.push(charElement);
    });
};

const runAnimation = animationInt => {
    if (animationInt <= 2) {
        setAnimationSpeed(animationInt);
    } else if (animationInt === 8) {
        hideCharactersLoop();
    } else {
        containerElement.classList.toggle(`animation--${animationInt}`);
    }
}

const connectToWebsocket = () => {
    socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => console.log('connected to', socket);
    socket.onerror = err => console.error('WebSocket error', err);
    socket.onmessage = message => console.log('message: ', message.data);
}

const init = () => {
    cloud.style.animationDuration = `${animationSpeed}s`;

    [...controls].forEach((control) => {
        control.addEventListener('click', (e) => {
            const animationInt = parseInt(e.currentTarget.innerHTML);
            
            runAnimation(animationInt); 
        })
    });
    queryAllCharacterElements();

    connectToWebsocket();
}


init();