import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormData = {
    email: "",
    password: "",
    terms: false
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/;
const errorMessages = {
    email: `Lütfen geçerli bir e-posta adresi giriniz.`,
    password: `Şifre en az 8 karakter olmalı ve şu özellikleri içermelidir:
en az bir büyük harf, bir küçük harf, bir sayı ve bir özel karakter.`,
    terms: "Şartları kabul ediyorum."
}

export default function Login() {
    const [form, setForm] = useState(initialFormData);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const emailValid = emailRegex.test(form.email);
        const passwordValid = passwordRegex.test(form.password);
        const termsAccepted = form.terms;

        setIsValid(emailValid && passwordValid && termsAccepted);
    }, [form]);

    function handleChange(event) {
        const { type, name, value, checked } = event.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }

    function handleSubmit(event) {
        event.preventDefault();
        navigate("/success");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">
                        Email
                    </Label>
                    <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="Email giriniz"
                        type="email"
                        value={form.email}
                        invalid={!emailRegex.test(form.email)}
                        onChange={handleChange}
                        data-cy="email-input"
                    />
                    {!emailRegex.test(form.email) && <FormFeedback data-cy="email-error">
                        {errorMessages.email}
                    </FormFeedback>}

                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Password
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="Şifre giriniz"
                        type="password"
                        value={form.password}
                        invalid={!passwordRegex.test(form.password)}
                        onChange={handleChange}
                        data-cy="password-input"
                    />
                    {!passwordRegex.test(form.password) && <FormFeedback data-cy="password-error">
                        {errorMessages.password}
                    </FormFeedback>}
                </FormGroup>
                <FormGroup check>
                    <Input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} data-cy="terms-checkbox" />
                    {' '}
                    <Label check>
                        {errorMessages.terms}
                    </Label>
                </FormGroup>
                <Button disabled={!isValid} color="primary" onClick={handleSubmit} data-cy="submit-button" >
                    Submit
                </Button>
            </Form>
        </>
    )
}