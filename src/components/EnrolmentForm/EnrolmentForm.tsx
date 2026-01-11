import React, {type FormEvent, useRef, useState} from 'react';
import './EnrolmentForm.css';
import type {Student} from "../../entities/Student.ts";

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
    onStudentChanged: (student: Student) => void;
}

function EnrolmentForm(props: EnrolmentFormProps) {
    const nameInputRef = useRef<HTMLInputElement>(null)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
        props.onChangeEnrolments(props.currentEnrolments + 1);

        //etapa 3 lista - creando objeto estudiante
        const student: Student = {
            firstName: firstName,
            lastName: lastName,
            program: props.chosenProgram
        };
        // etapa3 lista pasamos estudiante arriba al App
        props.onStudentChanged(student);

        event.currentTarget.reset() //vaciamos el formulario
        nameInputRef.current?.focus(); //situamos el cursor en el campo fname
        event.preventDefault(); //prevenimos recarga al submit
    };
    //etapa 3 radiobuttons
    return (
        <div>
            <form className="enrolForm" onSubmit={handleSubmit}>
                <h1>Datos del estudiante - {props.chosenProgram}</h1>

                <label>Nombre:</label>
                <input
                    type="text"
                    name="fname"
                    onBlur={(event) => setFirstName(event.target.value)}
                    ref={nameInputRef}
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
