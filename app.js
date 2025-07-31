// Employee Management System JavaScript
class EmployeeManagementSystem {
    constructor() {
        // Sample data from the provided JSON
        this.users = [
            { id: "1", email: "admin@company.com", password: "admin123", name: "John Admin", role: "admin" },
            { id: "2", email: "hr@company.com", password: "hr123", name: "Sarah HR", role: "hr_manager" },
            { id: "3", email: "employee@company.com", password: "emp123", name: "Mike Employee", role: "employee" }
        ];

        this.employees = [
            {
                id: "1", employeeId: "EMP0001", name: "Alice Johnson", email: "alice.johnson@company.com",
                phone: "+1-555-0101", department: "IT", position: "Software Engineer", salary: 85000,
                dateOfJoining: "2023-01-15", status: "active", profilePicture: null,
                address: { street: "123 Main St", city: "New York", state: "NY", zipCode: "10001", country: "USA" },
                emergencyContact: { name: "Bob Johnson", relationship: "Spouse", phone: "+1-555-0102" }
            },
            {
                id: "2", employeeId: "EMP0002", name: "David Smith", email: "david.smith@company.com",
                phone: "+1-555-0201", department: "HR", position: "HR Specialist", salary: 65000,
                dateOfJoining: "2022-08-22", status: "active", profilePicture: null,
                address: { street: "456 Oak Ave", city: "Los Angeles", state: "CA", zipCode: "90210", country: "USA" },
                emergencyContact: { name: "Mary Smith", relationship: "Mother", phone: "+1-555-0202" }
            },
            {
                id: "3", employeeId: "EMP0003", name: "Emily Davis", email: "emily.davis@company.com",
                phone: "+1-555-0301", department: "Finance", position: "Financial Analyst", salary: 72000,
                dateOfJoining: "2021-11-10", status: "active", profilePicture: null,
                address: { street: "789 Pine Rd", city: "Chicago", state: "IL", zipCode: "60614", country: "USA" },
                emergencyContact: { name: "Tom Davis", relationship: "Father", phone: "+1-555-0302" }
            },
            {
                id: "4", employeeId: "EMP0004", name: "Michael Wilson", email: "michael.wilson@company.com",
                phone: "+1-555-0401", department: "Marketing", position: "Marketing Manager", salary: 88000,
                dateOfJoining: "2020-05-18", status: "inactive", profilePicture: null,
                address: { street: "321 Elm St", city: "Miami", state: "FL", zipCode: "33101", country: "USA" },
                emergencyContact: { name: "Lisa Wilson", relationship: "Wife", phone: "+1-555-0402" }
            },
            {
                id: "5", employeeId: "EMP0005", name: "Jennifer Brown", email: "jennifer.brown@company.com",
                phone: "+1-555-0501", department: "Operations", position: "Operations Coordinator", salary: 58000,
                dateOfJoining: "2023-03-12", status: "active", profilePicture: null,
                address: { street: "654 Maple Dr", city: "Seattle", state: "WA", zipCode: "98101", country: "USA" },
                emergencyContact: { name: "Steve Brown", relationship: "Brother", phone: "+1-555-0502" }
            },
            {
                id: "6", employeeId: "EMP0006", name: "Robert Taylor", email: "robert.taylor@company.com",
                phone: "+1-555-0601", department: "Sales", position: "Sales Representative", salary: 62000,
                dateOfJoining: "2022-12-05", status: "active", profilePicture: null,
                address: { street: "987 Cedar Ln", city: "Denver", state: "CO", zipCode: "80201", country: "USA" },
                emergencyContact: { name: "Nancy Taylor", relationship: "Mother", phone: "+1-555-0602" }
            },
            {
                id: "7", employeeId: "EMP0007", name: "Lisa Anderson", email: "lisa.anderson@company.com",
                phone: "+1-555-0701", department: "IT", position: "DevOps Engineer", salary: 92000,
                dateOfJoining: "2021-07-08", status: "active", profilePicture: null,
                address: { street: "147 Birch Ave", city: "Austin", state: "TX", zipCode: "73301", country: "USA" },
                emergencyContact: { name: "Mark Anderson", relationship: "Husband", phone: "+1-555-0702" }
            },
            {
                id: "8", employeeId: "EMP0008", name: "Christopher Lee", email: "christopher.lee@company.com",
                phone: "+1-555-0801", department: "Finance", position: "Senior Accountant", salary: 78000,
                dateOfJoining: "2020-09-14", status: "inactive", profilePicture: null,
                address: { street: "258 Spruce St", city: "Boston", state: "MA", zipCode: "02101", country: "USA" },
                emergencyContact: { name: "Helen Lee", relationship: "Wife", phone: "+1-555-0802" }
            }
        ];

        this.departments = [
            { id: "1", name: "IT", description: "Information Technology" },
            { id: "2", name: "HR", description: "Human Resources" },
            { id: "3", name: "Finance", description: "Finance & Accounting" },
            { id: "4", name: "Marketing", description: "Marketing & Communications" },
            { id: "5", name: "Operations", description: "Operations & Logistics" },
            { id: "6", name: "Sales", description: "Sales & Business Development" }
        ];

        this.positions = [
            "Software Engineer", "DevOps Engineer", "HR Specialist", "HR Manager",
            "Financial Analyst", "Senior Accountant", "Marketing Manager", "Marketing Specialist",
            "Operations Coordinator", "Operations Manager", "Sales Representative", "Sales Manager"
        ];

        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.isTableView = false;
        this.filteredEmployees = [...this.employees];
        this.departmentChart = null;
        this.statusChart = null;
        this.employeeToDelete = null;

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        this.checkAuthStatus();
        this.bindEvents();
        this.populateDropdowns();
    }

