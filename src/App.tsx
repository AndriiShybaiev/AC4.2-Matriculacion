import './App.css'
import EnrolmentForm from "./components/EnrolmentForm/EnrolmentForm.tsx";
import React, { useState } from "react";

function App() {
    const [program, setProgram] = useState("UG");
    const [enrolments, setEnrolments] = useState(0);

    const handleChangeEnrolments = (updateEnrolments: number) => {
        setEnrolments(updateEnrolments);
    };

    const handleChangeProgram = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProgram(event.target.value);
    };
    //etapa 2 - formulario con select de tipo de estudios
    return (
        <div className="App">
            <div className="programs">
                <label>Selecciona el tipo de estudio:</label>
                <select
                    className="appDropDowns"
                    onChange={handleChangeProgram}
                    value={program}
                >
                    <option value="UG">Grado</option>
                    <option value="PG">Postgrado</option>
                </select>
            </div>

            <div className="enrolments">
                Matriculaciones actuales: {enrolments}
            </div>

            <EnrolmentForm
                chosenProgram={program}
                currentEnrolments={enrolments}
                onChangeEnrolments={handleChangeEnrolments}
            />
        </div>
    );
}

export default App;
