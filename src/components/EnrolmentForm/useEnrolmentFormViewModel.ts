import { useState, useRef, useEffect, FormEvent } from "react";
import type { Student } from "../../entities/Student";

interface UseEnrolmentFormViewModelProps {
    chosenProgram: string;
    currentEnrolments: number;
    onChangeEnrolments: (updateEnrolments: number) => void;
    onStudentChanged: (student: Student) => void;
    editingStudent?: Student;
}

export const useEnrolmentFormViewModel = (props: UseEnrolmentFormViewModelProps) => {
    const nameInputRef = useRef<any>(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");
    const [btnTitle, setBtnTitle] = useState("Registrar");
    const [editingStudentID, setEditingStudentID] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (props.editingStudent) {
            setEditingStudentID(props.editingStudent.id);
            setFirstName(props.editingStudent.firstName);
            setLastName(props.editingStudent.lastName);
            setBtnTitle("Actualizar");
            setWelcomeMessage("");
            nameInputRef.current?.focus();
        }
    }, [props.editingStudent]);

    const handleSubmit = (event: FormEvent) => {
        // prevenimos recarga al submit (ahora movido al principio para seguridad)
        event.preventDefault();

        // etapa 5 comprobamos si el boton no "cancelar"
        const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
        const isCancel = submitter && submitter.value === "Cancelar";

        if (!isCancel) {
            setWelcomeMessage(`Bienvenido/a ${firstName} ${lastName}`);

            if (!editingStudentID) {
                props.onChangeEnrolments(props.currentEnrolments + 1);
            }

            // etapa 3 lista - creando objeto estudiante
            const student: Student = {
                id: editingStudentID,
                firstName: firstName,
                lastName: lastName,
                program: props.chosenProgram
            };

            // etapa3 lista pasamos estudiante arriba al App
            props.onStudentChanged(student);
        } else {
            setWelcomeMessage("");
        }

        // vaciamos el formulario (reset manual)
        setEditingStudentID(undefined);
        setFirstName(""); // etapa 5 edicion
        setLastName("");
        setBtnTitle("Registrar");

        // situamos el cursor en el campo fname
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        welcomeMessage,
        btnTitle,
        editingStudentID,
        nameInputRef,
        handleSubmit
    };
};
