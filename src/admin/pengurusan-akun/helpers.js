export function ConfirmActionPopup(props) {
    return (
        <div id="popup-form">
            <h3>{props.title}</h3>
            <button onClick={() => props.acceptAction()}>Yes</button>
            <button onClick={() => props.cancelAction()}>No</button>
        </div>
    )
}

export function NewUserForm(props) {
    return (
        <div id="form-container">
            <h3>Add New User</h3>
            <form id="new-user-form">
                <label>Username</label>
                <input
                    type="text"
                    id="username"
                    required
                    value={props.username}
                    onChange={props.onChangeUsername}
                    name="username"
                />
                <label>Email</label>
                <input
                    type="text"
                    id="email"
                    required
                    value={props.email}
                    onChange={props.onChangeEmail}
                    name="email"
                />
                <label>Name</label>
                <input
                    type="text"
                    id="name"
                    required
                    value={props.name}
                    onChange={props.onChangeName}
                    name="name"
                />
                <label>Password</label>
                <input
                    type="text"
                    id="password"
                    required
                    value={props.password}
                    onChange={props.onChangePassword}
                    name="password"
                />
                <label>Confirm Password</label>
                <input
                    type="text"
                    id="c_password"
                    required
                    value={props.c_password}
                    onChange={props.onChangeCPassword}
                    name="c_password"
                />
                <label>Role</label>
                <select
                    id="role"
                    required
                    value={props.userType}
                    onChange={props.onChangeUserType}
                    name="role"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <label>Unit</label>
                <select
                    id="unit"
                    required
                    value={props.unit}
                    onChange={props.onChangeUnit}
                    name="unit"
                >
                    {props.renderUnitOptions()}
                </select>
                <label>Subunit</label>
                <select
                    id="subunit"
                    required
                    value={props.subunit}
                    onChange={props.onChangeSubUnit}
                    name="subunit"
                >
                    {props.renderSubUnitOptions()}
                </select>
            </form>
            <button onClick={() => props.hideNewUserForm()}>Cancel</button>
            <button onClick={() => props.saveUser()}>Submit</button>
        </div>
    )
}

export function EditUserForm(props) {
    return (
        <div id="form-container">
            <h3>Edit User</h3>
            <form id="new-user-form">
                <label>Name</label>
                <input
                    type="text"
                    id="name"
                    required
                    value={props.name}
                    onChange={props.onChangeName}
                    name="name"
                />
                <label>Role</label>
                <select
                    id="role"
                    required
                    value={props.userType}
                    onChange={props.onChangeUserType}
                    name="role"
                >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <label>Username</label>
                <input
                    type="text"
                    id="username"
                    required
                    value={props.username}
                    onChange={props.onChangeUsername}
                    name="username"
                />
                <label>Unit</label>
                <select
                    id="unit"
                    required
                    value={props.unit}
                    onChange={props.onChangeUnit}
                    name="unit"
                >
                    {props.renderUnitOptions()}
                </select>
                <label>Subunit</label>
                <select
                    id="subunit"
                    required
                    value={props.subunit}
                    onChange={props.onChangeSubUnit}
                    name="subunit"
                >
                    {props.renderSubUnitOptions()}
                </select>
            </form>
            <button onClick={() => props.hideEditUserForm()}>Cancel</button>
            <button onClick={() => props.updateUser()}>Submit</button>
        </div>
    )
}

export function UserRow(props) {
    return (
        <tr>
            <td><p>{props.username}</p></td>
            <td><p>{props.name}</p></td>
            <td><p>{props.userType}</p></td>
            <td><p>{props.unit}</p></td>
            <td><button onClick={props.onClickEdit}>Edit</button></td>
            <td><button onClick={props.onClickDelete}>Delete</button></td>
        </tr>
    )
}