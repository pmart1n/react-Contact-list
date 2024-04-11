
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

    const deleteContact = (contact) => {
        actions.deleteContact(contact.id); // Assuming you have a deleteContact action.
    };
    //26 37.33
    return (
        <div className="container">
            <h1 className="mb-4">Contact List</h1>
            {!store.contacts ? <h2>Loading...</h2> :
                <div className="card-columns">
                    {store.contacts.map((contact) => (
                        <div key={contact.id} className="card">
                            <img src={contact.image} className="card-img-top" alt={contact.full_name} />
                            <div className="card-body">
                                <h5 className="card-title">{contact.full_name}</h5>
                                <p className="card-text">{contact.email}</p>
                                <p className="card-text">{contact.address}</p>
                            </div>
                            <div className="card-footer">
                                <button onClick={() => editContact(contact)} className="btn btn-info mr-2">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => deleteContact(contact)} className="btn btn-danger mr-2">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
