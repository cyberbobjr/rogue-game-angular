import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InventoryModalComponent} from 'src/app/modules/inventory/pages/inventory/inventory-modal.component';
import {SharedModule} from '../../../shared/shared.module';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {RouterTestingModule} from '@angular/router/testing';

describe('InventoryComponent', () => {
  let component: InventoryModalComponent;
  let fixture: ComponentFixture<InventoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
                                     imports: [SharedModule,
                                               NgxSmartModalModule,
                                               RouterTestingModule],
                                     declarations: [InventoryModalComponent]
                                   })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component)
      .toBeTruthy();
  });
});
