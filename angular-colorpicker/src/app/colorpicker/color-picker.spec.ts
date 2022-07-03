import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from './color-picker.module';
import { ColorPickerComponent } from './color-picker/components/color-picker/color-picker.component';

const VALID_COLOR_DEFAULT = 'rgb(255 200 0)';
const VALID_COLOR_1 = 'rgb(255 0 0)';
const VALID_COLOR_2 = 'rgb(0 255 255)';

describe('ColorPicker', () => {
  let focusMonitor: FocusMonitor;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ColorPickerModule],
      declarations: [MultiplePickers],
    });
    TestBed.compileComponents();

    inject([FocusMonitor], (fm: FocusMonitor) => {
      focusMonitor = fm;
    })();
  }));

  it('Should ensure multiple pickers operate independantly', () => {
    const fixture = TestBed.createComponent(MultiplePickers);
    fixture.detectChanges();

    const pickerInstances = fixture.componentInstance.pickers.toArray();

    pickerInstances[0].color = VALID_COLOR_1;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR_1);
    expect(pickerInstances[1].color).toBe(VALID_COLOR_DEFAULT);

    pickerInstances[1].color = VALID_COLOR_2;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR_1);
    expect(pickerInstances[1].color).toBe(VALID_COLOR_2);
  });
});
@Component({
  template: `<color-picker
    *ngFor="let i of [1, 2, 3]"
    [color]="color"
  ></color-picker>`,
})
class MultiplePickers {
  @ViewChildren(ColorPickerComponent)
  pickers!: QueryList<ColorPickerComponent>;
  color: string = VALID_COLOR_DEFAULT;
}
