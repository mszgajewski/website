import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';

const fields = [
    { name: 'email', elementName: 'input', type: 'email', placeholder: 'Twój email' },
    { name: 'name', elementName: 'input', type: 'text', placeholder: 'Twoja nazwa' },
    { name: 'password', elementName: 'input', type: 'password', placeholder: 'Twoje hasło' },
    { name: 'password2', elementName: 'input', type: 'password', placeholder: 'Powtórz swoje hasło' }

]
class Singup extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                        <div className="row">
                            <h1>Singup</h1>
                        </div>
                        <div>
                            <form className="row" onSubmit={e => {
                                e.preventDefault();
                                this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                            }}>
                                {fields.map((f, i) => {
                                    return (
                                        <div className="col-md-6">
                                            <Field
                                        key={i}
                                        {...f}
                                        value={this.props.values[f.name]}
                                        name={f.name}
                                        onChange={this.props.handleChange}
                                        onBlur={this.props.handleBlur}
                                        touched={(this.props.touched[f.name])}
                                        errors={this.props.errors[f.name]}
                                    />
                                    </div>
                                    )
                                })}
                                <div className="col-md-12">
                                    <p className="text-danger text-centre">{this.props.auth.error || ''}</p>
                                    <button className="btn-btn-primary">Sing up</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register: (name, email, pass) => {
            dispatch(AuthActions.register(name, email, pass));
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
) (withFormik({
    mapPropsToValues: () => ({
        email: '',
        name:'',
        password: '',
        password2: '',
    }),
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Wpisz swoje imię'),
        email: Yup.string().email('Email is invalid.').required('You need to login with email addres'),
        password: Yup.string().min(8, ' Hasło musi mieć przynjmniej 8 znaków długości.').required('You ned to enter your passwoerd.'),
        password2: Yup.string().required('Proszę wipisać twoje hasło ponownie').test('pass-match', 'Hasła nie pasują do siebie', function(value){
            const {password} = this.parent;
            return password === value;
        })
    }),
    handleSubmit: (values, {setSubmitting}, login) => {
        console.log("Login attempt", values);
        //login(values.email, values.password);
    }
})(Singup));
