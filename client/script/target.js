window.TARGET = {

    store: [],

    get: id => TARGET.store.filter(target => target.id === id)[0],

    append: t => {

        let target = {
            id: t.id,
            model: t.model,
            sprite: new PIXI.Sprite(TOOL.getModel(t.model))
        };

        target.sprite.anchor.set(0.5, 0.5);
        target.sprite.target = target;
        target.sprite.x = t.x;
        target.sprite.y = t.y;

        TARGET.store.push(target);
        GAME.target.addChild(target.sprite);

        if (USER.id !== target.id) {
            target.sprite.cursor = 'hover';
            target.sprite.interactive = true;
            target.sprite.on('pointerover', e => e.currentTarget.filters = USER.contract || USER.hunter ? [new PIXI.filters.OutlineFilter(1, 0xffff00, 1)] : undefined);
            target.sprite.on('pointerout', e => e.currentTarget.filters = undefined);
        }

    },

    update: t => {

        let target = TARGET.get(t.id);

        if (target) {

            if (target.model !== t.model) {

                target.model = t.model;

                GAME.target.removeChild(target.sprite);
                target.sprite.destroy();

                target.sprite = new PIXI.Sprite(TOOL.getModel(t.model));
                target.sprite.target = target;
                GAME.target.addChild(target.sprite);

                if (USER.id !== target.id) {
                    target.sprite.cursor = 'hover';
                    target.sprite.interactive = true;
                    target.sprite.on('pointerover', e => e.currentTarget.filters = USER.contract || USER.hunter ? [new PIXI.filters.OutlineFilter(1, 0xffff00, 1)] : undefined);
                    target.sprite.on('pointerout', e => e.currentTarget.filters = undefined);
                }

            }

            target.sprite.x = t.x;
            target.sprite.y = t.y;

        }

    },

    remove: id => {

        let target = TARGET.get(id);

        if (target) {

            GAME.target.removeChild(target.sprite);
            target.sprite.destroy();

            TARGET.store.splice(TARGET.store.indexOf(target), 1);

        }

    },

    sync: () => {

        if (WS.data.targets) {

            let ids = [];

            TARGET.store.forEach(target => {

                if (!WS.data.targets.filter(t => t.id === target.id)[0]) ids.push(target.id);

            });

            ids.forEach(id => TARGET.remove(id));

            WS.data.targets.forEach(t => TARGET.get(t.id) ? TARGET.update(t) : TARGET.append(t));

        }

    }

};