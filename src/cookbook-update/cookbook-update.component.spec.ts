import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookUpdateComponent } from './cookbook-update.component';

describe('CookbookUpdateComponent', () => {
  let component: CookbookUpdateComponent;
  let fixture: ComponentFixture<CookbookUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookbookUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookbookUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
