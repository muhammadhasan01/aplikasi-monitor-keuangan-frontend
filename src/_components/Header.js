import React, {Component} from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    showUserInfo(userInfo) {
        const { name, type, unit } = userInfo;
        return (
            <div style={{ textAlign: "right" }}>
                {name} <br />
                {type === "Admin" ? "Administrator" : unit}
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

export default Header;