import {Observable, Subject} from 'rxjs';

export class EventLog {
  private static instance: EventLog;
  private _messageSubject$: Subject<string> = new Subject<string>();

  get message$(): Observable<string> {
    return this._messageSubject$.asObservable();
  }

  set message(value: string) {
    this._messageSubject$.next(value);
  }

  constructor() {
  }

  static getInstance() {
    if (!EventLog.instance) {
      EventLog.instance = new EventLog();
    }
    return EventLog.instance;
  }

}
