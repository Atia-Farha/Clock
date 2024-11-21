function updateAnalogClock(now) {
    const second = now.getSeconds() * 6;
    const minute = now.getMinutes() * 6 + now.getSeconds() * 0.1;
    const hour = ((now.getHours() % 12) * 30) + (now.getMinutes() * 0.5);

    document.getElementById("hour").style.transform = `rotate(${hour}deg)`;
    document.getElementById("minute").style.transform = `rotate(${minute}deg)`;
    document.getElementById("second").style.transform = `rotate(${second}deg)`;
}

function updateDigitalTime(now) {
    const digitalTime = now.toLocaleTimeString(undefined, { hour12: true });
    document.getElementById("digitalTime").innerText = digitalTime;
}

function updateClock() {
    const now = new Date();
    updateAnalogClock(now);
    updateDigitalTime(now);
    requestAnimationFrame(updateClock);
}

window.onload = function() {
    requestAnimationFrame(updateClock);

    const timezoneElem = document.getElementById('timezone');
    const dayElem = document.getElementById('day');
    const datetimeElem = document.getElementById('datetime');

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.abs(offsetMinutes) % 60;
    const offsetSign = offsetMinutes <= 0 ? '+' : '-';
    timezoneElem.textContent = `${timeZone} (GMT${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')})`;

    dayElem.textContent = new Date().toLocaleDateString(undefined, { weekday: 'long' });
    datetimeElem.textContent = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};