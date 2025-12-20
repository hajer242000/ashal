import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-request-chat',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './request-chat.html'
})
export class RequestChatComponent {
    @Input() messages: any[] = [];
    newMessage: string = '';

    sendMessage() {
        if (!this.newMessage.trim()) return;

        this.messages.push({
            sender: 'You',
            text: this.newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            avatar: 'assets/avatars/user.png' // Placeholder or dynamic
        });
        this.newMessage = '';
    }
}
