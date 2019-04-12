// const animation = () => {
//     // TweenMax.to("#character-cloud", 2, {
//     //     ease: SteppedEase.config(12),
//     //     filter: 100
//     // });
// }


// setTimeout(animation ,1000);

// window.voice = new Wad({
//     source  : 'mic'
// })








(function() {
    const useInputMedia = stream => {
        // AUDIO API INIT
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

        // svg elements
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
            animateMidElements(mid / 100);
            animateHighElements(high / 100);
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


        const animateMidElements = (mid) => {
            // const midMax = 250;
            // if (mid > 50) {
            //     for (elem of blockColors) {
            //         elem.setAttribute('style', `transform: rotate(${mid}deg)`);
            //     };
            // }
        }


        const animateHighElements = (high) => {
            if (high > 0) {
                const opacity = Math.max(0, 1 - high);
                const characterName = getRandomCharacter();
                const char = document.querySelector(`.${characterName}`);

                char.setAttribute('style', `opacity: ${opacity}`);
            }
            if (high <= 0) {
                for (elem of allCharsSelector) {
                    elem.setAttribute('style', `opacity: 1`);
                };
            }
        }

        const getRandomCharacter = () => {
            const i = Math.max(0, Math.round(Math.random() * allCharacters.length - 1));

            return allCharacters[i];
        }

        const getVolume = () => {
            let total = 0;
            for(i = 0; i < dataArray.length; i++) {
                total += parseInt(dataArray[i]);
            }
            return total / dataArray.length;
        }

        // Initialize Animation
        const animateSVG = () => {
            analyser.getByteFrequencyData(dataArray);

            setAnimationData();

            const volume = getVolume();
            const hueRotation = 360 - (Math.min(1, volume / 128) * 360);
            const svgElement = document.querySelector('#character-cloud');

            svgElement.setAttribute('style', `filter: hue-rotate(${hueRotation}deg)`);
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
}());