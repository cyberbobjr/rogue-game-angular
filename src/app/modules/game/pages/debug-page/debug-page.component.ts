import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-debug-page',
    templateUrl: './debug-page.component.html',
    styleUrls: ['./debug-page.component.scss']
})
export class DebugPageComponent implements OnInit {
    debugForm: FormGroup = this.fb.group({
        command: []
    });

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
    }

    launchCommand() {
        console.log(this.debugForm.value.command);
        this.debugForm.reset();
    }
}
