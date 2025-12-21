import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/role.model';
import { FilterBarComponent } from '../../../components/filter-bar/filter-bar.component';

interface Delegation {
  id: string;
  userName: string;
  userInitials: string;
  userRole: string;
  avatarColorClass: string;
  roleClass: string;
  onlineStatus: string; // 'green', 'grey', 'purple'

  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;

  progress: number;
  progressText?: string;
  remainingTime?: string;
  endedAgo?: string;
  startsIn?: string;

  status: 'Valid' | 'Invalid' | 'Upcoming';
}

// Enhanced Interface for Admin View
interface AdminDelegation {
  id: string; // e.g. DLG-2023-089
  type: string; // e.g. System Access, Shift Coverage
  status: 'Active' | 'Pending' | 'Revoked' | 'Expiring';

  delegator: {
    name: string;
    role: string;
    avatar?: string; // image url or use initials
    initials?: string;
    colorClass?: string;
  };

  delegate: {
    name: string;
    role: string;
    avatar?: string;
    initials?: string;
    colorClass?: string;
  };

  startDate: string;
  endDate: string;
  duration: string; // '2 Days'
  remaining?: string; // '5 days remaining'
}

@Component({
  selector: 'app-delegation',
  standalone: true,
  imports: [CommonModule, FilterBarComponent],
  templateUrl: './delegation.component.html',
  styleUrl: './delegation.component.css'
})
export class DelegationComponent implements OnInit {
  isAdmin = true; // Toggle for development

  // User View Data
  delegations: Delegation[] = [];
  allDelegations: Delegation[] = [];

  // Admin View Data
  adminDelegations: AdminDelegation[] = [];
  filteredAdminDelegations: AdminDelegation[] = [];
  adminStats = {
    active: 24,
    pending: 7,
    expiring: 3,
    total: 142
  };

  // Admin View State
  adminViewMode: 'grid' | 'list' = 'grid';
  adminFilterStatus: string = 'All'; // 'All', 'Active', 'Pending', 'Revoked'

  // Options for shared filter bar (User View)
  statusOptions = [
    { label: 'Status: All', value: 'All' },
    { label: 'Status: Valid', value: 'Valid' },
    { label: 'Status: Upcoming', value: 'Upcoming' },
    { label: 'Status: Invalid', value: 'Invalid' }
  ];

  adminRoleOptions = ['Delegator', 'Delegate', 'Admin'];

  adminStatusOptions = [
    { label: 'Status: All', value: 'All' },
    { label: 'Status: Active', value: 'Active' },
    { label: 'Status: Pending', value: 'Pending' },
    { label: 'Status: Upcoming', value: 'Upcoming' },
    { label: 'Status: Expiring', value: 'Expiring' },
    { label: 'Status: Revoked', value: 'Revoked' }
  ];

  constructor(private authService: AuthService, private router: Router) {
    // Real role check (commented out for dev to force Admin view)
    // this.isAdmin = this.authService.getCurrentUserRole() === UserRole.Admin;
  }

  ngOnInit() {
    if (this.isAdmin) {
      this.loadAdminMockData();
    } else {
      this.loadMockData();
    }
  }

  navigateToNewDelegation() {
    this.router.navigate(['/application/delegation/new']);
  }

  // Admin Actions
  loadAdminMockData() {
    this.adminStats = { active: 24, pending: 7, expiring: 3, total: 142 };
    this.adminDelegations = [
      {
        id: 'DLG-2023-089',
        type: 'System Access',
        status: 'Active',
        delegator: { name: 'Hajar A.', role: 'DELEGATOR', initials: 'HA', colorClass: 'blue-light' },
        delegate: { name: 'Ahmed Ali', role: 'DELEGATE', initials: 'AA', colorClass: 'green' }, // using color class logic if compatible or new
        startDate: 'Sep 24',
        endDate: 'Oct 05',
        duration: '11 Days',
        remaining: '5 days remaining'
      },
      {
        id: 'DLG-2023-092',
        type: 'Shift Coverage',
        status: 'Pending',
        delegator: { name: 'Sara Khan', role: 'DELEGATOR', initials: 'SK', colorClass: 'grey' },
        delegate: { name: 'John Doe', role: 'DELEGATE', initials: 'JD', colorClass: 'purple' },
        startDate: 'Oct 10',
        endDate: 'Oct 12',
        duration: '2 Days'
      },
      {
        id: 'DLG-2023-085',
        type: 'Emergency Access',
        status: 'Expiring', // Visualized as Active with warning or Expiring badge
        delegator: { name: 'Mike K.', role: 'ADMIN', initials: 'MK', colorClass: 'blue-dark' }, // Custom handling
        delegate: { name: 'Ahmed Ali', role: 'DELEGATE', initials: 'AA', colorClass: 'green' },
        startDate: 'Oct 01',
        endDate: 'Oct 03',
        duration: '3 Days',
        remaining: '4h remaining'
      },
      {
        id: 'DLG-2023-044',
        type: 'Audit Review',
        status: 'Revoked',
        delegator: { name: 'Hajar A.', role: 'DELEGATOR', initials: 'HA', colorClass: 'grey' },
        delegate: { name: 'Alex L.', role: 'DELEGATE', initials: 'AL', colorClass: 'grey' },
        startDate: 'Aug 10',
        endDate: 'Aug 15',
        duration: '5 Days'
      }
    ];
    this.filteredAdminDelegations = [...this.adminDelegations];
  }

