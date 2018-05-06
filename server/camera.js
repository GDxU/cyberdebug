let CAMERA = {};

CAMERA.sync = (ws, data) => {

    if (data.camera) {

        let w = parseInt(data.camera.w);
        let h = parseInt(data.camera.h);

        if (!isNaN(w) && !isNaN(h)) ws.camera = {
            w: w,
            h: h
        };

    }

};

module.exports = CAMERA;