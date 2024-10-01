document.addEventListener("DOMContentLoaded", () => {//ensures that the code inside runs only after the HTML document is fully loaded
    // 🪲 Bug corrected: Incorrect ID used for attaching the event listener, altered resultRoom1 to room1Result.
    document.getElementById("solveRoom1").addEventListener("click", () => {//When the button with ID solveRoom1 is clicked, it fetches books.json
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);//Once the JSON data is retrieved, it finds the most recent book using the findMostRecentBook function.
                // 🪲 Bug corrected: Incorrect element ID, changed "room1Result"
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;//It then displays the title of that book in the HTML element with ID room1Result
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {//This button fetches common concepts between JavaScript and React.
        const jsConcepts = new Set(['closure', 'scope', 'hoisting', 'async']);
        // 🪲 Bug corrected: What's mssing from JS concepts?
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug corrected: Incorrect function call
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);//added reactConcepts to missing concepts,fixes the call to findIntersection allowing use of jsConcepts and reactConcepts.
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });//It uses the findIntersection function to determine the shared concepts and then displays them in room2Result.

    // 🪲 Bug: Asynchronous function ?
    document.getElementById("solveRoom3").addEventListener("click", () => {//Clicking this button fetches directions.json, which contains navigation steps.
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)//It calls the navigateLabyrinth function, which logs each step with a delay and
                    .then(message => {
                        // 🪲 Bug corrected: Incorrect method//eventually returns a message that gets displayed in room3Result.
                        document.getElementById("room3Result").textContent = message; //replaced get with '.textContent'
                    });
            });
    });
});

function findMostRecentBook(books) {//This function iterates over the array of books and finds the one with the most recent publication date
    // 🪲 Bug corrected: Logic error // corrected to find most recent book 'book.published >(greater) mostRecent.published
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {//This function returns a new set containing elements that are present in both setA and setB.
    // 🪲 Bug corrected: Incorrect logic
    const intersection = new Set([...setA].filter(item => setB.has(item)))//use filter method for setB items
    return intersection;
}

async function navigateLabyrinth(directions) {//This asynchronous function simulates navigating through a labyrinth by logging each direction after a delay (1 second)
    for (let direction of directions) {
        // 🪲 Bug corrected: No delay
        await new Promise(resolve => setTimeout(resolve, 1000));//added 'await'to ensure delay is effective during navigation
        console.log(`Navigating: ${direction.step}`);
    }//It returns a congratulatory message once all directions have been processed.
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

