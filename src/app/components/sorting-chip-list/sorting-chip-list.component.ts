import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SortingProperty {
  key?: string;
  value: string;
  selected?: boolean;
  ascending?: boolean;
}

@Component({
  selector: 'app-sorting-chip-list',
  templateUrl: './sorting-chip-list.component.html',
  styleUrls: ['./sorting-chip-list.component.scss'],
})
export class SortingChipListComponent implements OnInit {
  @Input() properties: Array<SortingProperty> = [];
  @Input() text: string;
  @Output() selectProperty = new EventEmitter<SortingProperty>();

  chipListProperties: Array<SortingProperty> = [];

  constructor() {}

  ngOnInit(): void {
    this.properties.forEach((prop: SortingProperty) => {
      this.chipListProperties.push({
        key: prop.key,
        value: prop.value,
        selected: false,
        ascending: false,
      });
    });
  }

  onChipSelect(selected: SortingProperty): void {
    this.chipListProperties.forEach((prop: SortingProperty) => {
      if (prop !== selected) {
        prop.selected = false;
        prop.ascending = false;
      } else {
        prop.selected = true;
        prop.ascending = !prop.ascending;
      }
    });
    this.selectProperty.emit(selected);
  }
}
