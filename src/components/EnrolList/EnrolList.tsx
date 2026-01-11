import "./EnrolList.css";
import {DetailsList} from "@fluentui/react/lib/DetailsList";
import {initializeIcons} from "@fluentui/react/lib/Icons";
import type {Student} from "../../entities/Student.ts";
import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {MdDelete, MdEdit} from "react-icons/md";
import type {IColumn} from "@fluentui/react";
initializeIcons();

interface EnrolListProps {
    student?: Student;
    onStudentRemoved: (student: Student) => void;
}

function EnrolList(props: EnrolListProps) {
    const [items, setItems] = useState<Student[]>([]);
    const handleDelete = (item: Student) => {
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        props.onStudentRemoved(item);
    }
    const handleEdit = (item: Student) => {
    };
    const columns: IColumn[] = [
        { key: 'fname', name: 'Nombre', fieldName: "firstName", minWidth: 90, maxWidth: 200, isResizable: true },
        { key: 'lname', name: 'Apellidos', fieldName: "lastName", minWidth: 90, maxWidth: 200, isResizable: true },
        { key: 'program', name: 'Estudios', fieldName: "program", minWidth: 60, maxWidth: 200, isResizable: true },
        {
            key: 'actions',
            name: 'Acciones',
            fieldName: 'actions',
            minWidth: 100,
            maxWidth: 150,
            isResizable: true,
            //etapa 4 - rendering iconos
            onRender: (item: Student) => (
                <div>
                    <MdEdit
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                        onClick={() => handleEdit(item)}
                    />
                    <MdDelete
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )
        }
    ];
    useEffect(() => {
        if(props.student) {
            const currentID = props.student.id;
            if (currentID == undefined) {
                const newStudentWithId: Student = {
                    ...props.student,
                    id: uuidv4()
                };
                setItems((prevItems) => [...prevItems, newStudentWithId]);
            }
        }
    }, [props.student]);
    return (
        <div className="enrolList">
            <DetailsList items={items} columns={columns} />
        </div>
    )
}



export default EnrolList;