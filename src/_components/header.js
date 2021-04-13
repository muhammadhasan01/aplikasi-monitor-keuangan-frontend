import React, {Component} from 'react';

class Header extends Component {
    render() { 
        return (
        	<div class="header">
            <img src="./Logo_STEI.png" name="logo" alt="Logo STEI"/>
            <h1>Sistem Monitoring Anggaran</h1>
            Sekolah Teknik Elektro dan Informatika <br/>
            Institut Teknologi Bandung
         </div>
         );
    }
}

export default Header;