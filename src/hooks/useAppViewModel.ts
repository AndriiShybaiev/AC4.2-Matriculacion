import { useState, ChangeEvent } from "react";
import type { Student } from "../entities/Student";

export const useAppViewModel = () => {
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

    const selectedEnrolments = program === "UG" ? ugEnrolments : pgEnrolments;

    // para procesar nuevo estudiante
    const handleStudentChange = (newStudent: Student) => {
        setStudent(newStudent);
    };

    // etapa 4 - eliminar estudiante
    const handleStudentRemoved = (removedStudent: Student) => {
        // Bajamos contador dependiente de programa del estudiante, no estado de radiobutton actual
        if (removedStudent.program === "UG") {
            setUGEnrolments(prev => Math.max(0, prev - 1));
        } else {
            setPGEnrolments(prev => Math.max(0, prev - 1));
        }
    };

    return {
        program,
        selectedEnrolments,
        student,
        editingStudent,
        setEditingStudent,
        handleChangeEnrolments,
        handleChangeProgram,
        handleStudentChange,
        handleStudentRemoved
    };
};
