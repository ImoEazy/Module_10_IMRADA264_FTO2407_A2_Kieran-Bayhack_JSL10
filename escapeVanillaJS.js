document.addEventListener("DOMContentLoaded", () => {
    // 🪲 Bug corrected: Incorrect ID used for attaching the event listener, altered resultRoom1 to room1Result.
    document.getElementById("solveRoom1").addEventListener("click", () => {
        fetch('books.json') 
            .then(response => response.json())
            .then(books => {
                const mostRecentBook = findMostRecentBook(books);
                // 🪲 Bug corrected: Incorrect element ID, changed "room1Result"
                document.getElementById("room1Result").textContent = `The key to the next room is: ${mostRecentBook.title}`;
            });
    });

    document.getElementById("solveRoom2").addEventListener("click", () => {
        const jsConcepts = new Set(['closure', 'scope', 'hoisting']);
        // 🪲 Bug corrected: What's mssing from JS concepts?
        const reactConcepts = new Set(['components', 'jsx', 'hooks', 'async']);
        // 🪲 Bug corrected: Incorrect function call
        const commonConcepts = findIntersection(jsConcepts, reactConcepts);//added reactConcepts to missing concepts,fixes the call to findIntersection allowing use of jsConcepts and reactConcepts.
        document.getElementById("room2Result").textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(', ')}`;
    });

    // 🪲 Bug: Asynchronous function ?
    document.getElementById("solveRoom3").addEventListener("click", () => {
        fetch('directions.json') 
            .then(response => response.json())
            .then(directions => {
                navigateLabyrinth(directions)
                    .then(message => {
                        // 🪲 Bug corrected: Incorrect method
                        document.getElementById("room3Result").textContent = message; //replaced get with '.textContent'
                    });
            });
    });
});

function findMostRecentBook(books) {
    // 🪲 Bug corrected: Logic error // corrected to find most recent book 'book.published >(greater) mostRecent.published
    return books.reduce((mostRecent, book) => new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent);
}

function findIntersection(setA, setB) {
    // 🪲 Bug corrected: Incorrect logic
    const intersection = new Set([...setA].filter(item => setB.has(item)))//use filter method for setB items
    return intersection;
}

async function navigateLabyrinth(directions) {
    for (let direction of directions) {
        // 🪲 Bug corrected: No delay
        await new Promise(resolve => setTimeout(resolve, 1000));//added 'await'to ensure delay is effective during navigation
        console.log(`Navigating: ${direction.step}`);
    }
    return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}

