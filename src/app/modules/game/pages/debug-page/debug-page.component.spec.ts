import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DebugPageComponent} from './debug-page.component';
import {ReactiveFormsModule} from '@angular/forms';

describe('DebugPageComponent', () => {
    let component: DebugPageComponent;
    let fixture: ComponentFixture<DebugPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [DebugPageComponent]
        })
                     .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DebugPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
