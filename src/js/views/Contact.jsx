
import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router";

export const Contact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const viewTask = (item) => {
        navigate("/contacts/" + item.id)
    }

    const favoriteTask = (item) => {
        actions.addFavorites(item.name);
    }

    const editTask = (item) => {
        actions.assignUser(item);
        navigate("/contacts-edit");
    }

    const deleteTask = (item) => {

    }

    return (
        <div className="container text-center">
            <h1 className="text-sucess">Contactos</h1>
            <ul className="list-group">
                {store.users.map((item) => 
                    <li key={item.id} className="list-group-item d-flex justify-content-between">
                        {item.name} 
                        <div>
                            <span onClick={() => {viewTask(item)}} className="mx-2">
                            <i className="fas fa-eye"></i>    
                            </span>
                            <span onClick={() => {favoriteTask(item)}} className="mx-2 text-danger">
                            <i className="fas fa-heart text-warning"></i>    
                            </span>
                            <span onClick={() => {deleteTask(item)}} className="mx-2 text-danger">
                            <i className="fas fa-trash"></i>    
                            </span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
}
