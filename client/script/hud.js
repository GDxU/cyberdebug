window.HUD = {

    store: [],

    init: () => {

        for (let i = 0; i < 5; i++) {

            let hud = new PIXI.Sprite(LOADER.loader.resources['hud' + i].texture);

            hud.visible = false;
            hud.anchor.set(0.5, 0.5);

            HUD.store.push(hud);
            GAME.marker.addChild(hud);

        }

    },

    sync: () => {

        if (!HUD.store.length) HUD.init();

        if (USER.contract) {

            HUD.store.forEach((hud, i) => {

                hud.x = USER.target.sprite.x;
                hud.y = USER.target.sprite.y;
                hud.rotation = USER.contract.azimuth;
                hud.visible = USER.contract.hud === i;

            });

        } else HUD.store.forEach(hud => hud.visible = false);

    }

};