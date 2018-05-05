window.TOTAL = {

    sync: () => {

        if (WS.data.totals) {

            let html = '';

            WS.data.totals.forEach(total => {

                html += '<tr>' +
                    '<td>' + total.name + '</td>' +
                    '<td>' + total.kill + '</td>' +
                    '<td>' + total.stun + '</td>' +
                    '<td>' + total.die + '</td>' +
                    '<td>' + total.score + '</td>' +
                    '</tr>';

            });

            GUI.total.table.innerHTML = html;

        }

    }

};