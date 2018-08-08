let SUN = {};

SUN.i = 0;

SUN.min = 0.5;
SUN.max = 1;
SUN.k = (SUN.max - SUN.min) / 720;

SUN.start = () => {

    setInterval(() => {

        SUN.i++;

    }, 1000);

};

SUN.to2Char = x => x < 10 ? '0' + x : x;

SUN.export = () => {

    let s = SUN.i % 1440;
    let g = 180 <= s && s < 900 ? s - 180 : 1620 - s;

    if (g > 1440) g -= 1440;

    return {
        now: SUN.to2Char(Math.floor(s / 60)) + ':' + SUN.to2Char(Math.floor(s % 60)),
        value: SUN.min + g * SUN.k
    };

};

module.exports = SUN;