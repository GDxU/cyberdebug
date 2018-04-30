window.addEventListener('load', () => {

    PIXI.utils.skipHello();

    init.view();
    init.menu();

});

window.init = {};

init.view = () => {

    window.app = new PIXI.Application(window.innerWidth, window.innerHeight, {transparent: true});
    document.body.appendChild(app.view);

    window.world = new PIXI.Container();
    app.stage.addChild(world);

    app.ticker.add(delta => {

    });

};


init.menu = () => {

    let f = () => {

        app.stage.removeChild(graphics);
        app.stage.removeChild(text);

        init.ws();

    };

    // text

    let text = new PIXI.Text(T.start, {
        fill: 'white',
        fontSize: 20
    });

    text.anchor.set(0.5);
    text.x = Math.floor(window.innerWidth / 2);
    text.y = Math.floor(window.innerHeight / 2);

    text.interactive = true;
    text.buttonMode = true;
    text.on('pointerdown', f);

    // border

    let graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xffffff);
    graphics.beginFill(0xffffff, 0.1);
    graphics.drawRect(0, 0, text.width * 2, text.height * 2);

    graphics.x = Math.floor(window.innerWidth / 2) - text.width;
    graphics.y = Math.floor(window.innerHeight / 2) - text.height;

    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.on('pointerdown', f);

    // menu

    app.stage.addChild(graphics);
    app.stage.addChild(text);

    window.menu = {
        graphics: graphics,
        text: text
    };

};

init.ws = () => {

    window.data = {};
    window.sprites = [];

    window.ws = new WebSocket('ws://' + window.location.host + ':81');

    ws.addEventListener('open', () => {
        console.log('WS open');
    });

    ws.addEventListener('close', () => {
        console.log('WS close');
    });

    ws.addEventListener('error', () => {
        console.log('WS error');
    });

    // let last = Date.now();

    ws.addEventListener('message', message => {

        // let current = Date.now();

        // console.log(current - last);

        // last = current;

        // console.log('WS message', message);

        data = JSON.parse(message.data);

        camera.sync(data.id);
        target.sync(data.targets);

    });

};

window.target = {

    store: [],

    get: id => target.store.filter(t => t.id === id)[0],

    append: data => {

        let color = getColor();

        let graphics = new PIXI.Graphics();

        graphics.lineStyle(1, color);
        graphics.beginFill(color, data.id === camera.id ? 0.8 : 0.2);
        graphics.drawRect(0, 0, 10, 10);

        graphics.x = data.x;
        graphics.y = data.y;

        let text = new PIXI.Text(data.name, {
            fill: 'white',
            fontSize: 10
        });

        text.anchor.set(0.5);
        text.x = data.x + 5;
        text.y = data.y + 20;

        let t = {
            id: data.id,
            name: data.name,
            sprite: graphics,
            text: text
        };

        target.store.push(t);
        world.addChild(graphics);
        world.addChild(text);

        return t;

    },

    update: data => {

        let t = target.get(data.id);

        t.sprite.x = data.x;
        t.sprite.y = data.y;
        t.text.x = data.x + 5;
        t.text.y = data.y + 20;

        return t;

    },

    remove: id => {

        let t = target.get(id);

        world.removeChild(t.sprite);
        world.removeChild(t.text);
        target.store.splice(target.store.indexOf(t), 1);

    },

    sync: ds => {

        let ids = [];

        target.store.forEach(t => {

            if (!ds.filter(d => d.id === t.id)[0]) ids.push(t.id);

        });

        ids.forEach(id => target.remove(id));

        ds.forEach(d => target.get(d.id) ? target.update(d) : target.append(d));

    }

};

window.camera = {

    target: undefined,

    sync: id => {

        if (camera.target) {

            world.x = Math.round(window.innerWidth / 2) - camera.target.sprite.x;
            world.y = Math.round(window.innerHeight / 2) - camera.target.sprite.y;

        } else {
            camera.id = id;
            camera.target = target.get(id);
        }

    }

};

window.T = {
    start: 'START'
};

window.getColor = () => {

    if (!window.colorI) window.colorI = 0;

    return [
        0x000000,
        0x0000ff,
        0x00ff00,
        0x00ffff,
        0xff0000,
        0xff00ff,
        0xffff00,
        0xffffff
    ][colorI++ % 8];

};