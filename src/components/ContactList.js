import React, { useEffect, useState } from 'react';

function ContactsList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('https://chat-app-xret.onrender.com/contacts')
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    return (
        <div>
            <h2>Contact List</h2>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        <img src={contact.image} alt={contact.name} width={50} />
                        <p>Name: {contact.name}</p>
                        <p>Number: {contact.number}</p>
                        <p>Email: {contact.email}</p>
                        <p>Status: {contact.status}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactsList;
