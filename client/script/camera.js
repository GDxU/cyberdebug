window.CAMERA = {

    scale: 1,
    scales: [1, 2, 3],

    init: () => {

        if (CONFIG.debug) for (let i = 1; i < 6; i++) CAMERA.scales.unshift(1 / Math.pow(2, i));

        document.addEventListener('wheel', e => {

            let i = CAMERA.scales.indexOf(CAMERA.scale);

            if (e.deltaY < 0 && i < CAMERA.scales.length - 1) CAMERA.scale = CAMERA.scales[i + 1];
            if (e.deltaY > 0 && i > 0) CAMERA.scale = CAMERA.scales[i - 1];

            GAME.application.stage.scale.set(CAMERA.scale);

        }, false);

    },

    getX: shift => {

        shift = shift || 0;

        return Math.floor(window.innerWidth / 2 / CAMERA.scale) + shift;

    },

    getY: shift => {

        shift = shift || 0;

        return Math.floor(window.innerHeight / 2 / CAMERA.scale) + shift;

    },

    sync: () => {

        if (USER.target) {

            LAYER.world.x = CAMERA.getX(- USER.target.sprite.x);
            LAYER.world.y = CAMERA.getY(- USER.target.sprite.y) + 22;

        }

    }

};