import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-file-uploader',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './file-uploader.html',
    styleUrl: './file-uploader.css',
})
export class FileUploader implements ControlValueAccessor {
    @Input() label = 'Upload File';
    @Input() accept = '*';

    fileName: string | null = null;
    file: File | null = null;
    isDisabled = false;

    onChange = (value: any) => { };
    onTouched = () => { };

    constructor(@Self() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length) {
            this.file = input.files[0];
            this.fileName = this.file.name;
            this.onChange(this.file);
            this.onTouched();
        }
    }


    writeValue(value: any): void {
     
        if (!value) {
            this.file = null;
            this.fileName = null;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
