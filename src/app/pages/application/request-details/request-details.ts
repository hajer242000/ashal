import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RequestDetailsFormComponent } from '../../../components/request/request-details-form/request-details-form';
import { RequestAttachmentsComponent } from '../../../components/request/request-attachments/request-attachments';
import { RequestWorkflowComponent } from '../../../components/request/request-workflow/request-workflow';
import { RequestChatComponent } from '../../../components/request/request-chat/request-chat';

@Component({
    selector: 'app-request-details',
    standalone: true,
    imports: [CommonModule, RequestDetailsFormComponent, RequestAttachmentsComponent, RequestWorkflowComponent, RequestChatComponent],
    templateUrl: './request-details.html',
    styleUrls: ['./request-details.css']
})
export class RequestDetailsComponent implements OnInit {
    requestId: string | null = null;
    activeTab: string = 'Workflow'; // Set Workflow as default for testing/demo per user focus
    tabs: string[] = ['Details', 'Map', 'Workflow', 'Chat', 'Attachments'];

    workflowSteps = [
        {
            number: 1,
            label: 'Create NOC Request',
            description: 'Request initiated successfully.',
            date: '12 Dec 2025 • 09:41 AM',
            status: 'completed',
            statusLabel: 'Completed'
        },
        {
            number: 2,
            label: 'In Progress with GIS Team',
            description: 'Geographical data verification completed.',
            date: '13 Dec 2025 • 11:20 AM',
            status: 'completed',
            statusLabel: 'Completed',
            icon: 'map'
        },
        {
            number: 3,
            label: 'Planning Team Review',
            description: 'Currently under assessment by the urban planning department for zoning compliance.',
            date: '',
            status: 'active',
            statusLabel: 'In Progress'
        },
        {
            number: 4,
            label: 'Final Approval',
            description: 'Final sign-off pending.',
            date: '',
            status: 'pending',
            statusLabel: 'Pending'
        }
    ];

    // Dummy Data for Demo
    requestData = {
        projectTitle: 'Commercial Complex Construction',
        requestType: 'Commercial',
        isProjectOwner: true,
        clientName: 'Ahmed Al-Said',
        governorate: 'Muscat',
        district: 'Seeb',
        reason: 'Construction of a new 3-story commercial complex.',
        additionalDetails: 'Proximity to main road requires extra clearance.'
    };

    attachments = {
        drawingFile: { name: 'site_plan_v2.kmz', size: '2.4 MB', extension: 'kmz' },
        drawingsPdf: { name: 'architectural_drawings.pdf', size: '5.1 MB', extension: 'pdf' },
        requestLetter: { name: 'official_request.docx', size: '1.2 MB', extension: 'docx' },
        instructionLetter: null,
        undertakingLetter: { name: 'undertaking_signed.pdf', size: '0.8 MB', extension: 'pdf' }
    };

    // Dummy Chat Data
    chatMessages = [
        {
            sender: 'Ahmed Al-Sayed',
            text: 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur.',
            time: '9:18 Am',
            isMe: false,
            avatar: ''
        },
        {
            sender: 'Hajar Al-Maqbally',
            text: 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean lacinia bibendum nulla sed consectetur.',
            time: '9:18 Am',
            isMe: true,
            avatar: ''
        },
        {
            sender: 'Khalid Al-Amri',
            text: 'Please verify the coordinates on the map tab before proceeding with the approval. Let me know if you need any adjustments.',
            time: '9:20 Am',
            isMe: false,
            avatar: ''
        }
    ];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.requestId = params.get('id');
        });
    }

    setActiveTab(tab: string) {
        this.activeTab = tab;
    }
}
