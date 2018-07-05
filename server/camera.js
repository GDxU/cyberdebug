let CAMERA = {};

CAMERA.sync = (ws, data) => {

    if (data.camera) {

        let w = parseInt(data.camera.w);
        let h = parseInt(data.camera.h);

        if (!isNaN(w) && !isNaN(h)) {

            if (w > 2560) w = 2560;
            if (h > 947) h = 947;

            ws.camera = {
                w: w,
                h: h
            };
        }

    }

};

module.exports = CAMERA;