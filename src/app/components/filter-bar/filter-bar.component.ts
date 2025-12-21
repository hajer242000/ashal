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
    @Input() statusOptions: { label: string, value: string }[] = [
        { label: 'Status: All', value: 'All' },
        { label: 'Status: New', value: 'New' },
        { label: 'Status: In Progress', value: 'In Progress' },
        { label: 'Status: Completed', value: 'Completed' },
        { label: 'Status: Rejected', value: 'Rejected' }
    ];
    @Input() roleOptions: string[] = [];
    @Input() showViewToggle: boolean = false;

    filters = {
        date: 'All Time',
        order: 'Newest',
        status: 'All',
        role: 'All', // Added role
        governorate: 'All',
        requestType: 'All'
    };

    @Output() filterChange = new EventEmitter<any>();
    @Output() reset = new EventEmitter<void>();
    @Output() viewModeChange = new EventEmitter<'grid' | 'list'>();

    currentViewMode: 'grid' | 'list' = 'grid';
    activeDropdown: string | null = null;

    setViewMode(mode: 'grid' | 'list') {
        this.currentViewMode = mode;
        this.viewModeChange.emit(mode);
    }

    toggleDropdown(name: string) {
        if (this.activeDropdown === name) {
            this.activeDropdown = null;
        } else {
            this.activeDropdown = name;
        }
    }

    selectOption(type: string, value: string) {
        this.filters = { ...this.filters, [type]: value };
        this.activeDropdown = null; // Close after select
        this.filterChange.emit(this.filters);
    }

    updateFilter(type: string, value: string) {
        this.selectOption(type, value);
    }

    onReset() {
        this.filters = {
            date: 'All Time',
            order: 'Newest',
            status: 'All',
            role: 'All',
            governorate: 'All',
            requestType: 'All'
        };
        this.reset.emit();
        this.filterChange.emit(this.filters);
    }
}
