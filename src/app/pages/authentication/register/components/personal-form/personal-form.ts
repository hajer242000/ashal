import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-personal-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './personal-form.html',
  styleUrl: './personal-form.css',
})
export class PersonalForm {}
