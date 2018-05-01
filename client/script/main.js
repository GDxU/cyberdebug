window.addEventListener('load', () => {

    PIXI.utils.skipHello();

    init.keyboard();
    init.view();
    init.menu();

});

window.init = {};

init.view = () => {

    PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH;

    window.app = new PIXI.Application(window.innerWidth, window.innerHeight, {transparent: true});
    app.renderer.roundPixels = true;
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
        fontSize: 26
    });

    text.anchor.set(0.5);
    text.x = Math.floor(window.innerWidth / 2);
    text.y = Math.floor(window.innerHeight / 2);

    text.interactive = true;
    text.buttonMode = true;
    text.on('pointerdown', f);

    // border

    let graphics = new PIXI.Graphics();

    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.beginFill(0x000000, 0.8);
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
        debug.sync(data);

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
            fontSize: 13
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

    },

    update: data => {

        let t = target.get(data.id);

        t.sprite.x = data.x;
        t.sprite.y = data.y;
        t.text.x = data.x + 5;
        t.text.y = data.y + 20;

    },

    remove: id => {

        let t = target.get(id);

        if (t) {

            world.removeChild(t.sprite);
            world.removeChild(t.text);
            target.store.splice(target.store.indexOf(t), 1);

        }

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

    boundary: undefined,

    sync: id => {

        if (camera.target) {

            let w = Math.round(window.innerWidth / 2);
            let h = Math.round(window.innerHeight / 2);

            world.x = w - camera.target.sprite.x;
            world.y = h - camera.target.sprite.y;

            camera.boundary = [
                camera.target.sprite.x - w,
                camera.target.sprite.y - h,
                camera.target.sprite.x - w + window.innerWidth,
                camera.target.sprite.y - h + window.innerHeight
            ];

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

init.keyboard = () => {

    window.keyboard = {

        cmd: [],

        keys: {
            'KeyW': 'w',
            'KeyS': 's',
            'KeyA': 'a',
            'KeyD': 'd'
        },

        event: e => {

            let key = keyboard.keys[e.code];

            if (key) {

                if (e.type === 'keydown' && keyboard.cmd.indexOf(key) === -1) keyboard.cmd.push(key);
                if (e.type === 'keyup') {

                    let i = keyboard.cmd.indexOf(key);

                    if (i !== -1) keyboard.cmd.splice(i, 1);

                }

            }

        }

    };

    window.addEventListener('keydown', keyboard.event);
    window.addEventListener('keyup', keyboard.event);

};

window.debug = {

    dom: undefined,

    timestamps: [],

    init: () => {

        let d = document.createElement('div');

        d.style.position = 'fixed';
        d.style.left = '10px';
        d.style.top = '10px';
        d.style.padding = '10px';
        d.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        d.style.border = '1px solid rgba(255, 255, 255, 0.8)';

        debug.dom = {
            panel: document.body.appendChild(d),
            id: d.appendChild(document.createElement('div')),
            name: d.appendChild(document.createElement('div')),
            position: d.appendChild(document.createElement('div')),
            boundary: d.appendChild(document.createElement('div')),
            camera: d.appendChild(document.createElement('div')),
            world: d.appendChild(document.createElement('div')),
            users: d.appendChild(document.createElement('div')),
            bots: d.appendChild(document.createElement('div')),
            here: d.appendChild(document.createElement('div')),
            radius: d.appendChild(document.createElement('div')),
            keyboard: d.appendChild(document.createElement('div')),
            ms: d.appendChild(document.createElement('div')),
            tr: d.appendChild(document.createElement('div'))
        };

        debug.dom.ms.innerText = 'ms: 0';
        debug.dom.tr.innerText = 'tr: 0';

    },

    sync: (data) => {

        if (!debug.dom) debug.init();

        debug.dom.keyboard.innerText = 'keyboard: ' + keyboard.cmd.join(', ');
        debug.dom.camera.innerText = 'camera: ' + window.innerWidth + ', ' + window.innerHeight;
        debug.dom.users.innerText = 'users: ' + data.users;
        debug.dom.bots.innerText = 'bots: ' + data.bots;
        debug.dom.here.innerText = 'here: ' + data.targets.length;
        debug.dom.radius.innerText = 'radius: ' + data.radius;

        if (camera.target) {

            debug.dom.id.innerText = 'id: ' + camera.target.id;
            debug.dom.name.innerText = 'name: ' + camera.target.name;
            debug.dom.position.innerText = 'position: ' + camera.target.sprite.x + ', ' + camera.target.sprite.y;
            if (camera.boundary) debug.dom.boundary.innerText = 'boundary: ' + camera.boundary.join(', ');
            debug.dom.world.innerText = 'world: ' + world.x + ' ' + world.y;

        }

        debug.timestamps.push(Date.now());

        if (debug.timestamps[debug.timestamps.length - 1] - debug.timestamps[0] > 1000) {

            let s = 0;

            for (let i = 1; i < debug.timestamps.length; i++) s += debug.timestamps[i] - debug.timestamps[i - 1];

            let ms = s / (debug.timestamps.length - 1);
            let tr = 1000 / ms;

            debug.dom.ms.innerText = 'ms: ' + ms.toFixed(2);
            debug.dom.tr.innerText = 'tr: ' + tr.toFixed(2);

            debug.timestamps = [];

        }

    }

};