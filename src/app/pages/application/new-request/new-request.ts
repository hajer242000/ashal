import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RequestDetailsFormComponent } from '../../../components/request/request-details-form/request-details-form';
import { RequestAttachmentsComponent } from '../../../components/request/request-attachments/request-attachments';

@Component({
    selector: 'app-new-request',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, RequestDetailsFormComponent, RequestAttachmentsComponent],
    templateUrl: './new-request.html',
    styleUrl: './new-request.css'
})
export class NewRequestComponent {
    currentStep = 1;
    steps = [
        { number: 1, title: 'Details', icon: 'description' },
        { number: 2, title: 'Attachment', icon: 'cloud_upload' },
        { number: 3, title: 'Verify', icon: 'fact_check' },
        { number: 4, title: 'Submit', icon: 'send' }
    ];

    // Form Data
    requestData = {
        projectTitle: '',
        requestType: '',
        isProjectOwner: false,
        clientName: '',
        governorate: '',
        district: '',
        reason: '',
        additionalDetails: ''
    };

    attachments: any = {
        drawingFile: null,
        drawingsPdf: null,
        requestLetter: null,
        instructionLetter: null,
        undertakingLetter: null
    };

    nextStep() {
        if (this.currentStep < this.steps.length) {
            this.currentStep++;
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
        }
    }

    submit() {
        console.log('Submitting request:', this.requestData);
        // Add submission logic here
    }
}
