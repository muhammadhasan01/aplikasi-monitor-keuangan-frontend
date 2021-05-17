import { textFilter } from "react-bootstrap-table2-filter";

export const dataUserTable = {
  getColumns,
};

function getColumns() {
  return [
    {
      dataField: "username",
      text: "Username",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "name",
      text: "Nama",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "userType",
      text: "Role",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "unit",
      text: "Unit",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "aksi",
      text: "Aksi",
    },
  ];
}