    checkAuthStatus() {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
            if (user) {
                this.currentUser = user;
                this.showMainApp();
            } else {
                this.showLogin();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            this.showLogin();
        }
    }

    bindEvents() {
        // Login form - use arrow function to preserve 'this' context
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e);
            });
        }
        
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(e);
            });
        });

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Search
        const globalSearch = document.getElementById('globalSearch');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filters
        const departmentFilter = document.getElementById('departmentFilter');
        const statusFilter = document.getElementById('statusFilter');
        if (departmentFilter) {
            departmentFilter.addEventListener('change', () => this.applyFilters());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.applyFilters());
        }

        // Toggle view
        const toggleView = document.getElementById('toggleView');
        if (toggleView) {
            toggleView.addEventListener('click', () => this.toggleEmployeeView());
        }

        // Add employee form
        const addEmployeeForm = document.getElementById('addEmployeeForm');
        if (addEmployeeForm) {
            addEmployeeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddEmployee(e);
            });
        }
        
        const cancelAdd = document.getElementById('cancelAdd');
        if (cancelAdd) {
            cancelAdd.addEventListener('click', () => this.navigateToPage('employees'));
        }

        // CSV operations
        const csvFileInput = document.getElementById('csvFileInput');
        if (csvFileInput) {
            csvFileInput.addEventListener('change', (e) => this.handleCsvFileSelect(e));
        }

        const importCsv = document.getElementById('importCsv');
        if (importCsv) {
            importCsv.addEventListener('click', () => this.importCsv());
        }

        const exportCsv = document.getElementById('exportCsv');
        if (exportCsv) {
            exportCsv.addEventListener('click', () => this.exportCsv());
        }

        const downloadTemplate = document.getElementById('downloadTemplate');
        if (downloadTemplate) {
            downloadTemplate.addEventListener('click', () => this.downloadTemplate());
        }

        // Modal events
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });
    }

    // Authentication
    handleLogin(e) {
        e.preventDefault();
        console.log('Login form submitted');

        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorDiv = document.getElementById('loginError');

        if (!emailInput || !passwordInput) {
            console.error('Login form inputs not found');
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        console.log('Login attempt:', { email, password });

        // Clear previous error
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }

        if (!email || !password) {
            if (errorDiv) {
                errorDiv.textContent = 'Please enter both email and password';
                errorDiv.style.display = 'block';
            }
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            console.log('Login successful for user:', user);
            this.currentUser = user;
            try {
                localStorage.setItem('currentUser', JSON.stringify(user));
            } catch (error) {
                console.warn('Could not save to localStorage:', error);
            }
            this.showMainApp();
            this.showToast('Welcome back!', 'success');
        } else {
            console.log('Login failed - invalid credentials');
            if (errorDiv) {
                errorDiv.textContent = 'Invalid email or password';
                errorDiv.style.display = 'block';
            }
        }
    }

    handleLogout() {
        try {
            localStorage.removeItem('currentUser');
        } catch (error) {
            console.warn('Could not remove from localStorage:', error);
        }
        this.currentUser = null;
        this.showLogin();
        this.showToast('Logged out successfully', 'success');
    }

    showLogin() {
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        const loginError = document.getElementById('loginError');
        const loginForm = document.getElementById('loginForm');

        if (loginPage) loginPage.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
        if (loginError) loginError.style.display = 'none';
        if (loginForm) loginForm.reset();
    }

    showMainApp() {
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');

        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        // Update user info in header
        const userName = document.getElementById('userName');
        const userRole = document.getElementById('userRole');
        
        if (userName && this.currentUser) {
            userName.textContent = this.currentUser.name;
        }
        if (userRole && this.currentUser) {
            userRole.textContent = this.currentUser.role.replace('_', ' ').toUpperCase();
        }
        
        // Handle role-based access
        this.setupRoleBasedAccess();
        
        // Load dashboard by default
        this.navigateToPage('dashboard');
    }

    setupRoleBasedAccess() {
        const addEmployeeNavs = document.querySelectorAll('.add-employee-nav');
        const csvNavs = document.querySelectorAll('.csv-nav');
        
        if (this.currentUser && this.currentUser.role === 'employee') {
            // Employees can only view
            addEmployeeNavs.forEach(nav => nav.style.display = 'none');
            csvNavs.forEach(nav => nav.style.display = 'none');
        } else {
            addEmployeeNavs.forEach(nav => nav.style.display = 'flex');
            csvNavs.forEach(nav => nav.style.display = 'flex');
        }
    }

    // Navigation
    handleNavigation(e) {
        e.preventDefault();
        const page = e.currentTarget.dataset.page;
        if (page) {
            this.navigateToPage(page);
        }
    }

    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        const navItem = document.querySelector(`[data-page="${page}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }

        // Show selected page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(`${page}Page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        this.currentPage = page;

        // Load page-specific content
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'employees':
                this.loadEmployees();
                break;
            case 'addEmployee':
                this.resetAddEmployeeForm();
                break;
            case 'csv':
                this.loadCsvPage();
                break;
        }
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    // Dashboard
    loadDashboard() {
        this.updateStats();
        // Small delay to ensure DOM is ready for charts
        setTimeout(() => {
            this.loadCharts();
        }, 100);
    }

    updateStats() {
        const activeEmployees = this.employees.filter(emp => emp.status === 'active').length;
        const inactiveEmployees = this.employees.filter(emp => emp.status === 'inactive').length;
        const uniqueDepartments = [...new Set(this.employees.map(emp => emp.department))].length;

        const totalEmployeesEl = document.getElementById('totalEmployees');
        const activeEmployeesEl = document.getElementById('activeEmployees');
        const inactiveEmployeesEl = document.getElementById('inactiveEmployees');
        const totalDepartmentsEl = document.getElementById('totalDepartments');

        if (totalEmployeesEl) totalEmployeesEl.textContent = this.employees.length;
        if (activeEmployeesEl) activeEmployeesEl.textContent = activeEmployees;
        if (inactiveEmployeesEl) inactiveEmployeesEl.textContent = inactiveEmployees;
        if (totalDepartmentsEl) totalDepartmentsEl.textContent = uniqueDepartments;
    }

    loadCharts() {
        this.loadDepartmentChart();
        this.loadStatusChart();
    }

    loadDepartmentChart() {
        const canvas = document.getElementById('departmentChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.departmentChart) {
            this.departmentChart.destroy();
        }

        const departmentCounts = {};
        this.employees.forEach(emp => {
            departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
        });

        this.departmentChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(departmentCounts),
                datasets: [{
                    data: Object.values(departmentCounts),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    loadStatusChart() {
        const canvas = document.getElementById('statusChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.statusChart) {
            this.statusChart.destroy();
        }

        const activeCount = this.employees.filter(emp => emp.status === 'active').length;
        const inactiveCount = this.employees.filter(emp => emp.status === 'inactive').length;

        this.statusChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Active', 'Inactive'],
                datasets: [{
                    data: [activeCount, inactiveCount],
                    backgroundColor: ['#1FB8CD', '#B4413C'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    // Employee Management
    loadEmployees() {
        this.applyFilters();
    }

    applyFilters() {
        const globalSearch = document.getElementById('globalSearch');
        const departmentFilter = document.getElementById('departmentFilter');
        const statusFilter = document.getElementById('statusFilter');

        const searchTerm = globalSearch ? globalSearch.value.toLowerCase() : '';
        const departmentFilterValue = departmentFilter ? departmentFilter.value : '';
        const statusFilterValue = statusFilter ? statusFilter.value : '';

        this.filteredEmployees = this.employees.filter(emp => {
            const matchesSearch = emp.name.toLowerCase().includes(searchTerm) ||
                                emp.email.toLowerCase().includes(searchTerm) ||
                                emp.department.toLowerCase().includes(searchTerm) ||
                                emp.position.toLowerCase().includes(searchTerm);
            
            const matchesDepartment = !departmentFilterValue || emp.department === departmentFilterValue;
            const matchesStatus = !statusFilterValue || emp.status === statusFilterValue;

            return matchesSearch && matchesDepartment && matchesStatus;
        });

        if (this.isTableView) {
            this.renderEmployeeTable();
        } else {
            this.renderEmployeeCards();
        }
    }

    handleSearch(searchTerm) {
        this.applyFilters();
    }

    toggleEmployeeView() {
        this.isTableView = !this.isTableView;
        const toggleBtn = document.getElementById('toggleView');
        const cardsContainer = document.getElementById('employeeCards');
        const tableContainer = document.getElementById('employeeTable');

        if (toggleBtn && cardsContainer && tableContainer) {
            if (this.isTableView) {
                toggleBtn.innerHTML = '<i class="fas fa-th"></i> Card View';
                cardsContainer.classList.add('hidden');
                tableContainer.classList.remove('hidden');
                this.renderEmployeeTable();
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-list"></i> Table View';
                cardsContainer.classList.remove('hidden');
                tableContainer.classList.add('hidden');
                this.renderEmployeeCards();
            }
        }
    }

    renderEmployeeCards() {
        const container = document.getElementById('employeeCards');
        if (!container) return;

        container.innerHTML = '';

        this.filteredEmployees.forEach(employee => {
            const card = this.createEmployeeCard(employee);
            container.appendChild(card);
        });
    }

    createEmployeeCard(employee) {
        const card = document.createElement('div');
        card.className = 'employee-card';
        
        const initials = employee.name.split(' ').map(n => n[0]).join('');
        const experience = this.calculateExperience(employee.dateOfJoining);
        
        card.innerHTML = `
            <div class="employee-header">
                <div class="employee-avatar">${initials}</div>
                <div class="employee-info">
                    <h3>${employee.name}</h3>
                    <p>${employee.email}</p>
                </div>
            </div>
            <div class="employee-details">
                <div class="employee-detail">
                    <span>Department</span>
                    <span>${employee.department}</span>
                </div>
                <div class="employee-detail">
                    <span>Position</span>
                    <span>${employee.position}</span>
                </div>
                <div class="employee-detail">
                    <span>Experience</span>
                    <span>${experience}</span>
                </div>
                <div class="employee-detail">
                    <span>Status</span>
                    <span class="employee-status ${employee.status}">
                        <i class="fas fa-circle"></i>
                        ${employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                    </span>
                </div>
            </div>
            <div class="employee-actions">
                <button class="action-btn view" onclick="window.ems.viewEmployee('${employee.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                ${this.currentUser && this.currentUser.role !== 'employee' ? `
                    <button class="action-btn edit" onclick="window.ems.editEmployee('${employee.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn toggle" onclick="window.ems.toggleEmployeeStatus('${employee.id}')" title="Toggle Status">
                        <i class="fas fa-toggle-${employee.status === 'active' ? 'on' : 'off'}"></i>
                    </button>
                    <button class="action-btn delete" onclick="window.ems.deleteEmployee('${employee.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        `;

        return card;
    }

    renderEmployeeTable() {
        const tbody = document.getElementById('employeeTableBody');
        if (!tbody) return;

        tbody.innerHTML = '';

        this.filteredEmployees.forEach(employee => {
            const row = this.createEmployeeTableRow(employee);
            tbody.appendChild(row);
        });
    }

    createEmployeeTableRow(employee) {
        const row = document.createElement('tr');
        const initials = employee.name.split(' ').map(n => n[0]).join('');

        row.innerHTML = `
            <td>
                <div class="table-employee-info">
                    <div class="table-avatar">${initials}</div>
                    <div class="table-employee-details">
                        <h4>${employee.name}</h4>
                        <p>${employee.email}</p>
                    </div>
                </div>
            </td>
            <td>${employee.department}</td>
            <td>${employee.position}</td>
            <td>
                <span class="employee-status ${employee.status}">
                    <i class="fas fa-circle"></i>
                    ${employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                </span>
            </td>
            <td>${new Date(employee.dateOfJoining).toLocaleDateString()}</td>
            <td>
                <div class="employee-actions">
                    <button class="action-btn view" onclick="window.ems.viewEmployee('${employee.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${this.currentUser && this.currentUser.role !== 'employee' ? `
                        <button class="action-btn edit" onclick="window.ems.editEmployee('${employee.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn toggle" onclick="window.ems.toggleEmployeeStatus('${employee.id}')" title="Toggle">
                            <i class="fas fa-toggle-${employee.status === 'active' ? 'on' : 'off'}"></i>
                        </button>
                        <button class="action-btn delete" onclick="window.ems.deleteEmployee('${employee.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        `;

        return row;
    }

    calculateExperience(joinDate) {
        const join = new Date(joinDate);
        const now = new Date();
        const diffTime = Math.abs(now - join);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        
        if (years > 0) {
            return `${years}y ${months}m`;
        } else {
            return `${months}m`;
        }
    }

    // Employee CRUD Operations
    viewEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) return;

        const modal = document.getElementById('viewEmployeeModal');
        const detailsContainer = document.getElementById('employeeDetails');

        if (modal && detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="employee-detail-grid">
                    <div class="detail-group">
                        <h4>Personal Information</h4>
                        <div class="detail-value"><strong>Name:</strong> ${employee.name}</div>
                        <div class="detail-value"><strong>Email:</strong> ${employee.email}</div>
                        <div class="detail-value"><strong>Phone:</strong> ${employee.phone}</div>
                        <div class="detail-value"><strong>Employee ID:</strong> ${employee.employeeId}</div>
                    </div>
                    <div class="detail-group">
                        <h4>Work Information</h4>
                        <div class="detail-value"><strong>Department:</strong> ${employee.department}</div>
                        <div class="detail-value"><strong>Position:</strong> ${employee.position}</div>
                        <div class="detail-value"><strong>Salary:</strong> $${employee.salary?.toLocaleString() || 'N/A'}</div>
                        <div class="detail-value"><strong>Date of Joining:</strong> ${new Date(employee.dateOfJoining).toLocaleDateString()}</div>
                        <div class="detail-value"><strong>Status:</strong> 
                            <span class="employee-status ${employee.status}">
                                <i class="fas fa-circle"></i>
                                ${employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div class="detail-group">
                        <h4>Address</h4>
                        <div class="detail-value">${employee.address.street}</div>
                        <div class="detail-value">${employee.address.city}, ${employee.address.state} ${employee.address.zipCode}</div>
                        <div class="detail-value">${employee.address.country}</div>
                    </div>
                    <div class="detail-group">
                        <h4>Emergency Contact</h4>
                        <div class="detail-value"><strong>Name:</strong> ${employee.emergencyContact.name}</div>
                        <div class="detail-value"><strong>Relationship:</strong> ${employee.emergencyContact.relationship}</div>
                        <div class="detail-value"><strong>Phone:</strong> ${employee.emergencyContact.phone}</div>
                    </div>
                </div>
            `;

            modal.classList.remove('hidden');
        }
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) return;

        const modal = document.getElementById('editEmployeeModal');
        const form = document.getElementById('editEmployeeForm');

        if (modal && form) {
            form.innerHTML = `
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label">Full Name *</label>
                        <input type="text" id="editName" class="form-control" value="${employee.name}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" id="editEmail" class="form-control" value="${employee.email}" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone</label>
                        <input type="tel" id="editPhone" class="form-control" value="${employee.phone}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Department *</label>
                        <select id="editDepartment" class="form-control" required>
                            ${this.departments.map(dept => 
                                `<option value="${dept.name}" ${dept.name === employee.department ? 'selected' : ''}>${dept.name}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Position *</label>
                        <select id="editPosition" class="form-control" required>
                            ${this.positions.map(pos => 
                                `<option value="${pos}" ${pos === employee.position ? 'selected' : ''}>${pos}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Salary</label>
                        <input type="number" id="editSalary" class="form-control" value="${employee.salary}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>
                        <select id="editStatus" class="form-control">
                            <option value="active" ${employee.status === 'active' ? 'selected' : ''}>Active</option>
                            <option value="inactive" ${employee.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="modal-actions">
                    <button type="button" onclick="window.ems.updateEmployee('${employee.id}')" class="btn btn--primary">Update Employee</button>
                    <button type="button" class="btn btn--secondary modal-close">Cancel</button>
                </div>
            `;

            modal.classList.remove('hidden');
        }
    }

    updateEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) return;

        const nameEl = document.getElementById('editName');
        const emailEl = document.getElementById('editEmail');
        const phoneEl = document.getElementById('editPhone');
        const departmentEl = document.getElementById('editDepartment');
        const positionEl = document.getElementById('editPosition');
        const salaryEl = document.getElementById('editSalary');
        const statusEl = document.getElementById('editStatus');

        if (nameEl && emailEl && departmentEl && positionEl) {
            const updatedData = {
                name: nameEl.value,
                email: emailEl.value,
                phone: phoneEl ? phoneEl.value : employee.phone,
                department: departmentEl.value,
                position: positionEl.value,
                salary: salaryEl ? parseInt(salaryEl.value) || employee.salary : employee.salary,
                status: statusEl ? statusEl.value : employee.status
            };

            Object.assign(employee, updatedData);
            
            this.closeModals();
            this.showToast('Employee updated successfully!', 'success');
            this.loadEmployees();
            if (this.currentPage === 'dashboard') {
                this.loadDashboard();
            }
        }
    }

    deleteEmployee(id) {
        this.employeeToDelete = id;
        const modal = document.getElementById('confirmDeleteModal');
        if (modal) {
            modal.classList.remove('hidden');
            
            const confirmBtn = document.getElementById('confirmDelete');
            if (confirmBtn) {
                confirmBtn.onclick = () => {
                    this.employees = this.employees.filter(emp => emp.id !== this.employeeToDelete);
                    this.closeModals();
                    this.showToast('Employee deleted successfully!', 'success');
                    this.loadEmployees();
                    if (this.currentPage === 'dashboard') {
                        this.loadDashboard();
                    }
                };
            }
        }
    }

    toggleEmployeeStatus(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (!employee) return;

        employee.status = employee.status === 'active' ? 'inactive' : 'active';
        this.showToast(`Employee status changed to ${employee.status}!`, 'success');
        this.loadEmployees();
        if (this.currentPage === 'dashboard') {
            this.loadDashboard();
        }
    }

    // Add Employee
    resetAddEmployeeForm() {
        const form = document.getElementById('addEmployeeForm');
        if (form) {
            form.reset();
        }
        const joinDateEl = document.getElementById('employeeJoinDate');
        if (joinDateEl) {
            joinDateEl.value = new Date().toISOString().split('T')[0];
        }
    }

    handleAddEmployee(e) {
        e.preventDefault();
        
        const newEmployee = {
            id: Date.now().toString(),
            employeeId: `EMP${String(this.employees.length + 1).padStart(4, '0')}`,
            name: document.getElementById('employeeName')?.value || '',
            email: document.getElementById('employeeEmail')?.value || '',
            phone: document.getElementById('employeePhone')?.value || '',
            department: document.getElementById('employeeDepartment')?.value || '',
            position: document.getElementById('employeePosition')?.value || '',
            salary: parseInt(document.getElementById('employeeSalary')?.value) || 0,
            dateOfJoining: document.getElementById('employeeJoinDate')?.value || new Date().toISOString().split('T')[0],
            status: document.getElementById('employeeStatus')?.value || 'active',
            profilePicture: null,
            address: {
                street: document.getElementById('employeeStreet')?.value || '',
                city: document.getElementById('employeeCity')?.value || '',
                state: document.getElementById('employeeState')?.value || '',
                zipCode: document.getElementById('employeeZip')?.value || '',
                country: 'USA'
            },
            emergencyContact: {
                name: document.getElementById('emergencyName')?.value || '',
                relationship: document.getElementById('emergencyRelation')?.value || '',
                phone: document.getElementById('emergencyPhone')?.value || ''
            }
        };

        this.employees.push(newEmployee);
        this.showToast('Employee added successfully!', 'success');
        this.navigateToPage('employees');
    }

    // CSV Operations
    loadCsvPage() {
        const csvFileInput = document.getElementById('csvFileInput');
        const importCsv = document.getElementById('importCsv');
        
        if (csvFileInput) {
            csvFileInput.value = '';
        }
        if (importCsv) {
            importCsv.disabled = true;
        }
    }

    handleCsvFileSelect(e) {
        const file = e.target.files[0];
        const importBtn = document.getElementById('importCsv');
        
        if (importBtn) {
            importBtn.disabled = !file;
        }
        
        if (file) {
            const label = document.querySelector('.file-label');
            if (label) {
                label.innerHTML = `<i class="fas fa-file-csv"></i> ${file.name}`;
            }
        }
    }

    importCsv() {
        const fileInput = document.getElementById('csvFileInput');
        const file = fileInput?.files[0];
        
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n').filter(line => line.trim() !== '');
                const headers = lines[0].split(',').map(h => h.trim());
                
                let importedCount = 0;
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    if (values.length >= headers.length) {
                        const employee = {
                            id: Date.now().toString() + i,
                            employeeId: values[0] || `EMP${String(this.employees.length + i).padStart(4, '0')}`,
                            name: values[1] || '',
                            email: values[2] || '',
                            phone: values[3] || '',
                            department: values[4] || '',
                            position: values[5] || '',
                            salary: parseInt(values[6]) || 0,
                            dateOfJoining: values[7] || new Date().toISOString().split('T')[0],
                            status: values[8] || 'active',
                            profilePicture: null,
                            address: {
                                street: values[9] || '',
                                city: values[10] || '',
                                state: values[11] || '',
                                zipCode: values[12] || '',
                                country: 'USA'
                            },
                            emergencyContact: {
                                name: values[13] || '',
                                relationship: values[14] || '',
                                phone: values[15] || ''
                            }
                        };
                        
                        this.employees.push(employee);
                        importedCount++;
                    }
                }
                
                this.showToast(`Successfully imported ${importedCount} employees!`, 'success');
                this.loadCsvPage();
                
            } catch (error) {
                console.error('CSV import error:', error);
                this.showToast('Error importing CSV file', 'error');
            }
        };
        
        reader.readAsText(file);
    }

    exportCsv() {
        const headers = [
            'Employee ID', 'Name', 'Email', 'Phone', 'Department', 'Position', 'Salary',
            'Date of Joining', 'Status', 'Street', 'City', 'State', 'ZIP', 'Emergency Name',
            'Emergency Relationship', 'Emergency Phone'
        ];
        
        const csvContent = [
            headers.join(','),
            ...this.employees.map(emp => [
                emp.employeeId, emp.name, emp.email, emp.phone, emp.department, emp.position,
                emp.salary, emp.dateOfJoining, emp.status, emp.address.street, emp.address.city,
                emp.address.state, emp.address.zipCode, emp.emergencyContact.name,
                emp.emergencyContact.relationship, emp.emergencyContact.phone
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showToast('Employee data exported successfully!', 'success');
    }

    downloadTemplate() {
        const template = [
            'Employee ID,Name,Email,Phone,Department,Position,Salary,Date of Joining,Status,Street,City,State,ZIP,Emergency Name,Emergency Relationship,Emergency Phone',
            'EMP0001,John Doe,john.doe@company.com,+1-555-0123,IT,Software Engineer,75000,2023-01-01,active,123 Main St,Anytown,CA,12345,Jane Doe,Spouse,+1-555-0124'
        ].join('\n');

        const blob = new Blob([template], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'employee_import_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.showToast('Template downloaded!', 'success');
    }

    // Utility functions
    populateDropdowns() {
        // Department filters
        const departmentFilter = document.getElementById('departmentFilter');
        if (departmentFilter) {
            this.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.name;
                option.textContent = dept.name;
                departmentFilter.appendChild(option);
            });
        }

        // Employee form dropdowns
        const employeeDepartment = document.getElementById('employeeDepartment');
        const employeePosition = document.getElementById('employeePosition');

        if (employeeDepartment) {
            this.departments.forEach(dept => {
                const option = document.createElement('option');
                option.value = dept.name;
                option.textContent = dept.name;
                employeeDepartment.appendChild(option);
            });
        }

        if (employeePosition) {
            this.positions.forEach(pos => {
                const option = document.createElement('option');
                option.value = pos;
                option.textContent = pos;
                employeePosition.appendChild(option);
            });
        }
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
        
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    showLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.remove('hidden');
        }
    }

    hideLoading() {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) {
            spinner.classList.add('hidden');
        }
    }
}

// Initialize the application and make it globally accessible
window.ems = new EmployeeManagementSystem();