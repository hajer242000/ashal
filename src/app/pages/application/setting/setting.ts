import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-setting',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './setting.html',
    styleUrl: './setting.css'
})
export class SettingComponent {
    activeTab: 'edit-profile' | 'preferences' | 'security' = 'edit-profile';

    profileData = {
        fullName: 'Hajer',
        username: 'Hajer Abdallh',
        email: 'hajer@gmail.com',
        phoneNumber: '71590494',
        idNumber: '236745',
        accountType: 'Personal'
    };

    preferencesData = {
        nocUpdates: true,
        newMessages: false
    };

    securityData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    passwordVisibility = {
        current: false,
        new: false,
        confirm: false
    };

    passwordStrengthScore = 0;
    passwordStrengthLabel = '';
    passwordStrengthColor = 'text-gray-400';

    setActiveTab(tab: 'edit-profile' | 'preferences' | 'security') {
        this.activeTab = tab;
    }

    toggleVisibility(field: 'current' | 'new' | 'confirm') {
        this.passwordVisibility[field] = !this.passwordVisibility[field];
    }

    checkPasswordStrength() {
        const password = this.securityData.newPassword;
        let score = 0;

        if (!password) {
            this.passwordStrengthScore = 0;
            this.passwordStrengthLabel = '';
            this.passwordStrengthColor = 'text-gray-400';
            return;
        }

        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        this.passwordStrengthScore = score;

        switch (score) {
            case 0:
            case 1:
                this.passwordStrengthLabel = 'Weak';
                this.passwordStrengthColor = 'text-red-500';
                break;
            case 2:
            case 3:
                this.passwordStrengthLabel = 'Medium';
                this.passwordStrengthColor = 'text-orange-500';
                break;
            case 4:
                this.passwordStrengthLabel = 'Strong';
                this.passwordStrengthColor = 'text-green-500';
                break;
        }
    }

    get passwordsMatch(): boolean {
        return !this.securityData.confirmPassword || this.securityData.newPassword === this.securityData.confirmPassword;
    }

    get canSaveSecurity(): boolean {
        return this.passwordStrengthScore >= 3 &&
            this.securityData.newPassword === this.securityData.confirmPassword &&
            !!this.securityData.currentPassword;
    }

    saveChanges() {
        console.log('Saving profile...', this.profileData);
        // Implement save logic here
    }

    savePreferences() {
        console.log('Saving preferences...', this.preferencesData);
        // Implement save preferences logic here
    }

    saveSecurity() {
        console.log('Saving security...', this.securityData);
        // Implement save security logic here
    }
}
