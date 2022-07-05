import { query } from '@angular/animations';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from './color-picker.module';
import { ColorPickerComponent } from './color-picker/components/color-picker/color-picker.component';
import { GridComponent } from './color-picker/components/grid/grid.component';
import { MarkerComponent } from './color-picker/components/marker/marker.component';
import { DraggableDirective } from './color-picker/directives/draggable.directive';
import { SELECTORS, VALID_COLOR } from './test-utils';

describe('ColorPicker', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ColorPickerModule],
      declarations: [MultiplePickers, Picker, Marker],
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

    pickerInstances[0].color = VALID_COLOR.TEAL;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR.TEAL);
    expect(pickerInstances[1].color).toBe(VALID_COLOR.RED);

    pickerInstances[1].color = VALID_COLOR.GREEN;
    fixture.detectChanges();
    expect(pickerInstances[0].color).toBe(VALID_COLOR.TEAL);
    expect(pickerInstances[1].color).toBe(VALID_COLOR.GREEN);
  });

  it('Should update color when grid marker moved', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();

    const grid = fixture.componentInstance.picker.grid;

    grid.markerMoved({ x: 0.3, y: 0.3 });
    fixture.detectChanges();
    expect(grid.x).toBeCloseTo(0.3, 5);
    expect(grid.y).toBeCloseTo(0.3, 5);

    grid.markerMoved({ x: 0.7, y: 0.7 });
    fixture.detectChanges();
    expect(grid.x).toBeCloseTo(0.7, 5);
    expect(grid.y).toBeCloseTo(0.7, 5);
  });

  it('Should update color when hue marker moved', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();

    const bar = fixture.componentInstance.picker.hueBar;
    bar.markerMoved({ x: 0.3, y: 0.3 });
    fixture.detectChanges();
    expect(bar.x).toBeCloseTo(0.3, 5);

    bar.markerMoved({ x: 0.7, y: 0.7 });
    fixture.detectChanges();
    expect(bar.x).toBeCloseTo(0.7, 5);
  });

  it('Should update color when transparency marker moved', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();

    const bar = fixture.componentInstance.picker.transparencyBar;

    bar.markerMoved({ x: 0.3, y: 0.3 });
    fixture.detectChanges();
    expect(bar.x).toBeCloseTo(0.3, 5);

    bar.markerMoved({ x: 0.7, y: 0.7 });
    fixture.detectChanges();
    expect(bar.x).toBeCloseTo(0.7, 5);
  });

  it('Should have correct transparency background', () => {
    const fixture = TestBed.createComponent(Picker);
    fixture.detectChanges();
    const picker = fixture.componentInstance.picker;

    const background = picker.transparencyBar.transparentBackground();
    expect(background).toContain(VALID_COLOR.RED);
  });

  describe('Marker', () => {
    it('Should set color', () => {
      const fixture = TestBed.createComponent(Marker);
      fixture.detectChanges();
      const marker = fixture.componentInstance.marker;

      marker.color = VALID_COLOR.GREEN;
      expect(marker.color).toBe(VALID_COLOR.GREEN);

      marker.color = VALID_COLOR.TEAL;
      expect(marker.color).toBe(VALID_COLOR.TEAL);
    });
  });

  describe('DraggableDirective', () => {
    let fixture!: ComponentFixture<Picker>;

    beforeEach(waitForAsync(() => {
      fixture = TestBed.createComponent(Picker);
      fixture.detectChanges();

      // draggables: DraggableDirective[] = fixture.debugElement
      //   .queryAll(By.directive(DraggableDirective))
      //   .map((d) => d.componentInstance);
    }));

    it('Should trigger on mouse events', () => {
      const draggable: DraggableDirective = new DraggableDirective(
        fixture.elementRef
      );

      spyOn<any>(draggable, 'move');
      const e = { pageX: 0, pageY: 0, preventDefault: () => {} } as MouseEvent;

      draggable.subscription.add(() => console.log('again?'));
      draggable['onMouseDown'](e);
      expect(draggable['move']).toHaveBeenCalledOnceWith(e);

      draggable['onMouseMove'](e);
      expect(draggable['move']).toHaveBeenCalledTimes(2);

      draggable['onMouseUp'](e);
      expect(draggable['move']).toHaveBeenCalledTimes(3);
    });

    it('Should emit onMove', () => {
      const draggable: DraggableDirective = new DraggableDirective(
        fixture.elementRef
      );

      spyOn<any>(draggable.onMove, 'emit');
      const e = {
        pageX: -1,
        pageY: 10000,
        preventDefault: () => {},
      } as MouseEvent;

      draggable['move'](e);
      expect(draggable.onMove.emit).toHaveBeenCalledOnceWith({ x: 0, y: 1 });
    });

    it('Should clip percent', () => {
      const draggable: DraggableDirective = new DraggableDirective(
        fixture.elementRef
      );

      expect(draggable['clipPercent'](0.3)).toBe(0.3);
    });
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
  color: string = VALID_COLOR.RED;
}

@Component({
  template: `<color-picker
    [opacity]="opacity"
    [(color)]="color"
  ></color-picker>`,
})
class Picker {
  @ViewChild(ColorPickerComponent)
  picker!: ColorPickerComponent;
  color: string = VALID_COLOR.RED;
  opacity: boolean = true;

  @ViewChild(GridComponent)
  grid!: GridComponent;
}

@Component({
  template: `<marker></marker>`,
})
class Marker {
  @ViewChild(MarkerComponent)
  marker!: MarkerComponent;
}
