let CAMERA = {};

CAMERA.sync = (ws, data) => {

    if (data.camera) {

        let w = parseInt(data.camera.w);
        let h = parseInt(data.camera.h);

        if (!isNaN(w) && !isNaN(h)) {

            if (w > 1000) w = 1000;
            if (h > 1000) h = 1000;

            ws.camera = {
                w: w,
                h: h
            };
        }

    }

};

module.exports = CAMERA;