import { formatRupiah } from "_helpers";
import { textFilter } from "react-bootstrap-table2-filter";

export const dataPaguAnggaran = {
  getColumns,
};

function getColumns(ADOs) {
  const ADOField = ADOs.map((ADO) => {
    return {
      dataField: ADO,
      text: ADO,
      sort: true,
      formatter: formatRupiah,
    };
  });
  return [
    {
      dataField: "unit",
      text: "Unit",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "subunit",
      text: "Subunit",
      filter: textFilter(),
    },
    ...ADOField,
    {
      dataField: "total",
      text: "Total",
      sort: true,
      formatter: formatRupiah,
    },
    {
      dataField: "aksi",
      text: "Aksi",
    },
  ];
}
