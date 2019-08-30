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

    return allCharacters[i];
}

const hideCharacter = () => {
    const charName = getRandomCharacter();

    const char = document.querySelector(`.${charName}`);
    char.style.opacity = 0;

    setTimeout(() => {
        char.style.opacity = 1;
    }, 2500);
}

const hideRandomCharacter = () => {
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

const runAnimation = animationInt => {
    if (animationInt <= 2) {
        setAnimationSpeed(animationInt);
    } else if (animationInt === 9) {
        hideRandomCharacter();
    } else {
        containerElement.classList.toggle(`animation--${animationInt}`);
    }
}

const init = () => {
    cloud.style.animationDuration = `${animationSpeed}s`;

    [...controls].forEach((control) => {
        control.addEventListener('click', (e) => {
            const animationInt = parseInt(e.currentTarget.innerHTML);
            
            runAnimation(animationInt); 
        })
    });
}


init();