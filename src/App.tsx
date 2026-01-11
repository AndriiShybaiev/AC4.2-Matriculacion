import './App.css'
import EnrolmentForm from "./components/EnrolmentForm/EnrolmentForm.tsx";
import React, {type ChangeEvent, useState} from "react";
import EnrolList from "./components/EnrolList/EnrolList.tsx";
import type {Student} from "./entities/Student.ts";

function App() {
    const [program, setProgram] = useState("UG");
    const [ugEnrolments, setUGEnrolments] = useState(0);
    const [pgEnrolments, setPGEnrolments] = useState(0);

    const [student, setStudent] = useState<Student | undefined>(undefined);
    const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);

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

    //para procesar nuevo estudiante
    const handleStudentChange = (newStudent: Student) => {
        setStudent(newStudent);
    };

    //etapa 4 - eliminar estudiante
    const handleStudentRemoved = (removedStudent: Student) => {
        // Bajamos contador dependiente de programa del estudiante, no estado de radiobutton actual
        if (removedStudent.program === "UG") {
            setUGEnrolments(prev => Math.max(0, prev - 1));
        } else {
            setPGEnrolments(prev => Math.max(0, prev - 1));
        }
    };

    //etapa 3 - lista de estudiantes
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
                onStudentChanged={handleStudentChange}
                editingStudent={editingStudent} //etapa5
            />
            <EnrolList
                student={student} // etapa3 lista de estudiantes - pasamos estudiante a la lista
                onStudentRemoved={handleStudentRemoved}  //etapa4  - añado onStudentRemoved
                onStudentEditing={setEditingStudent} //  etapa5 - añado onStudentEditing
            />
        </div>
    );
}

export default App;
