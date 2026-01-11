import "./EnrolList.css";
import { DetailsList, type IColumn } from "@fluentui/react/lib/DetailsList";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { MdDelete, MdEdit } from "react-icons/md";
import type { Student } from "../../entities/Student";
import { useEnrolListViewModel } from "./useEnrolListViewModel";

initializeIcons();

interface EnrolListProps {
    student?: Student;
    onStudentRemoved: (student: Student) => void;
    onStudentEditing: (student: Student) => void;
}

function EnrolList(props: EnrolListProps) {
    const { items, handleDelete, handleEdit } = useEnrolListViewModel(props);

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
            // etapa 4 - rendering iconos
            onRender: (item: Student) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <MdEdit
                        style={{ cursor: 'pointer', fontSize: '20px' }}
                        onClick={() => handleEdit(item)}
                    />
                    <MdDelete
                        style={{ cursor: 'pointer', fontSize: '20px', color: 'red' }}
                        onClick={() => handleDelete(item)}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="enrolList">
            <DetailsList items={items} columns={columns} />
        </div>
    );
}

export default EnrolList;
