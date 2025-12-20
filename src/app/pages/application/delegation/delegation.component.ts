import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delegation',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Delegation Management</h1>
      <div class="bg-white p-6 rounded-lg shadow">
        <p class="text-gray-600">Delegation features are under construction.</p>
      </div>
    </div>
  `
})
export class DelegationComponent { }
