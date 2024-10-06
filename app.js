const popupContainer = document.getElementById('popupContainer');
const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notes-list');

// Load notes from localStorage when the page is loaded
window.onload = function () {
  loadNotes();
};

// Show popup to add a note
function showPopup() {
  popupContainer.style.display = 'flex';
}

// Close the popup
function closePopup() {
  popupContainer.style.display = 'none';
  noteInput.value = ''; // Clear the input field
}

// Add a new note
function addNote() {
  const noteText = noteInput.value;

  if (noteText.trim() !== '') {
    // Create the note item
    const noteItem = document.createElement('li');
    noteItem.innerHTML = `
      <span>${noteText}</span>
      <div>
        <button id="editBtn" onclick="editNote(this)">Edit</button>
        <button id="deleteBtn" onclick="deleteNote(this)">Delete</button>
      </div>
    `;

    // Add the note to the list
    notesList.appendChild(noteItem);

    // Save the note to localStorage
    saveNotes();

    // Close the popup and clear the input
    closePopup();
  }
}

// Save notes to localStorage
function saveNotes() {
  const notes = [];
  const noteItems = notesList.querySelectorAll('li');
  noteItems.forEach((item) => {
    notes.push(item.querySelector('span').textContent);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

// Load notes from localStorage
function loadNotes() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    const notesArray = JSON.parse(storedNotes);
    notesArray.forEach((note) => {
      const noteItem = document.createElement('li');
      noteItem.innerHTML = `
        <span>${note}</span>
        <div>
          <button id="editBtn" onclick="editNote(this)">Edit</button>
          <button id="deleteBtn" onclick="deleteNote(this)">Delete</button>
        </div>
      `;
      notesList.appendChild(noteItem);
    });
  }
}

// Edit a note
function editNote(button) {
  const noteItem = button.closest('li');
  const noteText = noteItem.querySelector('span').textContent;

  noteInput.value = noteText; // Prefill the textarea with the current note
  showPopup();

  noteItem.remove(); // Remove the old note while editing
  saveNotes(); // Save the remaining notes
}

// Delete a note
function deleteNote(button) {
  const noteItem = button.closest('li');
  noteItem.remove();

  // Update the saved notes after deletion
  saveNotes();
}
