window.CAMERA = {

    sync: () => {

        if (USER.target) {

            GAME.world.x = Math.floor(window.innerWidth / 2) - USER.target.sprite.x;
            GAME.world.y = Math.floor(window.innerHeight / 2) - USER.target.sprite.y;

        }

    }

};