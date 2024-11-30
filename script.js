let events = [];
function loadEvents() {
    const storedEvents = JSON.parse(localStorage.getItem("events"));
    if (storedEvents) {
        storedEvents.forEach(event => {
            events.push(event);
            renderEvent(event);
        });
    }
}
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(events));
}
function renderEvent(event) {
    const eventsContainer = document.getElementById("events-container");
    const newEventHtml = `
        <div class="container">
            <div class="nameofdate"><span>${event.name}</span></div>
            <div class="countdown" id="${event.id}">
                <div><span></span>In</div>
                <div><span class="years">0</span> Years</div>
                <div><span class="days">0</span> Days</div>
                <div><span class="hours">0</span> Hours</div>
                <div><span class="minutes">0</span> Minutes</div>
                <div><span class="seconds">0</span> Seconds</div>
               
            </div>
        </div>
    `;
    eventsContainer.innerHTML += newEventHtml;
}

function countdown() {
    const rn = new Date().getTime();

    events.forEach(event => {
        const left = event.date - rn;
        
    
        const days = Math.floor(left / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);
        const remainingDays = days - years * 365;
        const hours = Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((left % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((left % (1000 * 60)) / 1000);

        const container = document.getElementById(event.id);

        if (container) {
            if (left >= 0) {
                container.querySelector(".years").innerHTML = years;
                container.querySelector(".days").innerText = remainingDays;
                container.querySelector(".hours").innerText = hours;
                container.querySelector(".minutes").innerText = minutes;
                container.querySelector(".seconds").innerText = seconds;
            } else {
                container.innerHTML = "Was <br>" + years * -1 + " Years <br>" + remainingDays + " Days <br>" + hours * -1 + " Hours <br>" + minutes * -1 + " Minutes <br>" + seconds * -1 + " Seconds " + "ago";
            }
        }
    });
}

function addEvent(event) {
    event.preventDefault();

    const eventName = document.getElementById("event-name").value;
    const eventDate = new Date(document.getElementById("event-date").value).getTime();

    const eventId = "event№" + Math.random().toString(36);

    const newEvent = { id: eventId, name: eventName, date: eventDate };
    events.push(newEvent);
    renderEvent(newEvent);
    saveEvents();
    
    
    document.getElementById("add-event-form").reset();
}

setInterval(countdown, 1000);

document.getElementById("add-event-form").addEventListener("submit", addEvent);

window.onload = loadEvents;
