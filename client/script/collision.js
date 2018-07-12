window.COLLISION = {

    init: () => {

        let f = (x, y, w, h) => {

            let graphics = new PIXI.Graphics();

            graphics.beginFill(0xff0000, 0.4);
            graphics.drawRect(x, y, w, h);

            LAYER.collision.addChild(graphics);

            return graphics;

        };

        COLLISION.N = f(    0,     0, CONFIG.world.width,  4000);
        COLLISION.S = f(    0, CONFIG.world.height - 4000, CONFIG.world.width,  4000);
        COLLISION.W = f(    0,     0,  3750, CONFIG.world.height);
        COLLISION.E = f(CONFIG.world.width - 3750,     0,  3750, CONFIG.world.height);

        GAME.application.ticker.add(() => {

            if (USER.target) {

                COLLISION.N.alpha = 1 - (USER.target.sprite.y - 4000) / 100;
                COLLISION.S.alpha = 1 - (CONFIG.world.height - USER.target.sprite.y - 4000) / 100;
                COLLISION.W.alpha = 1 - (USER.target.sprite.x - 3750) / 100;
                COLLISION.E.alpha = 1 - (CONFIG.world.width - USER.target.sprite.x - 3750) / 100;

            }

        });

    }

};