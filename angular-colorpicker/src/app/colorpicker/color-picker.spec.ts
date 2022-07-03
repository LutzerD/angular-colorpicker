import { FocusMonitor } from '@angular/cdk/a11y';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from './color-picker.module';
import { ColorPickerComponent } from './color-picker/components/color-picker/color-picker.component';

const VALID_COLOR_DEFAULT = 'rgb(255 200 0)';
const VALID_COLOR_1 = 'rgb(255 0 0)';
const VALID_COLOR_2 = 'rgb(0 255 255)';
const PICKER_SELECTOR = '.color-picker-container';
const TRANSPARENCY_BAR_SELECTOR = 'transparency-bar';

describe('ColorPicker', () => {
  let focusMonitor: FocusMonitor;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ColorPickerModule],
      declarations: [MultiplePickers, Picker],
    });
    TestBed.compileComponents();

    inject([FocusMonitor], (fm: FocusMonitor) => {
      focusMonitor = fm;
    })();
  }));

  it('Should render a picker', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('Should toggle opacity bar ', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();
    const pickerInstance = fixture.componentInstance.picker;
    const getOpacityBars = () =>
      fixture.debugElement.queryAll(By.css(TRANSPARENCY_BAR_SELECTOR));

    pickerInstance.opacity = true;
    fixture.detectChanges();
    expect(getOpacityBars()).toHaveSize(1);

    pickerInstance.opacity = false;
    fixture.detectChanges();
    expect(getOpacityBars()).toHaveSize(0);
  });

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

@Component({
  template: `<color-picker [opacity]="opacity" [color]="color"></color-picker>`,
})
class Picker {
  @ViewChild(ColorPickerComponent)
  picker!: ColorPickerComponent;
  color: string = VALID_COLOR_DEFAULT;
  opacity: boolean = true;
}
