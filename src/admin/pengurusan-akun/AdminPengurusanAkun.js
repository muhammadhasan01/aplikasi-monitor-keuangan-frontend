import React, { Component } from "react";
import { ConfirmActionPopup, NewUserForm, EditUserForm } from "./helpers";
import { UserDataService } from "_services/user-service";
import { UnitsDataService } from "_services/units-service";
import { Button, Container } from "react-bootstrap";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import { dataUserTable } from "./data-user-table";
import { TiUserAddOutline, TiUserDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { BottomTooltip } from "_components";

export class AdminPengurusanAkun extends Component {
  constructor(props) {
    super(props);
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
      showConfirmActionModal: false,
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
      .then((response) => {
        this.setState({
          Units: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveSubUnits() {
    UnitsDataService.getSubUnits()
      .then((response) => {
        this.setState({
          SubUnits: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  retrieveUsers() {
    UserDataService.getUsers()
      .then((response) => {
        this.setState({
          Users: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUnits();
    this.retrieveSubUnits();
    this.retrieveUsers();
  }

  showConfirmActionModal() {
    this.setState({
      showConfirmActionModal: true,
    });
  }

  hideConfirmActionModal() {
    this.setState({
      showConfirmActionModal: false,
    });
  }

  showNewUserForm() {
    this.setState({
      currentAction: "Create New User",
      showNewUserForm: true,
      showEditUserForm: false,
    });
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
      showConfirmActionModal: false,
    });
  }

  showEditUserForm() {
    this.setState({
      currentAction: "Edit User",
      showNewUserForm: false,
      showEditUserForm: true,
    });
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
      showConfirmActionModal: false,
    });
  }

  onChangeUnit(e) {
    const unit = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          unit: unit,
        },
      };
    });
  }

  onChangeSubUnit(e) {
    const subunit = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          subunit: subunit,
        },
      };
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      };
    });
  }

  onChangeUsername(e) {
    const username = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username,
        },
      };
    });
  }

  onChangeEmail(e) {
    const email = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          email: email,
        },
      };
    });
  }

  onChangeUserType(e) {
    const userType = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          userType: userType,
        },
      };
    });
  }

  onChangePassword(e) {
    const password = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          password: password,
        },
      };
    });
  }

  onChangeCPassword(e) {
    const c_password = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          c_password: c_password,
        },
      };
    });
  }

  renderUnitOptions() {
    let unit_elements = [];
    let unit_list = this.state.Units;
    if (this.state.currentUser.unit === "") {
      const { currentUser } = this.state;
      currentUser.unit = unit_list[0];
      this.setState({ currentUser: currentUser });
    }
    unit_list.forEach((unit) => {
      unit_elements.push(<option value={unit}>{unit}</option>);
    });
    return unit_elements;
  }

  renderSubUnitOptions() {
    let subunit_elements = [];
    let subunit_list = this.state.SubUnits;
    // TODO: Fix this please, use setState instead
    if (this.state.currentUser.subunit === "") {
      const { currentUser } = this.state;
      currentUser.subunit = subunit_list[0];
      this.setState({ currentUser: currentUser });
    }
    subunit_list.forEach((subunit) => {
      subunit_elements.push(<option value={subunit}>{subunit}</option>);
    });
    return subunit_elements;
  }

  saveUser() {
    const data = {
      unit: this.state.currentUser.unit,
      subunit: this.state.currentUser.subunit,
      name: this.state.currentUser.name,
      username: this.state.currentUser.username,
      email: this.state.currentUser.email,
      userType: this.state.currentUser.userType,
      password: this.state.currentUser.password,
    };

    UserDataService.createUser(data)
      .then((response) => {
        this.hideNewUserForm();
        this.retrieveUsers();
      })
      .catch((e) => {
        console.log(e);
        this.hideNewUserForm();
        this.retrieveUsers();
      });
  }

  getUser(id) {
    UserDataService.getUserByID(id)
      .then((response) => {
        this.setState({
          currentUser: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateUser() {
    const data = {
      unit: this.state.currentUser.unit,
      subunit: this.state.currentUser.subunit,
      name: this.state.currentUser.name,
      username: this.state.currentUser.username,
      email: this.state.currentUser.email,
      userType: this.state.currentUser.userType,
      password: this.state.currentUser.password,
    };
    UserDataService.updateUser(this.state.currentUser._id, data)
      .then((response) => {
        this.hideEditUserForm();
        this.retrieveUsers();
      })
      .catch((e) => {
        console.log(e);
        this.hideEditUserForm();
        this.retrieveUsers();
      });
  }

  editUser(id) {
    this.getUser(id);
    this.showEditUserForm();
  }

  deleteUser(id) {
    this.getUser(id);
    this.showConfirmActionModal();
  }

  deleteCurrentUser() {
    const id = this.state.currentUser._id;
    UserDataService.deleteUser(id)
      .then(() => {
        this.hideConfirmActionModal();
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
        this.hideConfirmActionModal();
        this.refreshList();
      });
  }

  getUnit(id) {
    let UnitName = "";
    let unit_list = this.state.Units;
    unit_list.forEach((unit) => {
      if (unit._id === id) {
        UnitName = unit.name;
      }
    });
    return UnitName;
  }

  renderUsers() {
    const { Users } = this.state;
    const data = Users.map((user) => {
      const { username, name, userType, unit, _id } = user;
      const aksi = (
        <React.Fragment>
          <BottomTooltip key={1} info="Edit User">
            <Button
              className="mx-2"
              variant="warning"
              onClick={() => this.editUser(_id)}
            >
              <FiEdit />
            </Button>
          </BottomTooltip>
          <BottomTooltip key={2} info="Delete User">
            <Button
              className="mx-2"
              variant="danger"
              disabled={userType === "Admin"}
              onClick={() => this.deleteUser(_id)}
            >
              <TiUserDeleteOutline />
            </Button>
          </BottomTooltip>
        </React.Fragment>
      );
      return { username, name, userType, unit, aksi };
    });
    const columns = dataUserTable.getColumns();
    return (
      <BootstrapTable
        classes="table-feature"
        striped
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory()}
      />
    );
  }

  render() {
    const {
      currentUser,
      showConfirmActionModal,
      showNewUserForm,
      showEditUserForm,
    } = this.state;

    return (
      <Container fluid style={{ width: "95%" }}>
        <div id="user-list" className="mt-4">
          <h2 className="d-inline">Pengurusan Akun</h2>
          <Button
            className="d-inline justify-content-center align-items-center float-right my-3 p-2"
            variant="success"
            onClick={() => this.showNewUserForm()}
          >
            Tambah Akun <TiUserAddOutline />
          </Button>
          {this.renderUsers()}
        </div>
        {showConfirmActionModal ? (
          <>
            <ConfirmActionPopup
              title="Delete User"
              acceptAction={() => this.deleteCurrentUser()}
              cancelAction={() => this.hideConfirmActionModal()}
            />
          </>
        ) : null}
        {showNewUserForm ? (
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
            saveUser={() => this.saveUser()}
          />
        ) : null}
        {showEditUserForm ? (
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
            updateUser={() => this.updateUser()}
          />
        ) : null}
      </Container>
    );
  }
}
