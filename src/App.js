import { useState } from "react";
import "./App.css";

function App() {
    const initialValues = {
        username: '',
        email: '',
        password: ''
    }
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormValues(previousValues => {
            return {
                ...previousValues,
                [name]: value,
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        setFormValues(initialValues);
    }

    function validate(values) {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!values.username) {
            errors.username = "User Name is required"
        }
        if(!values.email) {
            errors.email = "email is required";
        } else if(!regex.test(values.email)) {
            errors.email = "This is not a valid email";
        }
        if(!values.password) {
            errors.password = "Password is required";
        } else if(values.password.length < 4) {
            errors.password = "Password must be greater than 4 charcaters";
        }
        return errors;
    }

    return(
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="user">Signed in Successfully</div>
            ): (
                <pre>
                    {JSON.stringify(formValues, undefined, 2)};
                </pre>
            )}
            <form onSubmit={handleSubmit}>
                <div className="inside_container">
                    <label className="item">Username*</label>
                    <input className="input" type="text" placeholder="user name" name="username" value={formValues.username} onChange={handleChange} />
                </div>
                <p>{formErrors.username}</p>
                <div className="inside_container">
                    <label className="item">E-mail*</label>
                    <input className="input" type="email" placeholder="email" name="email" value={formValues.email} onChange={handleChange} />
                </div>
                <p>{formErrors.email}</p>
                <div className="inside_container">
                    <label className="item">Password*</label>
                    <input className="input" type="password" placeholder="password" name="password" value={formValues.password} onChange={handleChange} />
                </div>
                <p>{formErrors.password}</p>
                <button className="button">Submit</button>
            </form>
        </div>
    )
}

export default App;