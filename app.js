// PWA App - Side Project Tracker
class ProjectTracker {
    constructor() {
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];
        this.timeLogs = JSON.parse(localStorage.getItem('timeLogs')) || [];
        this.currentProject = null;
        this.deferredPrompt = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupPWA();
        this.renderDashboard();
        this.renderProjects();
        this.setupAnalytics();
        this.checkUrlParams();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Project form
        document.getElementById('projectForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createProject();
        });

        // Time log form
        document.getElementById('timeLogForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTimeLog();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterProjects(e.target.dataset.filter);
            });
        });

        // Modal controls
        document.querySelectorAll('.close-btn, .cancel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Range slider
        const effectivenessRange = document.getElementById('logEffectiveness');
        if (effectivenessRange) {
            effectivenessRange.addEventListener('input', (e) => {
                document.getElementById('effectivenessValue').textContent = e.target.value;
            });
        }

        // Modal backdrop clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Install prompt
        document.getElementById('installBtn')?.addEventListener('click', () => {
            this.installApp();
        });

        document.getElementById('dismissInstall')?.addEventListener('click', () => {
            this.dismissInstallPrompt();
        });
    }

    setupPWA() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }

        // Handle install prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.hideInstallPrompt();
        });
    }

    checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        if (tab) {
            this.switchTab(tab);
        }
    }

    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === tabName);
        });

        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('tab', tabName);
        window.history.pushState({}, '', url);

        // Refresh data if needed
        if (tabName === 'dashboard') {
            this.renderDashboard();
        } else if (tabName === 'projects') {
            this.renderProjects();
        } else if (tabName === 'analytics') {
            this.renderAnalytics();
        }
    }

    createProject() {
        const formData = new FormData(document.getElementById('projectForm'));
        const project = {
            id: Date.now().toString(),
            name: formData.get('projectName') || document.getElementById('projectName').value,
            description: formData.get('projectDescription') || document.getElementById('projectDescription').value,
            category: formData.get('projectCategory') || document.getElementById('projectCategory').value,
            priority: formData.get('projectPriority') || document.getElementById('projectPriority').value,
            goal: formData.get('projectGoal') || document.getElementById('projectGoal').value,
            expectedHours: parseInt(formData.get('expectedHours') || document.getElementById('expectedHours').value) || 0,
            status: 'active',
            createdAt: new Date().toISOString(),
            totalHours: 0,
            averageEffectiveness: 0
        };

        this.projects.push(project);
        this.saveData();
        this.renderProjects();
        this.renderDashboard();
        
        // Reset form
        document.getElementById('projectForm').reset();
        
        // Show success message
        this.showNotification('專案創建成功！', 'success');
        
        // Switch to projects tab
        this.switchTab('projects');
    }

    renderDashboard() {
        const activeProjects = this.projects.filter(p => p.status === 'active');
        const completedProjects = this.projects.filter(p => p.status === 'completed');
        
        // Calculate weekly hours (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const recentLogs = this.timeLogs.filter(log => new Date(log.date) >= weekAgo);
        const weeklyHours = recentLogs.reduce((sum, log) => sum + log.hours, 0);
        
        // Calculate average effectiveness
        const allLogs = this.timeLogs.filter(log => log.effectiveness);
        const avgEffectiveness = allLogs.length > 0 
            ? Math.round(allLogs.reduce((sum, log) => sum + log.effectiveness, 0) / allLogs.length)
            : 0;

        // Update stats
        document.getElementById('weeklyHours').textContent = weeklyHours.toFixed(1);
        document.getElementById('activeProjects').textContent = activeProjects.length;
        document.getElementById('completedProjects').textContent = completedProjects.length;
        document.getElementById('avgEffectiveness').textContent = avgEffectiveness;

        // Render recent activities
        this.renderRecentActivities();
    }

    renderRecentActivities() {
        const container = document.getElementById('recentActivities');
        const recentLogs = [...this.timeLogs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        if (recentLogs.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>還沒有任何記錄，開始創建你的第一個專案吧！</p>
                </div>
            `;
            return;
        }

        container.innerHTML = recentLogs.map(log => {
            const project = this.projects.find(p => p.id === log.projectId);
            const date = new Date(log.date).toLocaleDateString('zh-TW');
            
            return `
                <div class="activity-item">
                    <div class="activity-icon" style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color);">
                        ⏰
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${project?.name || '未知專案'}</div>
                        <div class="activity-meta">
                            ${date} • ${log.hours} 小時 • 成效: ${log.effectiveness}/10
                        </div>
                        ${log.progress ? `<div class="activity-description">${log.progress}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    renderProjects(filter = 'all') {
        const container = document.getElementById('projectsList');
        let filteredProjects = this.projects;

        if (filter !== 'all') {
            filteredProjects = this.projects.filter(p => p.status === filter);
        }

        if (filteredProjects.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>還沒有專案，點擊「新增」來創建第一個專案！</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredProjects.map(project => {
            const logs = this.timeLogs.filter(log => log.projectId === project.id);
            const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
            const avgEffectiveness = logs.length > 0 
                ? logs.reduce((sum, log) => sum + (log.effectiveness || 0), 0) / logs.length
                : 0;

            return `
                <div class="project-card" onclick="projectTracker.showProjectDetail('${project.id}')">
                    <div class="project-header">
                        <div class="project-title">${project.name}</div>
                        <div class="project-description">${project.description || '無描述'}</div>
                    </div>
                    <div class="project-meta">
                        <div class="project-status ${project.status}">
                            ${this.getStatusIcon(project.status)} ${this.getStatusText(project.status)}
                        </div>
                        <div class="project-actions" onclick="event.stopPropagation()">
                            <button class="action-btn" onclick="projectTracker.showTimeLogModal('${project.id}')" title="記錄時間">
                                ⏰
                            </button>
                            <button class="action-btn" onclick="projectTracker.editProject('${project.id}')" title="編輯">
                                ✏️
                            </button>
                        </div>
                    </div>
                    <div class="project-stats">
                        <div style="font-size: 0.875rem; color: var(--text-secondary); padding: 0 1.5rem 1rem;">
                            總時數: ${totalHours.toFixed(1)}h | 平均成效: ${avgEffectiveness.toFixed(1)}/10
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    filterProjects(filter) {
        // Update filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Render filtered projects
        this.renderProjects(filter);
    }

    showProjectDetail(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const logs = this.timeLogs.filter(log => log.projectId === projectId);
        const totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
        
        const modal = document.getElementById('projectDetailModal');
        const title = document.getElementById('projectDetailTitle');
        const content = document.getElementById('projectDetailContent');

        title.textContent = project.name;
        
        content.innerHTML = `
            <div style="padding: 1.5rem;">
                <div style="margin-bottom: 2rem;">
                    <h4 style="margin-bottom: 1rem; color: var(--text-primary);">專案資訊</h4>
                    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                        <div>
                            <strong>狀態:</strong> ${this.getStatusText(project.status)}
                        </div>
                        <div>
                            <strong>類別:</strong> ${this.getCategoryText(project.category)}
                        </div>
                        <div>
                            <strong>優先級:</strong> ${this.getPriorityText(project.priority)}
                        </div>
                        <div>
                            <strong>總時數:</strong> ${totalHours.toFixed(1)} 小時
                        </div>
                    </div>
                    ${project.description ? `
                        <div style="margin-top: 1rem;">
                            <strong>描述:</strong> ${project.description}
                        </div>
                    ` : ''}
                    ${project.goal ? `
                        <div style="margin-top: 1rem;">
                            <strong>本週目標:</strong> ${project.goal}
                        </div>
                    ` : ''}
                </div>
                
                <div>
                    <h4 style="margin-bottom: 1rem; color: var(--text-primary);">時間記錄</h4>
                    ${logs.length > 0 ? `
                        <div style="max-height: 300px; overflow-y: auto;">
                            ${logs.sort((a, b) => new Date(b.date) - new Date(a.date)).map(log => `
                                <div style="padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--border-radius-sm); margin-bottom: 0.5rem;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                        <strong>${new Date(log.date).toLocaleDateString('zh-TW')}</strong>
                                        <div>
                                            <span style="color: var(--primary-color);">${log.hours}h</span>
                                            <span style="margin-left: 1rem; color: var(--text-secondary);">成效: ${log.effectiveness}/10</span>
                                        </div>
                                    </div>
                                    ${log.progress ? `<div style="color: var(--text-secondary);">${log.progress}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : `
                        <div class="empty-state">
                            <p>還沒有時間記錄</p>
                        </div>
                    `}
                </div>

                <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="action-btn" onclick="projectTracker.showTimeLogModal('${project.id}')" style="padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border-radius: var(--border-radius-sm);">
                        ⏰ 記錄時間
                    </button>
                    <button class="action-btn" onclick="projectTracker.toggleProjectStatus('${project.id}')" style="padding: 0.75rem 1.5rem; background: var(--secondary-color); color: white; border-radius: var(--border-radius-sm);">
                        ${project.status === 'completed' ? '重新開始' : '完成專案'}
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('show');
    }

    showTimeLogModal(projectId) {
        this.currentProject = projectId;
        const modal = document.getElementById('timeLogModal');
        
        // Set today's date as default
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('logDate').value = today;
        
        modal.classList.add('show');
    }

    saveTimeLog() {
        if (!this.currentProject) return;

        const date = document.getElementById('logDate').value;
        const hours = parseFloat(document.getElementById('logHours').value);
        const progress = document.getElementById('logProgress').value;
        const effectiveness = parseInt(document.getElementById('logEffectiveness').value);

        const timeLog = {
            id: Date.now().toString(),
            projectId: this.currentProject,
            date: date,
            hours: hours,
            progress: progress,
            effectiveness: effectiveness,
            createdAt: new Date().toISOString()
        };

        this.timeLogs.push(timeLog);
        this.saveData();
        
        // Update project total hours
        const project = this.projects.find(p => p.id === this.currentProject);
        if (project) {
            const logs = this.timeLogs.filter(log => log.projectId === this.currentProject);
            project.totalHours = logs.reduce((sum, log) => sum + log.hours, 0);
            project.averageEffectiveness = logs.reduce((sum, log) => sum + log.effectiveness, 0) / logs.length;
        }

        this.closeModals();
        this.renderDashboard();
        this.renderProjects();
        
        // Reset form
        document.getElementById('timeLogForm').reset();
        document.getElementById('logEffectiveness').value = 5;
        document.getElementById('effectivenessValue').textContent = '5';
        
        this.showNotification('時間記錄已保存！', 'success');
    }

    toggleProjectStatus(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        project.status = project.status === 'completed' ? 'active' : 'completed';
        
        if (project.status === 'completed') {
            project.completedAt = new Date().toISOString();
        } else {
            delete project.completedAt;
        }

        this.saveData();
        this.renderProjects();
        this.renderDashboard();
        this.closeModals();
        
        const statusText = project.status === 'completed' ? '完成' : '重新啟動';
        this.showNotification(`專案已${statusText}！`, 'success');
    }

    setupAnalytics() {
        // This would set up charts using Chart.js or similar
        // For now, we'll create simple analytics
        this.renderAnalytics();
    }

    renderAnalytics() {
        const insights = document.getElementById('insightsList');
        
        if (this.projects.length === 0) {
            insights.innerHTML = '<p>累積更多數據後，這裡會顯示個人化的建議！</p>';
            return;
        }

        const activeProjects = this.projects.filter(p => p.status === 'active').length;
        const totalHours = this.timeLogs.reduce((sum, log) => sum + log.hours, 0);
        const avgEffectiveness = this.timeLogs.length > 0 
            ? this.timeLogs.reduce((sum, log) => sum + log.effectiveness, 0) / this.timeLogs.length
            : 0;

        const insightsData = [];

        if (activeProjects > 3) {
            insightsData.push('💡 你有很多進行中的專案！考慮先專注完成其中幾個。');
        }

        if (avgEffectiveness < 6) {
            insightsData.push('⚡ 你的平均成效偏低，試著調整工作時間或環境來提高效率。');
        } else if (avgEffectiveness >= 8) {
            insightsData.push('🎉 你的工作效率很高！保持這個節奏。');
        }

        if (totalHours > 50) {
            insightsData.push('⏰ 你已經投入了很多時間，記得適當休息！');
        }

        const weeklyAvg = totalHours / Math.max(1, Math.ceil(this.timeLogs.length / 7));
        if (weeklyAvg < 5) {
            insightsData.push('📈 考慮增加每週的投入時間來加速進度。');
        }

        insights.innerHTML = insightsData.length > 0 
            ? insightsData.map(insight => `<div style="margin-bottom: 1rem;">${insight}</div>`).join('')
            : '<p>很棒！繼續記錄你的專案進度，我們會提供更多個人化建議。</p>';
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
        });
        this.currentProject = null;
    }

    saveData() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
        localStorage.setItem('timeLogs', JSON.stringify(this.timeLogs));
    }

    showInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        if (prompt) {
            prompt.classList.remove('hidden');
        }
    }

    hideInstallPrompt() {
        const prompt = document.getElementById('installPrompt');
        if (prompt) {
            prompt.classList.add('hidden');
        }
    }

    async installApp() {
        if (!this.deferredPrompt) return;

        this.deferredPrompt.prompt();
        const result = await this.deferredPrompt.userChoice;
        
        if (result.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        }
        
        this.deferredPrompt = null;
        this.hideInstallPrompt();
    }

    dismissInstallPrompt() {
        this.hideInstallPrompt();
        // Remember user dismissed it
        localStorage.setItem('installPromptDismissed', 'true');
    }

    showNotification(message, type = 'info') {
        // Create a simple notification system
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease-in-out;
        `;
        
        if (type === 'error') {
            notification.style.background = 'var(--error-color)';
        } else if (type === 'warning') {
            notification.style.background = 'var(--warning-color)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Helper methods
    getStatusText(status) {
        const statusMap = {
            'active': '進行中',
            'completed': '已完成',
            'paused': '暫停'
        };
        return statusMap[status] || status;
    }

    getStatusIcon(status) {
        const iconMap = {
            'active': '🚀',
            'completed': '✅',
            'paused': '⏸️'
        };
        return iconMap[status] || '❓';
    }

    getCategoryText(category) {
        const categoryMap = {
            'web': 'Web 開發',
            'mobile': 'Mobile App',
            'design': '設計',
            'content': '內容創作',
            'business': '商業',
            'other': '其他'
        };
        return categoryMap[category] || category;
    }

    getPriorityText(priority) {
        const priorityMap = {
            'high': '高',
            'medium': '中',
            'low': '低'
        };
        return priorityMap[priority] || priority;
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the app
let projectTracker;
document.addEventListener('DOMContentLoaded', () => {
    projectTracker = new ProjectTracker();
});

// Handle back button
window.addEventListener('popstate', () => {
    projectTracker.checkUrlParams();
}); 