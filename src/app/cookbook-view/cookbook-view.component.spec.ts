import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookbookViewComponent } from './cookbook-view.component';

describe('CookbookViewComponent', () => {
  let component: CookbookViewComponent;
  let fixture: ComponentFixture<CookbookViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookbookViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookbookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
