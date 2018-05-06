window.TOTAL = {

    sync: () => {

        if (WS.data.totals) {

            let html = '';

            WS.data.totals.forEach(total => {

                html += '<tr>' +
                    '<td>' + total.id + '</td>' +
                    '<td>' + total.name + '</td>' +
                    '<td>' + total.kill + '</td>' +
                    '<td>' + total.stun + '</td>' +
                    '<td>' + total.die + '</td>' +
                    '<td>' + total.score + '</td>' +
                    '<td>' + total.hunter + '</td>' +
                    '<td>' + (total.contract ? total.contract.id : '') + '</td>' +
                    '<td>' + (total.contract ? total.contract.name : '') + '</td>' +
                    '<td>' + (total.contract ? total.contract.model : '') + '</td>' +
                    '<td>' + (total.contract ? total.contract.hunter : '') + '</td>' +
                    '</tr>';

            });

            GUI.total.table.innerHTML = html;

        }

    }

};