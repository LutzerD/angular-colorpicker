import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-json-formatter',
  templateUrl: './json-formatter.component.html',
  styleUrls: ['./json-formatter.component.scss'],
})
export class JsonFormatterComponent implements OnInit {
  @Input() json?: any;

  constructor() {}

  get type(): string {
    if (this.json === null || this.json === undefined) {
      return 'string';
    }
    return typeof this.json;
  }

  get keys(): any {
    return Object.keys(this.json);
  }

  ngOnInit(): void {}
}
