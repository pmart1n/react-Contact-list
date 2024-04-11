
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const ContactList = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const editContact = (contact) => {
        actions.assignUser(contact);
        navigate("/contacts-edit");
    };

    const deleteContact = (slug) => {
        actions.deleteContact(slug);
        // Assuming you have a deleteContact action.
    };
    return (
        <div className="container">
            <h1 className="mb-4">Contact List</h1>
            {!store.contacts.agendas ? <h2>Loading...</h2> :
                <div className="card-columns">
                    {store.contacts.agendas.map((agenda) => (
                        <div key={agenda.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{agenda.slug}</h5>
                            </div>
                            <div className="card-footer">
                                <button onClick={() => editContact(agenda)} className="btn btn-info mr-2">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => deleteContact(agenda.slug)} className="btn btn-danger mr-2">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}
