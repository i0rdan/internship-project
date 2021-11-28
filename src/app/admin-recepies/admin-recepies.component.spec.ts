import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecepiesComponent } from './admin-recepies.component';

describe('AdminRecepiesComponent', () => {
  let component: AdminRecepiesComponent;
  let fixture: ComponentFixture<AdminRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecepiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
