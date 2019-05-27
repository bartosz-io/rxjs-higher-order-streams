import { of, fromEvent, interval, merge, Subscription } from 'rxjs';
import { map, delay, mergeMap, concatMap, switchMap, exhaustMap, take } from 'rxjs/operators';
import { getRandomColor, colorNumber, colorString } from './utils';
import { Logger } from './logger';

const logger = new Logger(document.getElementById('log'));
const saveBtn = document.getElementById('save');
let subscription: Subscription;

function save() {
  const color = getRandomColor();

  // randomize the duration of save request
  const duration = Math.floor(Math.random() * 5 + 3);

  // log the start
  logger.log(`Started saving (${duration}s)`, color);

  // create a stream logging every second of duration
  const timer = interval(1000)
    .pipe(take(duration - 1))
    .pipe(map(t => t + 1))
    .pipe(map(t => colorNumber(t, color)));

  // create a simulated save request
  const request = of(`Saved!`)
    .pipe(delay(duration * 1000))
    .pipe(map(r => colorString(r, color)));

  // return a stream concurrently emitting either duration or result of the simulated query
  return merge(timer, request);
}

document['mappingChanged'] = function () {
  logger.clear();
  if (subscription) {
    subscription.unsubscribe();
  }
  const mapping = (document.querySelector('input[name="mapping"]:checked') as HTMLInputElement).value;
  switch (mapping) {
    case 'concat':
      subscription = fromEvent(saveBtn, 'click')
        .pipe(concatMap(click => save()))
        .subscribe(result => logger.log(result));
      break;
    case 'merge':
      subscription = fromEvent(saveBtn, 'click')
        .pipe(mergeMap(click => save()))
        .subscribe(result => logger.log(result));
      break;
    case 'switch':
      subscription = fromEvent(saveBtn, 'click')
        .pipe(switchMap(click => save()))
        .subscribe(result => logger.log(result));
      break;
    case 'exhaust':
      subscription = fromEvent(saveBtn, 'click')
        .pipe(exhaustMap(click => save()))
        .subscribe(result => logger.log(result));
      break;
  }
}