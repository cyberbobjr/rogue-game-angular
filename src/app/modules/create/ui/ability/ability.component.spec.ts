import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {SharedModule} from '../../../shared/shared.module';
import {AbilityComponent} from './ability.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';


describe('AbilityComponent', () => {
    let component: AbilityComponent;
    let fixture: ComponentFixture<AbilityComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule, NoopAnimationsModule],
            declarations: [AbilityComponent]
        })
               .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AbilityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component)
            .toBeTruthy();
    });
});
