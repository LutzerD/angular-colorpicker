import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
})
export class MarkerComponent implements OnInit {
  @Input() color?: string;
  constructor() {}

  ngOnInit(): void {}
}
