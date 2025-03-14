const timetable = {
    "MON": ["Mobile Computing", "Information Retrieval Systems", "HRDC", "Predictive Modeling", "Mini Project", "Introduction to Robotics"],
    "TUE": ["Introduction to Robotics", "Mobile Computing", "Information Retrieval Systems", "Web Mining", "Predictive Modeling", "Mini Project"],
    "WED": ["Predictive Modeling Lab", "Introduction to Robotics", "Information Retrieval Systems", "Internet of Things", "Mobile Computing", "Web Mining"],
    "THU": ["Mobile Computing", "Introduction to Robotics", "Information Retrieval Systems", "Internet of Things", "Web Mining Lab", "HRDC"],
    "FRI": ["Web Mining", "Predictive Modeling", "Internet of Things", "Mobile Computing", "Web Mining Lab", "Information Retrieval Systems"],
    "SAT": ["Internet of Things", "Web Mining", "Mobile App Development Lab", "Mobile App Development Lab", "Mobile App Development Lab", "Predictive Modeling"]
};

const facultyInfo = {
    "Mobile Computing": { "name": "Ms. S. Swarnalatha", "role": "AP / AI&DS" },
    "Information Retrieval Systems": { "name": "Ms. M. Vijayalakshmi", "role": "AP / AI&DS" },
    "Web Mining": { "name": "Ms. C. Merlyne Sandra Christina", "role": "AP / AI&DS" },
    "Predictive Modeling": { "name": "Ms. M. Sheeba", "role": "AP / AI&DS" },
    "Introduction to Robotics": { "name": "Dr. A. X. Amal Rebin", "role": "ASP / Mech" },
    "Internet of Things": { "name": "Dr. A. Kovalan", "role": "ASP / AI&DS" },
    "Predictive Modeling Lab": { "name": "New Faculty 4", "role": "AI&DS" },
    "Mobile App Development Lab": { "name": "Ms. S. Swarnalatha", "role": "AP / AI&DS" },
    "Web Mining Lab": { "name": "Ms. C. Merlyne Sandra Christina", "role": "AP / AI&DS" },
    "Mini Project": { "name": "New Faculty 1", "role": "AI&DS" },
    "HRDC": { "name": "Mr. A. James Anto & Ms. Lavanya", "role": "Soft Skills & Aptitude" }
};

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "")
        return;

    chatBox.innerHTML += `<div class="user-message">User: ${userInput}</div>`;

    const response = getResponse(userInput);
    chatBox.innerHTML += `<div class='bot-message'>Bot: ${response}</div>`;

    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getResponse(input) {
    const message = input.toUpperCase().trim();

    if (message.includes("TIMETABLE")) {
        return listTimetable();
    }
    if (message.includes("PERIOD")) {
        return getPeriodInfo(message);
    }
    if (message.includes("FACULTY")) {
        return getFacultyInfo(message);
    }
    if (message.includes("PDF")) {
        return '<a href="timetable.pdf" download>Click to download Timetable PDF</a>';
    }
    return "I can help with timetable, period info, faculty details, and PDF downloads! Try asking: 'What’s the 3rd period on Monday?' or 'Faculty for Web Mining'.";
}

function listTimetable() {
    let response = "<b>Timetable:</b><br>";
    for (const day in timetable) {
        response += `<b>${day}</b>: ${timetable[day].join(", ")}<br>`;
    }
    return response;
}

function getPeriodInfo(message) {
    const dayMatch = message.match(/MON|TUE|WED|THU|FRI|SAT/);
    const periodMatch = message.match(/\d+/);

    if (dayMatch && periodMatch) {
        const day = dayMatch[0];
        const period = parseInt(periodMatch[0]);

        if (period >= 1 && period <= 6) {
            const subject = timetable[day][period - 1];
            return `On ${day}, period ${period} is <b>${subject}</b>.`;
        }
    }
    return "Please specify a valid day (e.g., Monday) and period number (1-6).";
}

function getFacultyInfo(message) {
    const subject = Object.keys(facultyInfo).find(sub => message.includes(sub.toUpperCase()));
    if (subject) {
        const faculty = facultyInfo[subject];
        return `${subject}: ${faculty.name} (${faculty.role})`;
    }
    return "Faculty info not found!";
}