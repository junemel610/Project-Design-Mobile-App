// Import the necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDZ9mquEwIuz1kXiqUwghPJHQFsUEBido",
    authDomain: "softdes-webapp.firebaseapp.com",
    databaseURL: "https://softdes-webapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "softdes-webapp",
    storageBucket: "softdes-webapp.firebasestorage.app",
    messagingSenderId: "1012676348455",
    appId: "1:1012676348455:web:191c588860fc86294e1c02",
    measurementId: "G-EHTH0EEJSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Fetch data from Firestore
export async function fetchData() {
    console.log("Fetching Firestore data for info section...");
    try {
        // Reference to the Firestore collection
        const querySnapshot = await getDocs(collection(db, "wood_inspections"));
        const contentElement = document.getElementById('info-content');

        if (!contentElement) {
            console.error('The info-content element is not available!');
            return;
        }

        // Clear the content element before adding new data
        contentElement.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Create a new element for each inspection data
            const inspectionItem = document.createElement('div');
            inspectionItem.classList.add('inspection-item');
            inspectionItem.innerHTML = `
                <h3>Defect Type: ${data.defect_type}</h3>
                <p>Timestamp: ${data.timestamp}</p>
                <p>Wood Count: ${data.wood_count}</p>
            `;

            contentElement.appendChild(inspectionItem);
        });
    } catch (error) {
        console.error("Error fetching data: ", error.message);
    }
}

// Make fetchData globally accessible
window.fetchData = fetchData;

// Automatically fetch data when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});