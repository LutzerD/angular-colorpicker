import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HueBarComponent } from './hue-bar.component';

describe('HueBarComponent', () => {
  let component: HueBarComponent;
  let fixture: ComponentFixture<HueBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HueBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HueBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
