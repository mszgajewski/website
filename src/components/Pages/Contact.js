import React, {Component} from 'react';
import Field from '../Common/Field';
import {withFormik} from 'formik';
import * as Yup from 'yup';

const fields = {
    sections: [
    [
        {name: 'name', elementName: 'input', type: 'text', placeholder: 'Twoje Imię*'},
        {name: 'email', elementName: 'input', type: 'email', placeholder: 'Twój Email*'},
        {name: 'phone', elementName: 'input', type: 'text', placeholder: 'Twój numer telefonu*'}
    ],
    [
        {name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Twoja wiadomość*'}
    ]
 ]
}

class Contact extends Component {

    render(){
        return(
            <section id="contact">
                  <div className="container">
                  <div className="row">
                        <div className="col-lg-12 text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-12">
                      <form onSubmit={this.props.handleSubmit} name="sentMessage" novalidate="novalidate">
                          <div className="row">

                            {fields.sections.map((section, sectionIndex) => {
                              console.log("Rendering section", sectionIndex, "with", section);
                              return (
                                <div className="col-md-6" key={sectionIndex}>
                                    {section.map((field, i) => {
                                        return <Field
                                                  {...field} 
                                                   key={i}
                                                   value={this.props.values[field.name]} 
                                                   name={field.name}
                                                   onChange={this.props.handleChange}
                                                   onBlur={this.props.handleBlur}
                                                   touched={(this.props.touched[field.name])}
                                                   errors={this.props.errors[field.name]}
                                              />
                                    })}
                                </div>
                            )
                        })}
                      <div className="clearfix"></div>
                      <div className="col-lg-12 text-center">
                        <div id="success"></div>
                        <button
                              className="btn btn-primary btn-xl text-uppercase" 
                              type="submit">
                              Wyślij wiadomość</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )
    }
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    phone: '',
    message: '',
 }),
  validationSchema: Yup.object().shape({
      name: Yup.string().min(3, 'Przecież twoje imię jest dłuższe niż to ;)').required('Musisz podać swoje imię.'),
      email: Yup.string().email('Musisz podać poprawny email').required('Potrzebujemy twojego maila.'),
      phone: Yup.string().min(9, 'Proszę podać 9 cyfrowy numer telefonu').max(9, 'Proszę podać 9 cyfrowy numer telefonu').required('Potrzebujemy twoj numer telefonu.'),
      message: Yup.string().min(50, 'Prosimy o wieecej informacji')
  }),  
  handleSubmit: (values, {setSubmitting}) => {
    alert("Wypełniłeś poprawnie formularz", JSON.stringify(values));
  }
})(Contact);
