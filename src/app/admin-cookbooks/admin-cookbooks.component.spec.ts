import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCookbooksComponent } from './admin-cookbooks.component';

describe('AdminCookbooksComponent', () => {
  let component: AdminCookbooksComponent;
  let fixture: ComponentFixture<AdminCookbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCookbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCookbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