  loadMockData() {
    this.allDelegations = [
      {
        id: '01',
        userName: 'Mohammed Khalifa',
        userInitials: 'MK',
        userRole: 'Supervisor Role',
        avatarColorClass: 'blue-light',
        roleClass: 'blue-light',
        onlineStatus: 'green',
        startDate: '12 Jun, 2024',
        startTime: '12:53 PM',
        endDate: '15 Jul, 2024',
        endTime: '12:53 PM',
        progress: 65,
        progressText: '65% Completed',
        remainingTime: '18 Days Remaining',
        status: 'Valid'
      },
      {
        id: '02',
        userName: 'Sarah Ahmed',
        userInitials: 'SA',
        userRole: 'Technical Lead',
        avatarColorClass: 'grey',
        roleClass: 'grey',
        onlineStatus: 'grey',
        startDate: '12 Jun, 2024',
        startTime: '',
        endDate: '15 Jul, 2024',
        endTime: '',
        progress: 100,
        endedAgo: '2 days ago',
        status: 'Invalid'
      },
      {
        id: '03',
        userName: 'John Doe',
        userInitials: 'JD',
        userRole: 'NOC Operator',
        avatarColorClass: 'purple',
        roleClass: 'purple',
        onlineStatus: 'purple',
        startDate: '01 Aug, 2024',
        startTime: '09:00 AM',
        endDate: '05 Aug, 2024',
        endTime: '06:00 PM',
        progress: 0,
        startsIn: '2 weeks',
        status: 'Upcoming'
      },
      {
        id: '04',
        userName: 'Fatima Ali',
        userInitials: 'FA',
        userRole: 'Supervisor Role',
        avatarColorClass: 'blue-light',
        roleClass: 'blue-light',
        onlineStatus: 'green',
        startDate: '10 Nov, 2024',
        startTime: '10:00 AM',
        endDate: '20 Nov, 2024',
        endTime: '05:00 PM',
        progress: 10,
        progressText: '10% Completed',
        remainingTime: '9 Days Remaining',
        status: 'Valid'
      }
    ];
    // Initial load: show all
    this.delegations = [...this.allDelegations];
  }

  // Admin Interactions
  activeDropdown: string | null = null;
  selectedAdminStatus: string = 'All';
  selectedAdminRole: string = 'All';

  setAdminViewMode(mode: 'grid' | 'list') {
    this.adminViewMode = mode;
  }

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdown;
    }
  }

  filterAdminDelegations() {
    this.filteredAdminDelegations = this.adminDelegations.filter(item => {
      const matchStatus = this.selectedAdminStatus === 'All' || item.status === this.selectedAdminStatus;
      const matchRole = this.selectedAdminRole === 'All' ||
        item.delegator.role === this.selectedAdminRole.toUpperCase() ||
        item.delegate.role === this.selectedAdminRole.toUpperCase() ||
        (this.selectedAdminRole === 'Admin' && item.delegator.role === 'ADMIN');
      return matchStatus && matchRole;
    });
  }

  // --- Filter Logic ---

  // --- Filter Logic ---

  onFilterChange(filters: any) {
    if (this.isAdmin) {
      // Update Admin State
      this.selectedAdminStatus = filters.status || 'All';
      this.selectedAdminRole = filters.role || 'All';

      this.filterAdminDelegations();
      return;
    }

    let result = [...this.allDelegations];

    // 1. Status Filter
    if (filters.status && filters.status !== 'All') {
      result = result.filter(item => item.status === filters.status);
    }

    // 2. Date Filter
    if (filters.date) {
      // Handle 'Today', 'This Week', 'All Time'
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

      if (filters.date === 'Today') {
        result = result.filter(item => {
          const itemDate = new Date(item.startDate).getTime();
          return itemDate >= todayStart;
        });
      } else if (filters.date === 'This Week') {
        const dayOfWeek = now.getDay(); // 0-6
        const weekStart = new Date(now.setDate(now.getDate() - dayOfWeek)).getTime();
        result = result.filter(item => {
          const itemDate = new Date(item.startDate).getTime();
          return itemDate >= weekStart;
        });
      }
    }

    // 3. Sort (By Start Date) - Match FilterBar 'Newest'/'Oldest'
    const order = filters.order || 'Newest';
    result.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();
      return order === 'Oldest' ? dateA - dateB : dateB - dateA; // Default Newest (desc)
    });

    this.delegations = result;
  }
}
