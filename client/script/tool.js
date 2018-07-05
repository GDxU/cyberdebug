window.TOOL = {

    colors: {

        k: '#000000',

        r: '#ff0000',
        g: '#00ff00',
        b: '#0000ff',

        c: '#00ffff',
        m: '#ff00ff',
        y: '#ffff00',

        w: '#ffffff'

    },

    getRandomInt: (min, max) => {

        if (!max) {

            max = min;
            min = 0;

        }

        return Math.floor(Math.random() * (max - min + 1)) + min;

    },

    getName: () => {

        let n = [
            'Эдвард',
            'Хэйтем',
            'Дункан',
            'Бартоломью',
            'Вудс',
            'Джек',
            'Бенджамин',
            'Джон',
            'Чарльз',
            'Стид'
        ];

        let s = [
            'Кенуэй',
            'Рид',
            'Скотт',
            'Уолпол',
            'Робертс',
            'Роджерс',
            'Тэтч',
            'Рэкхем',
            'Хорниголд',
            'Вэйн',
            'Боннет'
        ];

        return n[TOOL.getRandomInt(n.length - 1)] + ' ' + s[TOOL.getRandomInt(n.length - 1)];

    },

    isPointInPoligon: (point, polygon) => {

        let x = point.x, y = point.y;
        let inside = false;

        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {

            let xi = polygon[i].x, yi = polygon[i].y;
            let xj = polygon[j].x, yj = polygon[j].y;
            let intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if (intersect) inside = !inside;

        }

        return inside;

    },

    getDistance: (a, b) => {

        let dx = b.x - a.x;
        let dy = b.y - a.y;

        return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    },

    getClosestPointToLine: (point, line) => {

        let a = line[0];
        let b = line[1];
        let p = point;

        let dx = b.x - a.x;
        let dy = b.y - a.y;

        let d = Math.pow(dx, 2) + Math.pow(dy, 2);

        if (d === 0) return a;

        let t = ((p.x - a.x) * (b.x - a.x) + (p.y - a.y) * (b.y - a.y)) / d;

        if (t < 0) return a;
        if (t > 1) return b;

        return {
            x: a.x + t * (b.x - a.x),
            y: a.y + t * (b.y - a.y)
        };

    },

    getJSON: (url, callback) => {

        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);

        xhr.onreadystatechange = () => {

            if (xhr.readyState === xhr.DONE && xhr.status === 200) {

                callback(JSON.parse(xhr.responseText));

            }

        };

        xhr.send();

    }

};