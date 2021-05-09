import { namaBulanIndonesia, stringToColor } from '_helpers';

export const dataLineChartPengeluaran = {
    getData,
    getOptions
};

function getData(RKAs, year) {
    RKAs = RKAs.filter((RKA) => (RKA.year === year));
    const units = new Set();
    RKAs.forEach((RKA) => { units.add(RKA.unit) });
    const dataUnits = {};
    const months = namaBulanIndonesia.map(bulan => bulan.toLowerCase());
    for (const unit of units) {
        dataUnits[unit] = {};
        for (const month of months) {
            dataUnits[unit][month] = 0;
        }
    }
    RKAs.forEach((RKA) => {
        const { unit, penggunaan } = RKA;
        for (const month of months) {
            dataUnits[unit][month] += penggunaan[month];
        }
    });
    let datasets = [];
    for (const unit of units) {
        let data = [];
        for (const month of months) {
            data.push(dataUnits[unit][month]);
        }
        const color = stringToColor(unit);
        datasets.push({
            label: unit,
            data,
            fill: false,
            backgroundColor: color,
            borderColor: color
        });
    }
    return {
        labels: namaBulanIndonesia,
        datasets
    };
}

export function getOptions() {
    return {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        }
    };
}