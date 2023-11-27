const { interval, fromEvent, merge, Subject } = rxjs;
const { startWith, scan, takeUntil, tap } = rxjs.operators;

let stopTimerSubject = new Subject();

function startTimer() {
  stopTimerSubject = new Subject();

  const hoursInput = document.getElementById('hoursInput');
  const minutesInput = document.getElementById('minutesInput');
  const secondsInput = document.getElementById('secondsInput');
  const timerDisplay = document.getElementById('timerDisplay');

  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (isNaN(totalSeconds) || totalSeconds <= 0) {
    alert('Please enter a valid positive duration for the timer.');
    return;
  }

  const countdown$ = interval(1000).pipe(
    scan((acc) => acc - 1, totalSeconds),
    startWith(totalSeconds),
    takeUntil(merge(fromEvent(hoursInput, 'input'), fromEvent(minutesInput, 'input'), fromEvent(secondsInput, 'input'), stopTimerSubject)),
    tap((value) => {
      const remainingHours = Math.floor(value / 3600);
      const remainingMinutes = Math.floor((value % 3600) / 60);
      const remainingSeconds = value % 60;

      timerDisplay.textContent = `${String(remainingHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    })
  );

  countdown$.subscribe(
    () => {},
    null,
    () => {
      timerDisplay.textContent = 'Time is up!';
    }
  );
}

function stopTimer() {
  stopTimerSubject.next();
}
