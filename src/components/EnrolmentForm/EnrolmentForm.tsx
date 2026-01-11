import React from 'react';
function EnrolmentForm() {
    return (
        <div>
            <form className="enrolForm">
                <h2>Datos de estudiante</h2>
                <label>Nombre</label>
                <input type="text" name="fname"/>
                <br/>
                <label>Apellidos:</label>
                <input type="text" name="lname"/>
                <br/>
                <br/>
                <input type="submit" value="Registrar"/>
            </form>
        </div>
    );
}
export default EnrolmentForm;