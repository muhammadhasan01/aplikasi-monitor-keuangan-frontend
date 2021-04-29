import React, {Component} from 'react';

export class Header extends Component {
    showUserInfo(userInfo) {
        const { name, type, unit, subunit } = userInfo;
        return (
            <div style={{ textAlign: "right" }}>
                {name} <br />
                {type === "Admin" ? "Administrator" : unit + " - " + subunit}

            </div>
        )
    }

    render() {
        return (
        	<div className="header">
                <img src="./Logo_STEI.png" name="logo" alt="Logo STEI"/>
                <h1>Sistem Monitoring Anggaran</h1>
                Sekolah Teknik Elektro dan Informatika <br/>
                Institut Teknologi Bandung <br />
                {this.props.userInfo ? this.showUserInfo(this.props.userInfo) : null}
            </div>
         );
    }
}