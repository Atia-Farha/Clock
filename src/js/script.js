function updateClock() {
    const now = new Date();
    const second = now.getSeconds() * 6;
    const minute = now.getMinutes() * 6 + now.getSeconds() * 0.1;
    const hour = ((now.getHours() % 12) * 30) + (now.getMinutes() * 0.5);

    document.getElementById("hour").style.transform = `rotate(${hour}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minute}deg)`;
    document.getElementById("second").style.transform = `rotate(${second}deg)`;

    const digitalTime = now.toLocaleTimeString();
    document.getElementById("digitalTime").innerText = digitalTime;
}

setInterval(updateClock, 1000);
updateClock();

window.onload = function() {
    const countryElem = document.getElementById('country');
    const timezoneElem = document.getElementById('timezone');
    const dayElem = document.getElementById('day');
    const datetimeElem = document.getElementById('datetime');

    // Fetch user's location using IP-based API with CORS support
    fetch('https://ipwhois.app/json/')
        .then(response => response.json())
        .then(data => {
            countryElem.textContent = data.country;
        })
        .catch(error => {
            console.error("Error fetching country:", error);
            countryElem.textContent = "Unable to detect";
        });

    // Display time zone and offset
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.abs(offsetMinutes) % 60;
    const offsetSign = offsetMinutes <= 0 ? '+' : '-';
    const offsetString = `GMT${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;
    timezoneElem.textContent = `${timeZone} (${offsetString})`;

    // Display day and date separately
    const currentDate = new Date();
    
    // Get the day name
    const optionsDay = { weekday: 'long' };
    dayElem.textContent = currentDate.toLocaleDateString(undefined, optionsDay);
    
    // Get the formatted date without the day
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    datetimeElem.textContent = currentDate.toLocaleDateString(undefined, dateOptions);
};