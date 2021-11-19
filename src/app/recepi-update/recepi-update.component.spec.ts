import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiUpdateComponent } from './recepi-update.component';

describe('RecepiUpdateComponent', () => {
  let component: RecepiUpdateComponent;
  let fixture: ComponentFixture<RecepiUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
