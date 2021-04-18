import React, { Component } from "react";
import { ConfirmActionPopup, NewUserForm, EditUserForm, UserRow } from "./helpers";
import { UserDataService } from "_services/user-service";
import { UnitsDataService } from "_services/units-service";
import './AdminPengurusanAkun.css';

export default class AdminPengurusanAkun extends Component {
    constructor(props) {
        super(props);
        this.acceptAction = this.acceptAction.bind(this);
        this.cancelAction = this.cancelAction.bind(this);
        this.onChangeUnit = this.onChangeUnit.bind(this);
        this.onChangeSubUnit = this.onChangeSubUnit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCPassword = this.onChangeCPassword.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            Users: [],
            Units: [],
            SubUnits: [],
            currentUser: {
                _id: null,
                unit: "",
                subunit: "",
                name: "",
                username: "",
                email: "",
                userType: "User",
                password: "",
                c_password: "",
            },
            currentAction: "",
            confirmAction: false,
            showConfirmAction: false,
            showNewUserForm: false,
            showEditUserForm: false,
        };
    }

    componentDidMount() {
        this.retrieveUsers();
        this.retrieveUnits();
        this.retrieveSubUnits();
    }

    retrieveUnits() {
        UnitsDataService.getDistinctUnits()
            .then(response => {
                this.setState({
                    Units: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveSubUnits() {
        UnitsDataService.getSubUnits()
            .then(response => {
                this.setState({
                    SubUnits: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    retrieveUsers() {
        UserDataService.getUsers()
            .then(response => {
                this.setState({
                    Users: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveUnits();
        this.retrieveSubUnits();
        this.retrieveUsers();
    }

    showConfirmAction() {
        this.setState({
            confirmAction: false,
            showConfirmAction: true,
        })
    }

    acceptAction() {
        if (this.state.showNewUserForm) {
            this.saveUser();
        } else if (this.state.showEditUserForm) {
            this.updateUser();
        }
        this.setState({
            currentAction: "",
            confirmAction: true,
            showConfirmAction: false,
            showNewUserForm: false,
            showEditUserForm: false
        })
    }

    cancelAction() {
        this.setState({
            confirmAction: false,
            showConfirmAction: false
        })
    }

    showNewUserForm() {
        this.setState({
            currentAction: "Create New User",
            showNewUserForm: true,
            showEditUserForm: false
        })
    }

    hideNewUserForm() {
        this.setState({
            currentUser: {
                _id: null,
                unit: "",
                subunit: "",
                name: "",
                username: "",
                email: "",
                userType: "User",
                password: "",
                c_password: "",
            },
            currentAction: "",
            confirmAction: false,
            showNewUserForm: false,
            showConfirmAction: false
        })
    }

    showEditUserForm() {
        this.setState({
            currentAction: "Edit User",
            showNewUserForm: false,
            showEditUserForm: true
        })
    }

    hideEditUserForm() {
        this.setState({
            currentUser: {
                _id: null,
                unit: "",
                subunit: "",
                name: "",
                username: "",
                email: "",
                userType: "User",
                password: "",
                c_password: "",
            },
            currentAction: "",
            confirmAction: false,
            showEditUserForm: false,
            showConfirmAction: false
        })
    }

    onChangeUnit(e) {
        const unit = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    unit: unit
                }
            };
        });
    }

    onChangeSubUnit(e) {
        const subunit = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    subunit: subunit
                }
            };
        });
    }

    onChangeName(e) {
        const name = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    name: name
                }
            };
        });
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    username: username
                }
            };
        });
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    email: email
                }
            };
        });
    }

    onChangeUserType(e) {
        const userType = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    userType: userType
                }
            };
        });
    }

    onChangePassword(e) {
        const password = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    password: password
                }
            };
        });
    }

    onChangeCPassword(e) {
        const c_password = e.target.value;

        this.setState(function(prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    c_password: c_password
                }
            };
        });
    }

    renderUnitOptions() {
        let unit_elements = [];
        let unit_list = this.state.Units;
        if (this.state.currentUser.unit === "") {
            this.state.currentUser.unit = unit_list[0];
        }
        unit_list.forEach(unit =>{
            unit_elements.push(
                <option
                    value={unit}
                >
                    {unit}
                </option>
            );
        });
        return unit_elements;
    }

    renderSubUnitOptions() {
        let subunit_elements = [];
        let subunit_list = this.state.SubUnits;
        if (this.state.currentUser.subunit === ""){
            this.state.currentUser.subunit = subunit_list[0];
        }
        subunit_list.forEach(subunit => {
            subunit_elements.push(
                <option
                    value={subunit}
                >
                    {subunit}
                </option>
            );
        });
        return subunit_elements;
    }

    saveUser() {
        const confirmAction = this.state.confirmAction;
        const data = {
            unit: this.state.currentUser.unit,
            subunit: this.state.currentUser.subunit,
            name: this.state.currentUser.name,
            username: this.state.currentUser.username,
            email: this.state.currentUser.email,
            userType: this.state.currentUser.userType,
            password: this.state.currentUser.password
        };

        if (confirmAction) {
            UserDataService.createUser(data)
                .then(response => {
                    console.log(response.data);
                    this.hideNewUserForm();
                    this.retrieveUsers();
                })
                .catch(e => {
                    console.log(e);
                    this.hideNewUserForm();
                    this.retrieveUsers();
                });
        } else {
            this.hideNewUserForm();
            this.retrieveUsers();
        }
    }

    getUser(id) {
        UserDataService.getUserByID(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {
        const confirmAction = this.state.confirmAction;
        const data = {
            unit: this.state.currentUser.unit,
            subunit: this.state.currentUser.subunit,
            name: this.state.currentUser.name,
            username: this.state.currentUser.username,
            email: this.state.currentUser.email,
            userType: this.state.currentUser.userType,
            password: this.state.currentUser.password
        };

        if (confirmAction) {
            UserDataService.updateUser(
                this.state.currentUser._id,
                data
            )
                .then(response => {
                    console.log(response.data);
                    this.hideEditUserForm();
                    this.retrieveUsers();
                })
                .catch(e => {
                    console.log(e);
                    this.hideEditUserForm();
                    this.retrieveUsers();
                });
        } else {
            this.hideEditUserForm();
            this.retrieveUsers();
        }

    }

    editUser(id) {
        this.getUser(id);
        this.showEditUserForm();
    }

    deleteUser(id) {
        UserDataService.deleteUser(id)
            .then(() => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    getUnit(id) {
        let UnitName = "";
        let unit_list = this.state.Units;
        unit_list.forEach(unit => {
            if (unit._id === id) {
                UnitName = unit.name;
            }
        });
        return UnitName;
    }

    renderUsers() {
        let user_elements = [];
        let user_list = this.state.Users;
        if (user_list.length !== 0) {
            for (let i = 0; i < user_list.length; i++) {
                let temp = user_list[i];
                user_elements.push(
                    <UserRow
                        username={temp['username']}
                        name={temp['name']}
                        userType={temp['userType']}
                        unit={temp['unit']}
                        _id={temp['_id']}
                        onClickEdit={() => this.editUser(temp['_id'])}
                        onClickDelete={() => this.deleteUser(temp['_id'])}
                    />
                );
            }
        } else {
            user_elements.push(<tr><td><h1>Belum Ada Akun</h1></td></tr>)
        }
        return user_elements;
    }

    render() {
        const { currentUser, currentAction, showConfirmAction, showNewUserForm, showEditUserForm } = this.state;

        return (
            <div id="user-management">
                <div id="user-list">
                    <h4>Users List</h4>
                    <button onClick={() => this.showNewUserForm()}>Add New User</button>
                    <table id="user-table">
                        <tr>
                            <th><p>Username</p></th>
                            <th><p>Name</p></th>
                            <th><p>Role</p></th>
                            <th><p>Unit</p></th>
                            <th colSpan="2"><p>Actions</p></th>
                        </tr>
                        {this.renderUsers()}
                    </table>
                </div>
                {showConfirmAction ? (
                    <div>
                        <div className="formDisable" />
                        <ConfirmActionPopup
                            title={currentAction}
                            acceptAction={this.acceptAction}
                            cancelAction={this.cancelAction}
                        />
                    </div>
                ) : (
                    ''
                )
                }
                {showNewUserForm ? (
                    <div>
                        <div className="pageDisable"/>
                        <NewUserForm
                            username={currentUser.username}
                            onChangeUsername={this.onChangeUsername}
                            email={currentUser.email}
                            onChangeEmail={this.onChangeEmail}
                            name={currentUser.name}
                            onChangeName={this.onChangeName}
                            password={currentUser.password}
                            onChangePassword={this.onChangePassword}
                            c_password={currentUser.c_password}
                            onChangeCPassword={this.onChangeCPassword}
                            userType={currentUser.userType}
                            onChangeUserType={this.onChangeUserType}
                            unit={currentUser.unit}
                            onChangeUnit={this.onChangeUnit}
                            renderUnitOptions={() => this.renderUnitOptions()}
                            subunit={currentUser.subunit}
                            onChangeSubUnit={this.onChangeSubUnit}
                            renderSubUnitOptions={() => this.renderSubUnitOptions()}
                            hideNewUserForm={() => this.hideNewUserForm()}
                            saveUser={() => this.showConfirmAction()}
                        />
                    </div>
                ) : (
                    ''
                )
                }
                {showEditUserForm ? (
                    <div>
                        <div className="pageDisable" />
                        <EditUserForm
                            username={currentUser.username}
                            onChangeUsername={this.onChangeUsername}
                            name={currentUser.name}
                            onChangeName={this.onChangeName}
                            userType={currentUser.userType}
                            onChangeUserType={this.onChangeUserType}
                            unit={currentUser.unit}
                            onChangeUnit={this.onChangeUnit}
                            renderUnitOptions={() => this.renderUnitOptions()}
                            subunit={currentUser.subunit}
                            onChangeSubUnit={this.onChangeSubUnit}
                            renderSubUnitOptions={() => this.renderSubUnitOptions()}
                            hideEditUserForm={() => this.hideEditUserForm()}
                            updateUser={() => this.showConfirmAction()}
                        />
                    </div>
                ) : (
                    ''
                )
                }
            </div>
        );
    }
}