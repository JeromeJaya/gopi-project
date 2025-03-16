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

// JSON data for holidays
const holidayData = {
    "holidays": {
        "English New Year": { "date": "01.01.25", "days": 1 },
        "Pongal": { "date": "15.01.25", "days": 9 },
        "Republic Day": { "date": "26.01.25", "days": 1 },
        "ThaiPoosam": { "date": "10.02.25", "days": 4 },
        "Telugu New Year": { "date": "31.03.25", "days": 5 },
        "Tamil New Year": { "date": "15.04.25", "days": 11 },
        "May Day": { "date": "01.05.25", "days": 1 },
        "Bakrid": { "date": "07.06.25", "days": 1 },
        "Muharram": { "date": "06.07.25", "days": 1 },
        "Independence Day": { "date": "15.08.25", "days": 1 },
        "Ganesh Chaturthi": { "date": "27.08.25", "days": 1 },
        "Onam": { "date": "05.09.25", "days": 5 },
        "Pooja": { "date": "02.10.25", "days": 5 },
        "Diwali": { "date": "20.10.25", "days": 5 },
        "Christmas": { "date": "25.12.25", "days": 8 }
    }
};


function getHolidayInfo(eventName) {
    const holidays = holidayData.holidays;
    const eventLower = eventName.trim().toLowerCase(); // Normalize input

    console.log("User Input:", eventName); // Debugging
    console.log("Extracted Event:", eventLower); // Debugging

    // If no specific holiday is mentioned, return all holidays
    if (!eventLower || eventLower === "holiday") {
        let response = "<b>List of Holidays:</b><br>";
        for (const key in holidays) {
            response += `<b>${key}</b>: ${holidays[key].date} - ${holidays[key].days} day(s)<br>`;
        }
        return response;
    }

    // Case-insensitive search
    for (const key in holidays) {
        if (key.toLowerCase() === eventLower) {
            return `Holiday for <b>${key}</b> starts on <b>${holidays[key].date}</b> and lasts for <b>${holidays[key].days}</b> day(s).`;
        }
    }
    return "No holiday found for the entered event. Please check the spelling!";
}

function getResponse(input) {
    const message = input.trim();
    
    console.log("User Message:", message); // Debugging

    if (message.toUpperCase().includes("HOLIDAY")) {
        const holidayName = message.replace(/holi(day)?/i, "").trim(); // Remove "holiday"
        console.log("Extracted Holiday Name:", holidayName); // Debugging
        return getHolidayInfo(holidayName);
    }
    return "I can help with timetable, faculty details, holiday info, etc. Try asking: 'Holiday for Tamil New Year' or just 'Holiday'.";
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
    if (message.includes("HOLIDAY")) {
        const holidayName = message.split("HOLIDAY")[1].trim(); // Extract holiday name
        return getHolidayInfo(holidayName);
    }
    if (message.includes("PDF")) {
        return '<a href="timetable.pdf" download>Click to download Timetable PDF</a>';
    }
    return "I can help with timetable, period info, faculty details, holiday info, and PDF downloads! Try asking: 'What’s the 3rd period on Monday?' or 'Faculty for Web Mining' or 'Holiday for Tamil New Year'.";
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

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    const chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") {
        return;
    }

    // Display user message
    chatBox.innerHTML += `<div class="user-message">:User   ${userInput}</div>`;

    // Get response from the chatbot
    const response = getResponse(userInput);
    
    // Display bot response
    chatBox.innerHTML += `<div class='bot-message'>Bot: ${response}</div>`;

    // Clear input field
    document.getElementById("user-input").value = ""; 
    // Scroll to the bottom of the chat box
    chatBox.scrollTop = chatBox.scrollHeight; 
         }
