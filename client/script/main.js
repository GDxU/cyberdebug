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
    world.interactive = true;
    world.on('pointerdown', e => {

        let x = e.data.global.x - world.x - 5;
        let y = e.data.global.y - world.y - 5;

        ws.send(JSON.stringify({
            action: {
                type: 'go',
                x: x,
                y: y
            }
        }));

        if (window.go) {

            go.x = x;
            go.y = y;

        } else {

            let graphics = new PIXI.Graphics();

            graphics.lineStyle(1,0xff0000);
            graphics.moveTo(0, 11);
            graphics.lineTo(11, 0);
            graphics.moveTo(0, 0);
            graphics.lineTo(11, 11);

            graphics.x = x;
            graphics.y = y;

            window.go = graphics;

            world.addChild(go);

        }

    });

    app.stage.addChild(world);

    app.ticker.add(delta => {

    });

};

window.action = {

    sync: () => {

        if (window.go && go.x === camera.target.sprite.x && go.y === camera.target.sprite.y) {

            world.removeChild(go);

            go.destroy({
                children: true,
                texture: true,
                baseTexture: true
            });

            window.go = undefined;

        }

    }

};


init.menu = () => {

    let f = () => {

        app.stage.removeChild(graphics);
        app.stage.removeChild(text);

        init.background();
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
    graphics.beginFill(0x35373b, 0.8);
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

init.background = () => {

    let graphics = new PIXI.Graphics();

    graphics.beginFill(0x272d37, 1);
    graphics.drawRect(0, 0, 99, 99);
    graphics.endFill();

    graphics.lineStyle(1, 0xffffff, 0.2);
    graphics.moveTo(98, 0);
    graphics.lineTo(0, 0);
    graphics.lineTo(0, 98);

    graphics.lineStyle(1, 0x000000, 0.2);
    graphics.moveTo(99, 1);
    graphics.lineTo(99, 99);
    graphics.lineTo(1, 99);

    let background = new PIXI.extras.TilingSprite(
        graphics.generateCanvasTexture(1, 1),
        20000,
        20000
    );

    world.addChild(background);

    let b = new PIXI.Graphics();

    b.lineStyle(1, 0xff0000, 0.8);
    b.drawRect(0, 0, 900, 900);

    b.x = 10000 - 450;
    b.y = 10000 - 450;

    world.addChild(b);

};

init.ws = () => {

    window.data = {};
    window.sprites = [];

    window.ws = new WebSocket('ws://' + window.location.host + ':81');

    ws.addEventListener('open', () => {

        // console.log('WS open');

        ws.send(JSON.stringify({
            camera: {
                w: window.innerWidth,
                h: window.innerHeight
            }
        }));

    });

    ws.addEventListener('close', () => {
        console.log('WS close');
    });

    ws.addEventListener('error', () => {
        console.log('WS error');
    });

    ws.addEventListener('message', message => {

        // console.log('WS message', message);

        window.data = JSON.parse(message.data);

        camera.sync(data.id);
        target.sync(data.targets);
        action.sync();
        debug.sync(data);

    });

};

window.target = {

    store: [],

    get: id => target.store.filter(t => t.id === id)[0],

    append: data => {

        let color = getColor(data.type);

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
            type: data.type,
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

        if (t.type !== data.type) {

            t.type = data.type;

            // remove

            world.removeChild(t.sprite);
            t.sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true
            });

            // create

            let color = getColor(data.type);

            let graphics = new PIXI.Graphics();

            graphics.lineStyle(1, color);
            graphics.beginFill(color, 0.2);
            graphics.drawRect(0, 0, 10, 10);

            graphics.x = data.x;
            graphics.y = data.y;

            // append

            t.sprite = graphics;

            world.addChild(graphics);

        }

    },

    remove: id => {

        let t = target.get(id);

        if (t) {

            world.removeChild(t.sprite);
            t.sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true
            });

            world.removeChild(t.text);
            t.text.destroy({
                destroyBase: true
            });

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

window.getColor = (index) => {

    let colors = [
        0x000000,
        0x0000ff,
        0x00ff00,
        0x00ffff,
        0xff0000,
        0xff00ff,
        0xffff00,
        0xffffff
    ];

    return colors[index % colors.length];

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
        d.style.backgroundColor = 'rgba(53, 55, 59, 0.8)';
        d.style.border = '1px solid rgba(255, 255, 255, 0.8)';

        debug.dom = {
            panel: document.body.appendChild(d),
            id: d.appendChild(document.createElement('div')),
            name: d.appendChild(document.createElement('div')),
            speed: d.appendChild(document.createElement('div')),
            position: d.appendChild(document.createElement('div')),
            boundary: d.appendChild(document.createElement('div')),
            window: d.appendChild(document.createElement('div')),
            world: d.appendChild(document.createElement('div')),
            users: d.appendChild(document.createElement('div')),
            bots: d.appendChild(document.createElement('div')),
            here: d.appendChild(document.createElement('div')),
            camera: d.appendChild(document.createElement('div')),
            buffer: d.appendChild(document.createElement('div')),
            range: d.appendChild(document.createElement('div')),
            keyboard: d.appendChild(document.createElement('div')),
            ms: d.appendChild(document.createElement('div')),
            tr: d.appendChild(document.createElement('div'))
        };

        debug.dom.ms.innerText = 'ms: 0';
        debug.dom.tr.innerText = 'tr: 0';

    },

    sync: (data) => {

        if (!debug.dom) debug.init();

        debug.dom.speed.innerText = 'speed: ' + data.speed;
        debug.dom.window.innerText = 'window: ' + window.innerWidth + ', ' + window.innerHeight;
        debug.dom.users.innerText = 'users: ' + data.users;
        debug.dom.bots.innerText = 'bots: ' + data.bots;
        debug.dom.here.innerText = 'here: ' + data.targets.length;
        debug.dom.camera.innerText = 'camera: ' + data.camera.join(', ');
        debug.dom.buffer.innerText = 'buffer: ' + data.buffer.join(', ');
        debug.dom.range.innerText = 'range: ' + data.range.join(', ');
        debug.dom.keyboard.innerText = 'keyboard: ' + keyboard.cmd.join(', ');

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