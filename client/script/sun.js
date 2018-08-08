window.SUN = {

    sync: () => {

        if (WS.data.sun) {

            LAYER.world.filters = [new PIXI.filters.AdjustmentFilter({
                contrast: 2 - WS.data.sun.value
            })];

        }

    }

};