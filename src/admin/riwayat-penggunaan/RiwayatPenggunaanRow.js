function RiwayatPenggunaanRow(props){

    return (
      <tr>
        <td><p>{props.rka.unit}</p></td>
        <td><p>{props.rka.sub_unit}</p></td>
        <td><p>{props.rka.rincian_belanja}</p></td>
        <td><p>{props.rka.penggunaan.januari}</p></td>
        <td><p>{props.rka.penggunaan.februari}</p></td>
        <td><p>{props.rka.penggunaan.maret}</p></td>
        <td><p>{props.rka.penggunaan.april}</p></td>
        <td><p>{props.rka.penggunaan.mei}</p></td>
        <td><p>{props.rka.penggunaan.juni}</p></td>
        <td><p>{props.rka.penggunaan.juli}</p></td>
        <td><p>{props.rka.penggunaan.agustus}</p></td>
        <td><p>{props.rka.penggunaan.september}</p></td>
        <td><p>{props.rka.penggunaan.oktober}</p></td>
        <td><p>{props.rka.penggunaan.november}</p></td>
        <td><p>{props.rka.penggunaan.desember}</p></td>
        <td><p>{props.rka.total_penggunaan}</p></td>
      </tr>
    )
  }

export default RiwayatPenggunaanRow;