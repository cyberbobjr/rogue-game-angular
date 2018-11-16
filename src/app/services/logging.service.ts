import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
              providedIn: 'root'
            })
export class LoggingService {
  text: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

}
