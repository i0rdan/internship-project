import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCookbooksComponent } from './profile-cookbooks.component';

describe('ProfileCookbooksComponent', () => {
  let component: ProfileCookbooksComponent;
  let fixture: ComponentFixture<ProfileCookbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCookbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCookbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
