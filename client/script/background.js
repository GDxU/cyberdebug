window.BACKGROUND = {

    tile: undefined,
    background: undefined,
    box: undefined,

    init: () => {

        BACKGROUND.initBackground();
        BACKGROUND.initBox();

    },

    initTile: () => {

        BACKGROUND.tile = new PIXI.Graphics();

        BACKGROUND.tile.beginFill(0x272d37, 1);
        BACKGROUND.tile.drawRect(0, 0, 99, 99);
        BACKGROUND.tile.endFill();

        BACKGROUND.tile.lineStyle(1, 0xffffff, 0.2);
        BACKGROUND.tile.moveTo(98, 0);
        BACKGROUND.tile.lineTo(0, 0);
        BACKGROUND.tile.lineTo(0, 98);

        BACKGROUND.tile.lineStyle(1, 0x000000, 0.2);
        BACKGROUND.tile.moveTo(99, 1);
        BACKGROUND.tile.lineTo(99, 99);
        BACKGROUND.tile.lineTo(1, 99);

    },

    initBackground: () => {

        BACKGROUND.initTile();

        BACKGROUND.background = new PIXI.extras.TilingSprite(
            BACKGROUND.tile.generateCanvasTexture(1, 1),
            20000,
            20000
        );

        GAME.world.addChild(BACKGROUND.background);

    },

    initBox: () => {

        BACKGROUND.box = new PIXI.Graphics();

        BACKGROUND.box.lineStyle(1, 0xF44336, 0.8);
        BACKGROUND.box.drawRect(0, 0, 900, 900);

        BACKGROUND.box.x = 10000 - 450;
        BACKGROUND.box.y = 10000 - 450;

        GAME.world.addChild(BACKGROUND.box);

    }

};