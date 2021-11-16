import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookCreationComponent } from './cookbook-creation.component';

describe('CookbookCreationComponent', () => {
  let component: CookbookCreationComponent;
  let fixture: ComponentFixture<CookbookCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookbookCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookbookCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
