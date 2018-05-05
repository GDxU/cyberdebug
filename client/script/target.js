window.TARGET = {

    store: [],

    get: id => TARGET.store.filter(target => target.id === id)[0],

    append: t => {

        let target = {
            id: t.id,
            model: t.model,
            sprite: new PIXI.Sprite(TOOL.getModel(t.model))
        };

        target.sprite.x = t.x;
        target.sprite.y = t.y;

        TARGET.store.push(target);
        GAME.target.addChild(target.sprite);

    },

    update: t => {

        let target = TARGET.get(t.id);

        if (target) {

            if (target.model !== t.model) {

                target.model = t.model;

                GAME.target.removeChild(target.sprite);
                target.sprite.destroy();

                target.sprite = new PIXI.Sprite(TOOL.getModel(t.model));
                GAME.target.addChild(target.sprite);

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

    sync: data => {

        if (data.targets) {

            let ids = [];

            TARGET.store.forEach(target => {

                if (!data.targets.filter(t => t.id === target.id)[0]) ids.push(target.id);

            });

            ids.forEach(id => TARGET.remove(id));

            data.targets.forEach(t => TARGET.get(t.id) ? TARGET.update(t) : TARGET.append(t));

        }

        if (data.totals) {

            let html = '';

            data.totals.forEach(total => {

                html += '<tr>' +
                    '<td>' + total.name + '</td>' +
                    '<td>' + total.kill + '</td>' +
                    '<td>' + total.stun + '</td>' +
                    '<td>' + total.die + '</td>' +
                    '<td>' + total.score + '</td>' +
                    '</tr>';

            });

            GUI.total.table.innerHTML = html;

        }

    }

};