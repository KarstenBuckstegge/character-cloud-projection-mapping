const cloud = document.querySelector('#character-cloud');
const controls = document.querySelectorAll('.control');

let animationSpeed = 2;
const animationSpeedStep = .6;

const setAnimationSpeed = (animationInt) => {
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

const runAnimation = (animationInt) => {
    console.log('run animation', animationInt);

    if (animationInt <= 2) {
        setAnimationSpeed(animationInt);
    } else {
        cloud.classList.toggle(`animation--${animationInt}`);
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