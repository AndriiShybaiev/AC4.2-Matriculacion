import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { Student } from "../../entities/Student";

interface UseEnrolListViewModelProps {
    student?: Student;
    onStudentRemoved: (student: Student) => void;
    onStudentEditing: (student: Student) => void;
}

export const useEnrolListViewModel = (props: UseEnrolListViewModelProps) => {
    const [items, setItems] = useState<Student[]>([]);

    const handleDelete = (item: Student) => {
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        props.onStudentRemoved(item);
    };

    const handleEdit = (item: Student) => {
        props.onStudentEditing(item);
    };

    useEffect(() => {
        if (props.student) {
            const currentID = props.student.id;

            // if no ID - new
            if (currentID === undefined) {
                const student: Student = { ...props.student, id: uuidv4() };
                setItems(prev => [...prev, student]);
            }
            // if there is ID - edit
            else {
                setItems(prevItems => {
                    const studentIndex = prevItems.findIndex(item => item.id === currentID);
                    if (studentIndex !== -1) {
                        const updatedItems = [...prevItems];
                        // etapa 5 reemplazamos el estudiante
                        updatedItems[studentIndex] = { ...props.student! };
                        return updatedItems;
                    }
                    return prevItems;
                });
            }
        }
    }, [props.student]);

    return {
        items,
        handleDelete,
        handleEdit
    };
};
