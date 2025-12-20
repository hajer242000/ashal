import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-request-details-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './request-details-form.html'
})
export class RequestDetailsFormComponent implements OnInit {
    @Input() data: any = {};
    @Input() readOnly: boolean = false;

    requestTypes = [
        'Commercial',
        'Residential',
        'Industrial',
        'Government'
    ];

    districtsMap: { [key: string]: string[] } = {
        'Muscat': ['Seeb', 'Bowsher', 'Muttrah', 'Al Amerat'],
        'Sohar': ['Sohar Industrial', 'Liwa', 'Shinas']
    };

    availableDistricts: string[] = [];

    ngOnInit() {
        if (this.data.governorate) {
            this.onGovernorateChange(false);
        }
    }

    onGovernorateChange(resetDistrict: boolean = true) {
        this.availableDistricts = this.districtsMap[this.data.governorate] || [];
        if (resetDistrict) {
            this.data.district = '';
        }
    }
}
