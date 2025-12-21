import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppButton } from '../../../../components/button/button';

@Component({
    selector: 'app-new-delegation',
    standalone: true,
    imports: [CommonModule, FormsModule, AppButton],
    templateUrl: './new-delegation.component.html',
    styleUrl: './new-delegation.component.css'
})
export class NewDelegationComponent {
    isAdmin = true; // Toggle for dev, normally from AuthService

    // Dynamic Calendar Logic
    currentDate = new Date();
    currentMonthName = '';
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    calendarDays: any[] = [];

    // Selection state
    selectionStart: Date | null = null;
    selectionEnd: Date | null = null;

    // Form bound strings
    startDateStr = '';
    endDateStr = '';

    constructor(private router: Router) {
        // Initialize with current month
        this.generateCalendar(this.currentDate);
    }

    generateCalendar(date: Date) {
        this.currentMonthName = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
        const daysInMonth = lastDayOfMonth.getDate();

        // Previous month days to fill grid
        const prevMonthDays = [];
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            prevMonthDays.push({
                day: prevMonthLastDay - i,
                currentMonth: false,
                date: new Date(year, month - 1, prevMonthLastDay - i)
            });
        }

        // Current month days
        const currentMonthDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            currentMonthDays.push({
                day: i,
                currentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next month days to fill grid (42 cells total for 6 rows standard)
        const nextMonthDays = [];
        const remainingCells = 42 - (prevMonthDays.length + currentMonthDays.length);
        for (let i = 1; i <= remainingCells; i++) {
            nextMonthDays.push({
                day: i,
                currentMonth: false,
                date: new Date(year, month + 1, i)
            });
        }

        this.calendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
        this.updateSelectionStyles();
    }

    prevMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.generateCalendar(this.currentDate);
    }

    nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.generateCalendar(this.currentDate);
    }

    selectDate(day: any) {
        const clickedDate = day.date;

        if (!this.selectionStart || (this.selectionStart && this.selectionEnd)) {
            // Start new selection range
            this.selectionStart = clickedDate;
            this.selectionEnd = null;
        } else if (clickedDate < this.selectionStart) {
            // If clicked before start, make it new start
            this.selectionStart = clickedDate;
        } else {
            // Complete range
            this.selectionEnd = clickedDate;
        }

        this.updateSelectionStyles();
        this.updateInputFields();
    }

    updateSelectionStyles() {
        this.calendarDays.forEach(day => {
            const date = day.date;
            day.selected = false;
            day.start = false;
            day.end = false;

            if (this.selectionStart) {
                if (date.getTime() === this.selectionStart.getTime()) {
                    day.selected = true;
                    day.start = true;
                }

                if (this.selectionEnd) {
                    if (date.getTime() === this.selectionEnd.getTime()) {
                        day.selected = true;
                        day.end = true;
                    }

                    if (date > this.selectionStart! && date < this.selectionEnd) {
                        day.selected = true;
                    }
                }
            }
        });
    }

    updateInputFields() {
        if (this.selectionStart) {
            this.startDateStr = this.formatDate(this.selectionStart);
        } else {
            this.startDateStr = '';
        }

        if (this.selectionEnd) {
            this.endDateStr = this.formatDate(this.selectionEnd);
        } else {
            this.endDateStr = '';
        }
    }

    formatDate(date: Date): string {
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    }

    get durationDays(): string {
        if (this.selectionStart && this.selectionEnd) {
            const diffTime = Math.abs(this.selectionEnd.getTime() - this.selectionStart.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include start day
            return `${diffDays} Days`;
        }
        return '0 Days';
    }

    get durationRange(): string {
        if (this.selectionStart) {
            let range = this.formatDate(this.selectionStart).split(',')[0]; // "Sep 24"
            if (this.selectionEnd) {
                range += ' - ' + this.formatDate(this.selectionEnd).split(',')[0];
            }
            return range;
        }
        return 'Select dates';
    }



    onCancel() {
        this.router.navigate(['/application/delegation']);
    }

    onConfirm() {
        console.log('Confirmed delegation');
        this.router.navigate(['/application/delegation']);
    }
}
