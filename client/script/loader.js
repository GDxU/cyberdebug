window.LOADER = {

    init: () => {

        let loader = new PIXI.loaders.Loader();

        loader.add('white',   '/client/image/model/white.png');
        loader.add('cyan',    '/client/image/model/cyan.png');
        loader.add('magenta', '/client/image/model/magenta.png');
        loader.add('yellow',  '/client/image/model/yellow.png');

        loader.add('pin', '/client/image/cursor/pin.png');

        loader.add('tile',   '/client/image/tile.png');

        loader.add('hud0', '/client/image/hud/0.png');
        loader.add('hud1', '/client/image/hud/1.png');
        loader.add('hud2', '/client/image/hud/2.png');
        loader.add('hud3', '/client/image/hud/3.png');
        loader.add('hud4', '/client/image/hud/4.png');

        loader.load(() => {

            GUI.menu.show();

        });

        LOADER.loader = loader;

    }

};