window.CAMERA = {

    getX: shift => {

        shift = shift || 0;

        return Math.floor(window.innerWidth / 2) + shift;

    },

    getY: shift => {

        shift = shift || 0;

        return Math.floor(window.innerHeight / 2) + shift;

    },

    sync: () => {

        if (USER.target) {

            LAYER.world.x = CAMERA.getX(- USER.target.sprite.x);
            LAYER.world.y = CAMERA.getY(- USER.target.sprite.y);

        }

    }

};