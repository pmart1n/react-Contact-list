import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Context } from "../store/appContext";

export const ContactEdit = () => {
    const { store, actions } = useContext(Context)
    const { contact_id } = useParams(); // Assuming you are using URL parameters
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

     // Load the contact data when the component mounts
    useEffect(() => {
        if (store.currentUser) {
            setName(store.currentUser.full_name);
            setEmail(store.currentUser.email);
            setPhone(store.currentUser.phone);
            setAddress(store.currentUser.address);
        } else {
            // Navigate back if no currentUser is set (e.g., on refresh or direct navigation)
            navigate("/contact-list");
        }
    }, [store.currentUser, navigate]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const updatedContact = {
            full_name: name,
            email: email,
            agenda_slug: store.agenda,
            address: address,
            phone: phone
        }
        if (store.currentUser && store.currentUser.id) {
            actions.editContact(store.currentUser.id, updatedContact);
            navigate("/contact-list");
        }
    };

    return (
        <div className="container">
        <h1 className="text-center">Edit Contact</h1>
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputFullName" className="form-label">
                    Full Name <span className="text-warning">*</span>
                </label>
                <input type="text" className="form-control" id="exampleInputFullName" aria-describedby="emailHelp"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                    Email address <span className="text-warning">*</span>
                </label>
                <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                    Phone <span className="text-warning">*</span>
                </label>
                <input type="text" className="form-control" id="exampleInputPhone"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputAddress" className="form-label">
                    Address <span className="text-warning">*</span>
                </label>
                <input type="text" className="form-control" id="exampleInputAddress"
                    value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary me-3">Update</button>
                    <button onClick={() => navigate('/contact-list')} type="button" className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    </div>
    )
}