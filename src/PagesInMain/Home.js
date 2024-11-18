import React, { useState, useEffect } from 'react';
import SingleContact from './Contactcard.js.js';
import SearchBar from './Search.js';
import '../index.css';
// All components imported and react hooks and the styling

function Home() {
    // states to hold each variable
    const [search, setLookSearch] = useState(''); //set to a string
    const [contacts, setContacts] = useState([]); //set to an array
    const [catchError, setCatchError] = useState(''); //set tio string to hold the error
    const [selectedContact, setSelectedContact] = useState(null); //set to null 
    const [messages, setMessages] = useState([]);  //set to an array to hold messages
    const [inputValue, setInputValue] = useState('');  //set to a string

    // fetch data using useEffect when components mount
    useEffect(() => {
        const fetchContacts = async () => { //using async method
            try {
                // function to hold response from the API
                const response = await fetch('https://chat-app-xret.onrender.com/contacts');
            // if response isnt ok, an error message will display
                if (!response.ok) {
                    throw new Error('Error fetching data');
                }
// else, convert dat into json and store it as a variable
                const data = await response.json();
                setContacts(data);
                // check for any other kind of error update the error status
            } catch (error) {
                setCatchError(error.message);
            }
        };
// call the contact fetch function
        fetchContacts();
    }, []);  // for empty array, data will only be called once once the mount happens

    // function will handle the clicking of an contact
    const handleContactClick = (contact) => {
        setSelectedContact(contact); //state of slected contact
    };

    // function to handle sending of a message
    const handleSendMessage = () => {
        // will check if the input value has any character and not white space
        if (inputValue.trim()) {
            // add value typed to the message state
            setMessages([...messages, { id: Date.now(), text: inputValue }]); // Add new message
            setInputValue(''); 
            // clear the filed after sending message
        }
    };
// handle the delete button of the message
    const handleDeleteMessage = (id) => {
        setMessages(messages.filter(msg => msg.id !== id)); // Delete message by id
    };

    // handle adding contacts

    // handle the editing of a message
    const handleEditMessage = (id) => {
// an alert pop up and user edits the message
        const updatedText = prompt("Update text:");
// conditionally update the text 
        if (updatedText) {
            setMessages(messages.map(msg => (msg.id === id ? { ...msg, text: updatedText } : msg))); // Update message
        }
    };

    //filter contacts depending on the search characters
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        // render all
        <div className="contact-list">
            {catchError && <p>Error: {catchError}</p>}

            {/* Render the SearchBar component */}
            <SearchBar search={search} setLookSearch={setLookSearch} />

            <div className="contacts-container">
                <div className="contacts">
                    {filteredContacts.map((contact) => (
                        <SingleContact 
                            key={contact.id} 
                            contact={contact} 
                            onClick={() => handleContactClick(contact)} 
                        />
                    ))}
                </div>
                {selectedContact && (
                    <div className="chat-box">
                        <h4>Chat with {selectedContact.name || "Unknown"}</h4>
                        <div className="messages">
                            {messages.map((msg) => (
                                <div key={msg.id} className="message">
                                    <span>{msg.text}</span>
                                    <button onClick={() => handleEditMessage(msg.id)}>Edit</button>
                                    <button onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                                </div>
                                
                            ))}
                        </div>
                        <div className="input-container">
                            <input 
                                type="text" 
                                value={inputValue} 
                                onChange={(e) => setInputValue(e.target.value)} 
                                placeholder="Type a message..." 
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                    </div>
                    
                )}
            </div>
        </div>
    );
}

export default Home;