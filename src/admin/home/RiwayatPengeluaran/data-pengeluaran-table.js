import { formatRupiah, formatTanggal } from "_helpers";
import { textFilter } from "react-bootstrap-table2-filter";

export const dataPengeluaranTable = {
    getColumns
}

function getColumns() {
    return [
        {
            dataField: 'tanggal',
            text: 'Tanggal',
            sort: true,
            formatter: formatTanggal
        }, {
            dataField: 'jumlah',
            text: 'Jumlah',
            sort: true,
            formatter: formatRupiah
        }, {
            dataField: 'unit',
            text: 'Unit',
            filter: textFilter()
        }, {
            dataField: 'sub_unit',
            text: 'Subunit',
            filter: textFilter()
        }, {
            dataField: 'rincian_belanja',
            text: "Rencana Belanja",
            filter: textFilter()
        }, {
            dataField: 'action',
            text: "Aksi"
        }];
}