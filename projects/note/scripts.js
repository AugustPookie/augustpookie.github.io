document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('addNoteBtn');
    const noteContainer = document.getElementById('noteContainer');
    const noteTemplate = document.getElementById('noteTemplate').content;

    // Load notes from local storage
    loadNotes();

    addNoteBtn.addEventListener('click', () => {
        addNote();
    });

    function addNote() {
        const noteElement = document.importNode(noteTemplate, true);
        const noteContent = noteElement.querySelector('.note-content');
        const deleteBtn = noteElement.querySelector('.delete-btn');
        const shareBtn = noteElement.querySelector('.share-btn');

        // Handle note deletion
        deleteBtn.addEventListener('click', () => {
            // Remove the note from the DOM
            noteElement.parentElement.remove();
            saveNotes();
        });

        // Handle note sharing (dummy function)
        shareBtn.addEventListener('click', () => {
            alert('Sharing functionality not implemented.');
        });

        // Add note to container
        noteContainer.appendChild(noteElement);

        // Save notes to local storage
        saveNotes();
    }

    function saveNotes() {
        const notes = Array.from(noteContainer.querySelectorAll('.note-content')).map(textarea => textarea.value);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function loadNotes() {
        const notes = JSON.parse(localStorage.getItem('notes') || '[]');
        notes.forEach(note => {
            const noteElement = document.importNode(noteTemplate, true);
            const noteContent = noteElement.querySelector('.note-content');
            noteContent.value = note;
            const deleteBtn = noteElement.querySelector('.delete-btn');
            const shareBtn = noteElement.querySelector('.share-btn');

            // Handle note deletion
            deleteBtn.addEventListener('click', () => {
                // Remove the note from the DOM
                noteElement.parentElement.remove();
                saveNotes();
            });

            // Handle note sharing (dummy function)
            shareBtn.addEventListener('click', () => {
                alert('Sharing functionality not implemented.');
            });

            noteContainer.appendChild(noteElement);
        });
    }
});
