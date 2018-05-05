window.CAMERA = {

    target: undefined,

    sync: () => {

        if (CAMERA.target) {

            GAME.world.x = Math.floor(window.innerWidth / 2) - CAMERA.target.sprite.x;
            GAME.world.y = Math.floor(window.innerHeight / 2) - CAMERA.target.sprite.y;

        } else {

            let target = TARGET.get(USER.id);
            if (target) CAMERA.target = target;

        }

    }

};