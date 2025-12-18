import { useEffect, useState } from "react";
import api from "../api.js";
import Note from "../components/Note.jsx";

function Home() {
    const [notes, setNotes] = useState([]); // used to store notes fetched from the backend
    const [content, setContent] = useState(""); // used to store content of a new note being created
    const [title, setTitle] = useState(""); // used to store title of a new note being created

    useEffect(() => { getNotes(); }, []);

    const getNotes = () => {
        api.get('api/notes/')
            .then((response) => response.data)
            .then((data) => setNotes(data))
            .catch((error) => console.error("Alex Error fetching notes:", error));
    }
    

    const deleteNote = (id) => {
        api.delete(`api/notes/delete/${id}/`)
        .then((response)=>{
            if(response.status === 204)
                alert('Note deleted successfully');
            else
                alert('Failed to delete note');
            getNotes();
        })
        .catch((error) => {
            alert(error);
            console.error("Error deleting note:", error);
        });
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post('api/notes/', {title, content}).then((response)=>{
            if(response.status === 201) alert('Note created successfully');
            else alert('Failed to create note');
            getNotes();
            
        })
        .catch((error) => alert(error),
        console.error("Error creating note:", error));
        
    }

    return(
        <div>
            
            <div>
                <h2>Create Note</h2>
                <form onSubmit = {createNote}>
                    <label htmlFor = "title"> Title: </label>
                    <br/>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <br/>
                    <label htmlFor = "content"> Content: </label>
                    <br/>
                    <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                    <br/>
                    <button type="submit" value="Submit">Create Note</button>

                </form>
            </div>
            <div>
                <h2>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
                
            

        </div>
    )
}
export default Home;