window.TOOL = {

    getColor: i => {

        i = i || 0;

        let colors = [
            0x0000ff,
            0x00ff00,
            0x00ffff,
            0xff0000,
            0xff00ff,
            0xffff00,
            0xffffff
        ];

        return colors[i % colors.length];

    },

    getRandomInt: (min, max) => {

        if (!max) {

            max = min;
            min = 0;

        }

        return Math.floor(Math.random() * (max - min + 1)) + min;

    },

    getNickname: () => {

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

    }

};