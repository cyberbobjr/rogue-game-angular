import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class LoggingService {
  public displayText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

  put(text: string) {
    this.displayText.next(text);
  }
}
