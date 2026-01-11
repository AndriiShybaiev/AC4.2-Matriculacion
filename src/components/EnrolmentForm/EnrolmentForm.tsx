import React, { type FormEvent, useState } from 'react';
import './EnrolmentForm.css';

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
}

function EnrolmentForm(props: EnrolmentFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault(); //prevenimos recarga al submit
        setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
        props.onChangeEnrolments(props.currentEnrolments + 1);
    };
    //etapa 2
    return (
        <div>
            <form className="enrolForm" onSubmit={handleSubmit}>
                <h1>Datos del estudiante - {props.chosenProgram}</h1>

                <label>Nombre:</label>
                <input
                    type="text"
                    name="fname"
                    onBlur={(event) => setFirstName(event.target.value)}
                />
                <br />

                <label>Apellidos:</label>
                <input
                    type="text"
                    name="lname"
                    onBlur={(event) => setLastName(event.target.value)}
                />
                <br /><br />

                <input type="submit" value="Registrar" />

                <label className="message">{welcomeMessage}</label>
            </form>
        </div>
    );
}

export default EnrolmentForm;
