let CAMERA = {};

CAMERA.sync = (ws, data) => {

    if (data.camera) {

        let w = parseInt(data.camera.w);
        let h = parseInt(data.camera.h);

        if (!isNaN(w) && !isNaN(h)) {

            if (w > 4000) w = 4000;
            if (h > 4000) h = 4000;

            ws.camera = {
                w: w,
                h: h
            };
        }

    }

};

module.exports = CAMERA;