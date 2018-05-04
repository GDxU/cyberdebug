window.TARGET = {

    store: [],

    get: id => TARGET.store.filter(target => target.id === id)[0],

    append: t => {

        let color = TOOL.getColor(t.model);

        let sprite = new PIXI.Graphics();

        sprite.lineStyle(1, color);
        sprite.beginFill(color, t.id === USER.id ? 0.8 : 0.2);
        sprite.drawRect(0, 0, 10, 10);

        sprite.x = t.x;
        sprite.y = t.y;

        let target = {
            id: t.id,
            model: t.model,
            sprite: sprite
        };

        TARGET.store.push(target);
        GAME.world.addChild(sprite);

    },

    update: t => {

        let target = TARGET.get(t.id);

        target.sprite.x = t.x;
        target.sprite.y = t.y;

        if (target.model !== t.model) {

            target.model = t.model;

            // remove

            GAME.world.removeChild(target.sprite);

            target.sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true
            });

            // create

            let color = TOOL.getColor(t.model);

            let sprite = new PIXI.Graphics();

            sprite.lineStyle(1, color);
            sprite.beginFill(color, 0.2);
            sprite.drawRect(0, 0, 10, 10);

            sprite.x = t.x;
            sprite.y = t.y;

            // append

            target.sprite = sprite;

            GAME.world.addChild(sprite);

        }

    },

    remove: id => {

        let target = TARGET.get(id);

        if (target) {

            GAME.world.removeChild(target.sprite);

            target.sprite.destroy({
                children: true,
                texture: true,
                baseTexture: true
            });

            TARGET.store.splice(TARGET.store.indexOf(target), 1);

        }

    },

    sync: data => {

        if (data.targets) {

            let ids = [];

            TARGET.store.forEach(target => {

                if (!data.targets.filter(t => t.id === target.id)[0]) ids.push(target.id);

            });

            ids.forEach(id => TARGET.remove(id));

            data.targets.forEach(t => TARGET.get(t.id) ? TARGET.update(t) : TARGET.append(t));

        }

    }

};