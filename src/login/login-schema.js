import * as yup from 'yup';

export const configLoginFormik = {
    getSchema,
    getInitialValues
}

function getSchema() {
    return yup.object().shape({
        username: yup.string().min(3, "username minimal perlu memiliki 3 karakter").required("username dibutuhkan"),
        password: yup.string().min(5, "password minimal perlu memiliki 5 karakter").required("password dibutuhkan")
    });
}

function getInitialValues() {
    return {
        username: '',
        password: ''
    };
}