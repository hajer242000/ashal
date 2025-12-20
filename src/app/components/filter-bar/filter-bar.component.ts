import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-filter-bar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './filter-bar.component.html',
    styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent {
    @Input() governorates: string[] = [];
    @Input() requestTypes: string[] = [];

    filters = {
        date: 'All Time',
        order: 'Newest',
        status: 'All',
        governorate: 'All',
        requestType: 'All'
    };

    @Output() filterChange = new EventEmitter<any>();
    @Output() reset = new EventEmitter<void>();

    updateFilter(type: string, value: string) {
        this.filters = { ...this.filters, [type]: value };
        this.filterChange.emit(this.filters);
    }

    onReset() {
        this.filters = {
            date: 'All Time',
            order: 'Newest',
            status: 'All',
            governorate: 'All',
            requestType: 'All'
        };
        this.reset.emit();
        this.filterChange.emit(this.filters);
    }
}
