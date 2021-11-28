import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecepiesComponent } from './profile-recepies.component';

describe('ProfileRecepiesComponent', () => {
  let component: ProfileRecepiesComponent;
  let fixture: ComponentFixture<ProfileRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRecepiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
