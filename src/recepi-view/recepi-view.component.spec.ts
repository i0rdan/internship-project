import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiViewComponent } from './recepi-view.component';

describe('RecepiViewComponent', () => {
  let component: RecepiViewComponent;
  let fixture: ComponentFixture<RecepiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
