import React, {type FormEvent, useEffect, useRef, useState} from 'react';
import './EnrolmentForm.css';
import type {Student} from "../../entities/Student.ts";

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
    onStudentChanged: (student: Student) => void;
    editingStudent?: Student;
}

function EnrolmentForm(props: EnrolmentFormProps) {
    const nameInputRef = useRef<HTMLInputElement>(null)

    const [firstName, setFirstName] = useState(props.editingStudent?.firstName || "");
    const [lastName, setLastName] = useState(props.editingStudent?.lastName || "");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [btnTitle, setBtnTitle] = useState("Registrar");
    const [editingStudentID, setEditingStudentID] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.editingStudent) {
            setEditingStudentID(props.editingStudent.id);
            setFirstName(props.editingStudent.firstName);
            setLastName(props.editingStudent.lastName);
            setBtnTitle("Actualizar");
            nameInputRef.current?.focus();
        }
    }, [props.editingStudent, setBtnTitle, setEditingStudentID]);
    

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //etapa 5 comprobamos si el boton no "cancelar"
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;

        if (!submitter || submitter.value != "Cancelar") {
            setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);
            if (!editingStudentID) {
                props.onChangeEnrolments(props.currentEnrolments + 1);
            }

            //etapa 3 lista - creando objeto estudiante
            const student: Student = {
                id: editingStudentID,
                firstName: firstName,
                lastName: lastName,
                program: props.chosenProgram
            };
            // etapa3 lista pasamos estudiante arriba al App
            props.onStudentChanged(student);
        }


        // event.currentTarget.reset() //vaciamos el formulario
        setEditingStudentID(undefined);
        setFirstName(""); //etapa 5 edicion
        setLastName("");
        nameInputRef.current?.focus(); //situamos el cursor en el campo fname
        event.preventDefault(); //prevenimos recarga al submit
        setBtnTitle("Registrar");
        setWelcomeMessage("");
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
                    onChange={(event) => setFirstName(event.target.value)}
                    ref={nameInputRef}
                    value={firstName}
                />
                <br />

                <label>Apellidos:</label>
                <input
                    type="text"
                    name="lname"
                    onChange={(event) => setLastName(event.target.value)}
                    value={lastName}
                />
                <br /><br />
                <div className="button-container">
                <input type="submit" value={btnTitle} />

                {/* Cancelar button: show only when editing */}
                {editingStudentID && (
                    <input
                        type="submit"
                        value="Cancelar"
                    />
                )}
                </div>
                <div className="message">{welcomeMessage}</div>
            </form>
        </div>
    );
}

export default EnrolmentForm;
