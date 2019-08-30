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

let audioCtx;

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
}

const runAnimation = animationInt => {
    if (animationInt <= 2) {
        setAnimationSpeed(animationInt);
    } else if (animationInt === 10) {
        initAudio();
    } else {
        containerElement.classList.toggle(`animation--${animationInt}`);
    }
}

const initAudio = () => {
    const useInputMedia = stream => {
        // AUDIO API INIT
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(stream);
        const gainNode = audioCtx.createGain();
        source.connect(analyser);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        // mute output
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.value = 0;

        const dataLength = dataArray.length;

        const setAnimationData = () => {
            let low = 0;
            let mid = 0;
            let high = 0;

            for (i = 0; i < dataLength; i++) {
                if (i < 100) {
                    low += dataArray[i];
                }
                if (i < 200 && i > 100) {
                    mid += dataArray[i];
                }
                if (i < 300 && i > 200) {
                    high += dataArray[i];
                }
            }

            animateLowElements(low / 100);
        }

        const animateLowElements = (low) => {
            const lowMax = 250;
            if (low > 0) {
                const amount = (low / lowMax);
                const scale = amount + .8;
                for (elem of outlines) {
                    elem.setAttribute('style', `transform: scale(${scale}); opacity: ${Math.abs(.8 - amount)}`);
                };
            }
        }

        // Initialize Animation
        const animateSVG = () => {
            analyser.getByteFrequencyData(dataArray);

            setAnimationData();
        }

        // looping louie
        let then = new Date().getTime();

        function doThings() {
            const now = new Date().getTime();
            if(now - then > 25) {
                animateSVG();
                then = now;
            }
            const doer = requestAnimationFrame(doThings);
        }

        doThings();
    }

    // request audio data from the client
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(useInputMedia)
};

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