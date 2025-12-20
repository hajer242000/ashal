import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-request-attachments',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './request-attachments.html'
})
export class RequestAttachmentsComponent {
    @Input() attachments: any = {};
    @Input() readOnly: boolean = false;

    // Track drag state for each field
    isDragging: any = {
        drawingFile: false,
        drawingsPdf: false,
        requestLetter: false,
        instructionLetter: false,
        undertakingLetter: false
    };

    triggerFileInput(inputId: string) {
        if (this.readOnly) return;
        document.getElementById(inputId)?.click();
    }

    onFileSelected(event: any, field: string) {
        if (this.readOnly) return;
        const file = event.target.files[0];
        if (file) {
            this.handleFile(file, field);
        }
    }

    onDragOver(event: any, field: string) {
        if (this.readOnly) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragging[field] = true;
    }

    onDragLeave(event: any, field: string) {
        if (this.readOnly) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragging[field] = false;
    }

    onDrop(event: any, field: string) {
        if (this.readOnly) return;
        event.preventDefault();
        event.stopPropagation();
        this.isDragging[field] = false;

        const file = event.dataTransfer.files[0];
        if (file) {
            this.handleFile(file, field);
        }
    }

    handleFile(file: File, field: string) {
        this.attachments[field] = {
            name: file.name,
            size: this.formatBytes(file.size),
            file: file,
            extension: file.name.split('.').pop()?.toLowerCase() || ''
        };
    }

    deleteFile(field: string) {
        if (this.readOnly) return;
        this.attachments[field] = null;
        const input = document.getElementById('file-' + field) as HTMLInputElement;
        if (input) input.value = '';
    }

    formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
