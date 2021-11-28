import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCookbooksComponent } from './all-cookbooks.component';

describe('AllCookbooksComponent', () => {
  let component: AllCookbooksComponent;
  let fixture: ComponentFixture<AllCookbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCookbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCookbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
