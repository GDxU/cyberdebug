window.TOOL = {

    getModel: i => {

        i = i || 0;

        let names = [
            'white',
            'cyan',
            'magenta',
            'yellow'
        ];

        let name = names[i % names.length];

        return LOADER.loader.resources[name].texture;

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