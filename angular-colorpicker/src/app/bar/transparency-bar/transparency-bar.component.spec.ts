import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyBarComponent } from './transparency-bar.component';

describe('TransparencyBarComponent', () => {
  let component: TransparencyBarComponent;
  let fixture: ComponentFixture<TransparencyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransparencyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransparencyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
