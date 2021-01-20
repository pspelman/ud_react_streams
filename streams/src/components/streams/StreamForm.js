import React, {Component} from 'react'
import {Field, reduxForm} from "redux-form"

const faker = require('faker');

let randomProductName = faker.commerce.productName();
let randomDescription = faker.lorem.sentence();

class StreamForm extends Component {

  renderError({error, touched, focused}) {
    if (error && touched && !focused) {
      return (
        <div className={"ui error message"}>
          <div className={"header"}>
            {error}
          </div>
        </div>
      )
    }
  }

  renderInput = ({input, label, meta}) => {
    const className = meta.error && meta.touched ? 'error' : ''
    const fieldValue = label === 'Enter Title' ? randomProductName : randomDescription
    return (
      <div className={`field ${className}`}>
        <label>{label}</label>
        <input {...input}
               autoComplete={'off'}
               // value={fieldValue}
        />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    console.log(`[onSubmit()] - formValues: `, formValues)
    this.props.onSubmit(formValues)
  }

  render() {
    return (
      <div>
        <h1>StreamForm Component</h1>
        <form
          className={"ui form error"}
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field name={'title'}
                 label={'Enter Title'}
                 component={this.renderInput}
          />
          <Field name={'description'}
                 label={'Enter Description'}
                 component={this.renderInput}
          />
          <button className="ui btn primary">Submit</button>
        </form>
      </div>
    )
  }
}

const validate = (formValues) => {
  const errors = {}
  // note: this is where we can test the form values
  if (!formValues.title) {
    errors.title = "You must enter a title"  // only run if user did not enter title
  }
  if (!formValues.description) {
    errors.description = "You must enter a description"
  }
  return errors;
}

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm)