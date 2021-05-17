import { formatRupiah, namaBulanIndonesia } from "_helpers";
import { textFilter } from "react-bootstrap-table2-filter";

export const dataPengeluaranTable = {
  getColumns,
  getData,
};

function getColumns() {
  let triwulans = [];
  for (let i = 1; i <= 4; i++) {
    triwulans.push({
      dataField: `triwulan${i}`,
      text: `Triwulan ${i}`,
      sort: true,
      formatter: formatRupiah,
    });
  }
  return [
    {
      dataField: "unit",
      text: "Unit",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "sub_unit",
      text: "Subunit",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "year",
      text: "Tahun",
      sort: true,
      filter: textFilter(),
    },
    ...triwulans,
    {
      dataField: "total",
      text: "Total Pengeluaran",
      sort: true,
      formatter: formatRupiah,
    },
  ];
}

function getData(RKAs) {
  RKAs.sort((a, b) => {
    if (a.unit === b.unit) {
      if (a.sub_unit === b.sub_unit) {
        if (a.year === b.year) {
          return -1;
        }
        return a.year < b.year ? 1 : -1;
      }
      return a.sub_unit < b.sub_unit ? 1 : -1;
    }
    return a.unit < b.unit ? 1 : -1;
  });
  const months = namaBulanIndonesia.map((bulan) => bulan.toLowerCase());
  for (let i = 1; i < RKAs.length; i++) {
    if (RKAs[i - 1].unit !== RKAs[i].unit) continue;
    if (RKAs[i - 1].sub_unit !== RKAs[i].sub_unit) continue;
    if (RKAs[i - 1].year !== RKAs[i].year) continue;
    months.forEach((month) => {
      RKAs[i]["penggunaan"][month] += RKAs[i - 1]["penggunaan"][month];
    });
  }
  const data = [];
  for (let i = 0; i < RKAs.length; i++) {
    if (
      i + 1 === RKAs.length ||
      RKAs[i].unit !== RKAs[i + 1].unit ||
      RKAs[i].sub_unit !== RKAs[i + 1].sub_unit ||
      RKAs[i].year !== RKAs[i + 1].year
    ) {
      const { unit, sub_unit, year, penggunaan } = RKAs[i];
      let total = 0;
      months.forEach((month) => (total += penggunaan[month]));
      let curObject = { unit, sub_unit, year, total };
      for (let i = 0; i < 4; i++) {
        let cur = 0;
        for (let j = 3 * i; j < 3 * i + 3; j++) {
          cur += penggunaan[months[j]];
        }
        const str = `triwulan${i + 1}`;
        curObject[str] = cur;
      }
      data.push(curObject);
    }
  }
  return data;
}
