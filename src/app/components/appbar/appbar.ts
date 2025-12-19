import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-appbar',
    standalone: true,
    imports: [CommonModule, MatIconModule],
    templateUrl: './appbar.html',
    styleUrls: ['./appbar.css'],
})
export class AppbarComponent { }
