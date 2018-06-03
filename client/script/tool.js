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

    isTargetOverBuilding: (target, building) => {

        return target.y > building.y ||

            TOOL.isPointInPoligon(target, [
                {x: building.x -   8, y: building.y      },
                {x: building.x -   8, y: building.y - 120},
                {x: building.x      , y: building.y - 120},
                {x: building.x + 239, y: building.y      }
            ]) ||

            TOOL.isPointInPoligon(target, [
                {x: building.x + 240, y: building.y      },
                {x: building.x + 479, y: building.y - 120},
                {x: building.x + 487, y: building.y - 120},
                {x: building.x + 487, y: building.y      }
            ]);

    },

    sortObjectLayer: () => {

        LAYER.object.children.sort((a, b) => {
            if (a.class === b.class) return a.y > b.y ? 1 : (b.y > a.y ? -1 : 0);
            else {

                if (a.class === 'TARGET') {

                    return TOOL.isTargetOverBuilding(a, b) ? 1 : -1;

                } else {

                    return TOOL.isTargetOverBuilding(b, a) ? -1 : 1;

                }

            }
        });

    }

};