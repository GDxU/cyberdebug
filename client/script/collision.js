window.COLLISION = {

    init: () => {

        let f = (x, y, w, h) => {

            let graphics = new PIXI.Graphics();

            graphics.beginFill(0xff0000, 0.4);
            graphics.drawRect(x, y, w, h);

            LAYER.collision.addChild(graphics);

            return graphics;

        };

        COLLISION.N = f(    0,     0, 24750,  4000);
        COLLISION.S = f(    0, 22250, 24750,  4000);
        COLLISION.W = f(    0,     0,  3750, 26250);
        COLLISION.E = f(21000,     0,  3750, 26250);

        GAME.application.ticker.add(() => {

            if (USER.target) {

                COLLISION.N.alpha = 1 - (USER.target.sprite.y - 4000) / 100;
                COLLISION.S.alpha = 1 - (22250 - USER.target.sprite.y) / 100;
                COLLISION.W.alpha = 1 - (USER.target.sprite.x - 3750) / 100;
                COLLISION.E.alpha = 1 - (21000 - USER.target.sprite.x) / 100;

            }

        });

    }

};