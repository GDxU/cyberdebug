window.CAMERA = {

    target: undefined,

    sync: () => {

        if (CAMERA.target) {

            GAME.world.x = Math.round(window.innerWidth / 2) - CAMERA.target.sprite.x;
            GAME.world.y = Math.round(window.innerHeight / 2) - CAMERA.target.sprite.y;

        } else {

            let target = TARGET.get(USER.id);
            if (target) CAMERA.target = target;

        }

    }

};