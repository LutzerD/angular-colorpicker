import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiDemoComponent } from './multi-demo.component';

describe('MultiDemoComponent', () => {
  let component: MultiDemoComponent;
  let fixture: ComponentFixture<MultiDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
