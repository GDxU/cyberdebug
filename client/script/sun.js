window.SUN = {

    sync: () => {

        if (WS.data.day) {

            LAYER.world.filters = [new PIXI.filters.AdjustmentFilter({
                contrast: 2 - WS.data.sun.value
            })];

        }

    }

};