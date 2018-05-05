window.LOADER = {

    init: () => {

        let loader = new PIXI.loaders.Loader();

        loader.add('white',   '/client/image/model/white.png');
        loader.add('cyan',    '/client/image/model/cyan.png');
        loader.add('magenta', '/client/image/model/magenta.png');
        loader.add('yellow',  '/client/image/model/yellow.png');

        loader.add('pin', '/client/image/pin.png');

        loader.add('tile',   '/client/image/tile.png');
        loader.add('spawn',  '/client/image/spawn.png');
        loader.add('camera', '/client/image/camera.png');

        loader.load(() => {

            GUI.menu.show();

        });

        LOADER.loader = loader;

    }

};