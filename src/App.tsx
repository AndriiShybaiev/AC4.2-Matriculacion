import './App.css'
import EnrolmentForm from "./components/EnrolmentForm/EnrolmentForm";
import EnrolList from "./components/EnrolList/EnrolList";
import { useAppViewModel } from "./hooks/useAppViewModel";

function App() {
    const vm = useAppViewModel();

    // etapa 3 - formulario con radio buttons (y lista)
    return (
        <div className="App">
            <div className="programs">
                <ul className="ulEnrol">
                    <li className="parentLabels" onChange={vm.handleChangeProgram}>
                        <label>
                            <input
                                type="radio"
                                value="UG"
                                name="programGroup"
                                defaultChecked={vm.program === "UG"}
                            /> Grado
                        </label>
                        <label>
                            <input
                                type="radio"
                                className="radioSel"
                                value="PG"
                                name="programGroup"
                                defaultChecked={vm.program === "PG"}
                            /> Postgrado
                        </label>
                    </li>
                    <li>Matriculaciones actuales: {vm.selectedEnrolments}</li>
                </ul>
            </div>

            <EnrolmentForm
                chosenProgram={vm.program}
                currentEnrolments={vm.selectedEnrolments}
                onChangeEnrolments={vm.handleChangeEnrolments}
                onStudentChanged={vm.handleStudentChange}
                editingStudent={vm.editingStudent}
            />

            <br/>

            <EnrolList
                student={vm.student}
                onStudentRemoved={vm.handleStudentRemoved}
                onStudentEditing={vm.setEditingStudent}
            />
        </div>
    );
}

export default App;
