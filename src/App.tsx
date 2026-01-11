import './App.css'
import EnrolmentForm from "./components/EnrolmentForm/EnrolmentForm.tsx";
import React, {type ChangeEvent, useState} from "react";

function App() {
    const [program, setProgram] = useState("UG");
    const [ugEnrolments, setUGEnrolments] = useState(0);
    const [pgEnrolments, setPGEnrolments] = useState(0);

    const handleChangeEnrolments = (updateEnrolments: number) => {
        program === "UG" ? setUGEnrolments(updateEnrolments) : setPGEnrolments(updateEnrolments);
    };

    const handleChangeProgram = (event: ChangeEvent<HTMLLIElement>) => {
        const input = event.target as HTMLInputElement;
        setProgram(input.value);
    };

    const selectedEnrolments = ():number => {
        return program == "UG" ? ugEnrolments : pgEnrolments;
    }
    //etapa 3 - formulario con radio buttons
    return (
        <div className="App">
            <div className="programs">
                <ul className="ulEnrol">
                    <li className="parentLabels"
                        onChange={handleChangeProgram}>
                        <label>
                            <input
                                type="radio"
                                value="UG"
                                name="programGroup"
                                defaultChecked
                            />
                            Grado
                        </label>
                        <label>
                            <input
                                type="radio"
                                className="radioSel"
                                value="PG"
                                name="programGroup"
                            />
                            Postgrado
                        </label>
                    </li>
                    <li>
                        Matriculaciones actuales: {selectedEnrolments()}
                    </li>
                </ul>
            </div>

            <div className="enrolments">
                Matriculaciones actuales: {selectedEnrolments()}
            </div>

            <EnrolmentForm
                chosenProgram={program}
                onChangeEnrolments={handleChangeEnrolments}
                currentEnrolments={selectedEnrolments()}
            />
        </div>
    );
}

export default App;
