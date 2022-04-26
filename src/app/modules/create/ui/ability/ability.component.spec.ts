import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {AbilityComponent} from 'src/app/modules/create/ui/ability/ability.component';
import {SharedModule} from '../../../shared/shared.module';


describe('AbilityComponent', () => {
  let component: AbilityComponent;
  let fixture: ComponentFixture<AbilityComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule],
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
