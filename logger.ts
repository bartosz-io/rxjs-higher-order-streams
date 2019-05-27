export class Logger {
  constructor(private logRef: HTMLElement) { }

  log(value, color?) {
    const logEntry = document.createElement('div');
    logEntry.className = 'logEntry';
    logEntry.style.backgroundColor = color ? color : value.color;
    logEntry.innerHTML = `<span class="timestamp">${getTimestamp()}</span> ${value}`;
    this.logRef.appendChild(logEntry);
  }

  clear() {
    this.logRef.innerHTML = '';
  }
}

function getTimestamp() {
  const date = new Date();
  return ('0' + date.getHours()).slice(-2) + ':'
    + ('0' + date.getMinutes()).slice(-2) + ':'
    + ('0' + date.getSeconds()).slice(-2);
}