import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiCreationComponent } from './recepi-creation.component';

describe('RecepiCreationComponent', () => {
  let component: RecepiCreationComponent;
  let fixture: ComponentFixture<RecepiCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepiCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
