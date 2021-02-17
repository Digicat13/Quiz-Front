import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import lodash from 'lodash';

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
  @Input() text = 'sort-by';
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
    const data = [];
    this.chipListProperties.forEach((prop: SortingProperty) => {
      const clone = lodash.cloneDeep(prop);

      if (prop !== selected) {
        clone.selected = false;
        clone.ascending = false;
      } else {
        clone.selected = true;
        clone.ascending = !prop.ascending;
      }
      data.push(clone);
    });

    this.chipListProperties = data;
    this.selectProperty.emit(selected);
  }
}
