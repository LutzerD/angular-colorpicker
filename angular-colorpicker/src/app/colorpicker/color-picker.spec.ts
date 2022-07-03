import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from './color-picker.module';
import { ColorPickerComponent } from './color-picker/components/color-picker/color-picker.component';
import { SELECTORS, VALID_COLOR } from './test-utils';

describe('ColorPicker', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ColorPickerModule],
      declarations: [MultiplePickers, Picker],
    });
    TestBed.compileComponents();
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
      fixture.debugElement.queryAll(By.css(SELECTORS.TRANSPARENCY_BAR));

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

    pickerInstances[0].color = VALID_COLOR.RED;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR.RED);
    expect(pickerInstances[1].color).toBe(VALID_COLOR.DEFAULT);

    pickerInstances[1].color = VALID_COLOR.TEAL;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR.RED);
    expect(pickerInstances[1].color).toBe(VALID_COLOR.TEAL);
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
  color: string = VALID_COLOR.DEFAULT;
}

@Component({
  template: `<color-picker [opacity]="opacity" [color]="color"></color-picker>`,
})
class Picker {
  @ViewChild(ColorPickerComponent)
  picker!: ColorPickerComponent;
  color: string = VALID_COLOR.DEFAULT;
  opacity: boolean = true;
}
