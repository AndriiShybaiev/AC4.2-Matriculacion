import './EnrolmentForm.css';
import type { Student } from "../../entities/Student";
import { useEnrolmentFormViewModel } from "./useEnrolmentFormViewModel";

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
    onStudentChanged: (student: Student) => void;
    editingStudent?: Student;
}

function EnrolmentForm(props: EnrolmentFormProps) {
    const vm = useEnrolmentFormViewModel(props);

    // etapa 3 radiobuttons
    return (
        <div>
            <form className="enrolForm" onSubmit={vm.handleSubmit}>
                <h1>Datos del estudiante - {props.chosenProgram}</h1>

                <label>Nombre:</label>
                <input
                    type="text"
                    name="fname"
                    onChange={(event) => vm.setFirstName(event.target.value)}
                    ref={vm.nameInputRef}
                    value={vm.firstName}
                />
                <br />

                <label>Apellidos:</label>
                <input
                    type="text"
                    name="lname"
                    onChange={(event) => vm.setLastName(event.target.value)}
                    value={vm.lastName}
                />
                <br /><br />

                <div className="button-container">
                    <input type="submit" value={vm.btnTitle} />

                    {/* Cancelar button: show only when editing */}
                    {vm.editingStudentID && (
                        <input type="submit" value="Cancelar" />
                    )}
                </div>

                <div className="message">{vm.welcomeMessage}</div>
            </form>
        </div>
    );
}

export default EnrolmentForm;
