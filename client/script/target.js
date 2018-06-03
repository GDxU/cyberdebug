window.TARGET = {

    store: [],

    get: id => TARGET.store.filter(target => target.id === id)[0],

    append: t => {

        let target = {
            id: t.id,
            model: t.model,
            action: t.action,
            side: t.side,
            sprite: new PIXI.extras.AnimatedSprite(TEXTURE.character.get(t.model, t.action, t.side))
        };

        target.sprite.anchor.set(0.5, 0.5);
        target.sprite.target = target;
        target.sprite.x = t.x;
        target.sprite.y = t.y;

        target.sprite.animationSpeed = 0.01;
        target.sprite.play();

        TARGET.store.push(target);
        LAYER.object.addChild(target.sprite);

        if (USER.id !== target.id) {
            // target.sprite.cursor = 'hover';
            target.sprite.interactive = true;
            target.sprite.on('pointerover', e => {
                e.currentTarget.filters = USER.contract || USER.hunter ? [new PIXI.filters.OutlineFilter(1 * CAMERA.scale, 0xffff00, 1)] : undefined;
                e.currentTarget.cursor = USER.contract || USER.hunter ? 'hover' : 'default';
            });
            target.sprite.on('pointerout', e => e.currentTarget.filters = undefined);
        }

    },

    update: t => {

        let target = TARGET.get(t.id);

        if (target) {

            target.sprite.x = t.x;
            target.sprite.y = t.y;

            if (

                target.model === t.model &&
                target.action === t.action &&
                target.side === t.side

            ) {

                if (target.action === 'stand') {

                    target.sprite.stop();
                    target.sprite.animationSpeed = 0;

                }

                if (target.action === 'walk') {

                    target.sprite.animationSpeed = 1 / 5;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

                if (target.action === 'run') {

                    target.sprite.animationSpeed = 1 / 3;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

                if (target.action === 'kill') {

                    target.sprite.animationSpeed = 1 / 30;
                    target.sprite.loop = false;
                    target.sprite.play();

                }

                if (target.action === 'killed') {

                    target.sprite.animationSpeed = 1 / 45;
                    target.sprite.loop = false;
                    target.sprite.play();

                }

                if (target.action === 'stun') {

                    target.sprite.animationSpeed = 1 / 5;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

                if (target.action === 'stunned') {

                    target.sprite.animationSpeed = 1 / 5;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

                if (target.action === 'miss') {

                    target.sprite.animationSpeed = 1 / 5;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

                if (target.action === 'missed') {

                    target.sprite.animationSpeed = 1 / 5;
                    target.sprite.loop = true;
                    target.sprite.play();

                }

            } else {

                target.model = t.model;
                target.action = t.action;
                target.side = t.side;

                target.sprite.textures = TEXTURE.character.get(t.model, t.action, t.side);

            }

        }

    },

    remove: id => {

        let target = TARGET.get(id);

        if (target) {

            LAYER.object.removeChild(target.sprite);
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