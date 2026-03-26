// Teacher Dashboard App - JavaScript
class TeacherDashboard {
    constructor() {
        this.password = 'lehrer2024';
        this.currentWeek = this.getCurrentWeek();
        this.currentView = 'dashboard';
        this.currentLessonEdit = null;
        this.currentClassEdit = null;
        
        // Data storage in memory
        this.data = {
            classes: [
                {
                    id: 1,
                    name: '5a',
                    students: ['Max Mustermann', 'Anna Schmidt', 'Tom Weber', 'Lisa Klein', 'Jan Müller']
                },
                {
                    id: 2,
                    name: '7b',
                    students: ['Lisa Müller', 'Jan Klein', 'Sara Bauer', 'Tim Weber', 'Nina Hoffmann']
                }
            ],
            subjects: ['Sport', 'Technik', 'WBS', 'Deutsch', 'Mathematik', 'Englisch', 'Geschichte'],
            lessons: {},
            weekReflections: {},
            curriculumUnits: [
                {
                    id: 1,
                    title: 'Volleyball Grundlagen',
                    subject: 'Sport',
                    plannedWeeks: 4,
                    status: 'In Bearbeitung',
                    description: 'Einführung in die Volleyball-Grundtechniken',
                    goals: 'Aufschlag, Baggern, Pritschen erlernen'
                },
                {
                    id: 2,
                    title: 'Textverarbeitung',
                    subject: 'Technik',
                    plannedWeeks: 6,
                    status: 'Geplant',
                    description: 'Grundlagen der digitalen Textverarbeitung',
                    goals: 'Word-Kenntnisse, Formatierung, Layout'
                }
            ],
            documents: {
                uvp: [],
                beobachtung: [],
                reflexion: [],
                dateien: []
            }
        };
    }

    initializeApp() {
        // Ensure all modals are closed initially
        this.closeModals();
        
        // Check login status
        const isLoggedIn = sessionStorage.getItem('teacherLoggedIn') === 'true';
        
        if (isLoggedIn) {
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }

        this.bindEvents();
        this.updateDashboard();
    }

    showLoginScreen() {
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('mainApp').classList.add('hidden');
    }

    showMainApp() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        this.updateCurrentWeekDisplay();
        this.renderKlassenbuch();
        this.renderClasses();
        this.renderCurriculumPlan();
        this.renderDocumentation();
    }

    bindEvents() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Navigation
        document.querySelectorAll('[data-view]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.dataset.view;
                this.showView(view);
            });
        });

        // Week navigation
        const prevWeek = document.getElementById('prevWeek');
        const nextWeek = document.getElementById('nextWeek');
        if (prevWeek) {
            prevWeek.addEventListener('click', () => {
                this.navigateWeek(-1);
            });
        }
        if (nextWeek) {
            nextWeek.addEventListener('click', () => {
                this.navigateWeek(1);
            });
        }

        // Save reflection
        const saveReflection = document.getElementById('saveReflection');
        if (saveReflection) {
            saveReflection.addEventListener('click', () => {
                this.saveWeekReflection();
            });
        }

        // Class management
        const addNewClass = document.getElementById('addNewClass');
        if (addNewClass) {
            addNewClass.addEventListener('click', () => {
                this.showClassModal();
            });
        }
        
        const saveClass = document.getElementById('saveClass');
        if (saveClass) {
            saveClass.addEventListener('click', () => {
                this.saveClass();
            });
        }

        // Curriculum management
        const addNewUnit = document.getElementById('addNewUnit');
        if (addNewUnit) {
            addNewUnit.addEventListener('click', () => {
                this.addCurriculumUnit();
            });
        }

        // Documentation tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDocumentationTab(e.target.dataset.tab);
            });
        });

        // Export functions
        const exportButtons = [
            'exportKlassenbuch',
            'exportKlassenbuchPDF',
            'exportKlassenlistenPDF',
            'exportBackup'
        ];
        
        exportButtons.forEach(btnId => {
            const btn = document.getElementById(btnId);
            if (btn) {
                btn.addEventListener('click', () => {
                    if (btnId.includes('Klassenbuch')) {
                        this.exportKlassenbuch();
                    } else if (btnId.includes('Klassenlisten')) {
                        this.exportKlassenlisten();
                    } else if (btnId.includes('Backup')) {
                        this.exportBackup();
                    }
                });
            }
        });

        // Modal events
        document.querySelectorAll('.modal-close, [data-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModals();
            });
        });

        // Modal backdrop clicks
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });

        // Save lesson
        const saveLesson = document.getElementById('saveLesson');
        if (saveLesson) {
            saveLesson.addEventListener('click', () => {
                this.saveLesson();
            });
        }

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    handleLogin() {
        const passwordInput = document.getElementById('passwordInput');
        const errorDiv = document.getElementById('loginError');
        
        if (!passwordInput || !errorDiv) return;
        
        const password = passwordInput.value;

        if (password === this.password) {
            sessionStorage.setItem('teacherLoggedIn', 'true');
            this.showMainApp();
            errorDiv.classList.add('hidden');
        } else {
            errorDiv.textContent = 'Falsches Passwort. Bitte versuchen Sie es erneut.';
            errorDiv.classList.remove('hidden');
        }
    }

    handleLogout() {
        sessionStorage.removeItem('teacherLoggedIn');
        this.showLoginScreen();
        const passwordInput = document.getElementById('passwordInput');
        if (passwordInput) {
            passwordInput.value = '';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.dataset.colorScheme || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.colorScheme = newTheme;
        
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    showView(viewName) {
        // Update navigation
        document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelectorAll(`[data-view="${viewName}"]`).forEach(link => {
            link.classList.add('active');
        });

        // Show view
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        const targetView = document.getElementById(`${viewName}View`);
        if (targetView) {
            targetView.classList.add('active');
        }

        this.currentView = viewName;
        
        // Update view-specific content
        if (viewName === 'dashboard') {
            this.updateDashboard();
        } else if (viewName === 'klassenbuch') {
            this.renderKlassenbuch();
        } else if (viewName === 'klassenlisten') {
            this.renderClasses();
        } else if (viewName === 'stoffverteilung') {
            this.renderCurriculumPlan();
        } else if (viewName === 'dokumentation') {
            this.renderDocumentation();
        }
    }

    getCurrentWeek() {
        const now = new Date();
        const yearStart = new Date(now.getFullYear(), 0, 1);
        const weekNumber = Math.ceil((now - yearStart) / (7 * 24 * 60 * 60 * 1000));
        return { week: weekNumber, year: now.getFullYear() };
    }

    getWeekDates(week, year) {
        const jan1 = new Date(year, 0, 1);
        const days = (week - 1) * 7;
        const weekStart = new Date(jan1.getTime() + days * 24 * 60 * 60 * 1000);
        
        // Adjust to Monday
        const dayOfWeek = weekStart.getDay();
        const diff = weekStart.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
        weekStart.setDate(diff);
        
        return weekStart;
    }

    updateCurrentWeekDisplay() {
        const weekDisplay = `KW ${this.currentWeek.week}, ${this.currentWeek.year}`;
        const currentWeekDisplay = document.getElementById('currentWeekDisplay');
        const currentWeek = document.getElementById('currentWeek');
        
        if (currentWeekDisplay) {
            currentWeekDisplay.textContent = weekDisplay;
        }
        if (currentWeek) {
            currentWeek.textContent = weekDisplay;
        }
    }

    navigateWeek(direction) {
        this.currentWeek.week += direction;
        
        if (this.currentWeek.week > 52) {
            this.currentWeek.week = 1;
            this.currentWeek.year++;
        } else if (this.currentWeek.week < 1) {
            this.currentWeek.week = 52;
            this.currentWeek.year--;
        }
        
        this.updateCurrentWeekDisplay();
        this.renderKlassenbuch();
        this.loadWeekReflection();
    }

    renderKlassenbuch() {
        const container = document.getElementById('klassenbuchTable');
        if (!container) return;
        
        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const weekLessons = this.data.lessons[weekKey] || {};
        
        const days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
        const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        let html = '';
        
        days.forEach((day, dayIndex) => {
            html += `
                <div class="day-section">
                    <div class="day-header">${day}</div>
                    <div class="lessons-grid">
                        <div class="lesson-cell"><strong>Std.</strong></div>
                        <div class="lesson-cell"><strong>Fach</strong></div>
                        <div class="lesson-cell"><strong>LK</strong></div>
                        <div class="lesson-cell"><strong>Thema der Stunde</strong></div>
                        <div class="lesson-cell"><strong>Bemerkungen</strong></div>
                        <div class="lesson-cell"></div>
            `;

            hours.forEach(hour => {
                const lessonKey = `${dayIndex}-${hour}`;
                const lesson = weekLessons[lessonKey];
                
                html += `
                    <div class="lesson-row">
                        <div class="lesson-cell">${hour}</div>
                        <div class="lesson-cell ${lesson ? 'filled' : 'clickable'}" data-day="${dayIndex}" data-hour="${hour}">
                            ${lesson ? lesson.subject : ''}
                        </div>
                        <div class="lesson-cell ${lesson ? 'filled' : 'clickable'}" data-day="${dayIndex}" data-hour="${hour}">
                            ${lesson ? lesson.teacher : ''}
                        </div>
                        <div class="lesson-cell ${lesson ? 'filled' : 'clickable'}" data-day="${dayIndex}" data-hour="${hour}">
                            ${lesson ? lesson.topic : ''}
                        </div>
                        <div class="lesson-cell ${lesson ? 'filled' : 'clickable'}" data-day="${dayIndex}" data-hour="${hour}">
                            ${lesson ? lesson.notes : ''}
                        </div>
                        <div class="lesson-actions">
                            ${lesson ? `<button class="btn btn--outline btn--sm" onclick="window.teacherApp.editLesson(${dayIndex}, ${hour})">
                                <i class="fas fa-edit"></i>
                            </button>` : `<button class="btn btn--primary btn--sm" onclick="window.teacherApp.addLesson(${dayIndex}, ${hour})">
                                <i class="fas fa-plus"></i>
                            </button>`}
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });

        container.innerHTML = html;
        this.loadWeekReflection();
    }

    addLesson(dayIndex, hour) {
        this.currentLessonEdit = { dayIndex, hour, isNew: true };
        // Clear form first
        const form = document.getElementById('lessonForm');
        if (form) {
            form.reset();
        }
        this.showLessonModal();
    }

    editLesson(dayIndex, hour) {
        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const lessonKey = `${dayIndex}-${hour}`;
        const lesson = this.data.lessons[weekKey]?.[lessonKey];
        
        this.currentLessonEdit = { dayIndex, hour, isNew: false };
        
        if (lesson) {
            const subjectSelect = document.getElementById('lessonSubject');
            const teacherInput = document.getElementById('lessonTeacher');
            const topicInput = document.getElementById('lessonTopic');
            const notesTextarea = document.getElementById('lessonNotes');
            
            if (subjectSelect) subjectSelect.value = lesson.subject;
            if (teacherInput) teacherInput.value = lesson.teacher;
            if (topicInput) topicInput.value = lesson.topic;
            if (notesTextarea) notesTextarea.value = lesson.notes;
        }
        
        this.showLessonModal();
    }

    showLessonModal() {
        const modal = document.getElementById('lessonModal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    saveLesson() {
        const subjectSelect = document.getElementById('lessonSubject');
        const teacherInput = document.getElementById('lessonTeacher');
        const topicInput = document.getElementById('lessonTopic');
        const notesTextarea = document.getElementById('lessonNotes');

        if (!subjectSelect || !teacherInput || !topicInput || !notesTextarea) {
            alert('Formularfelder nicht gefunden.');
            return;
        }

        const subject = subjectSelect.value;
        const teacher = teacherInput.value;
        const topic = topicInput.value;
        const notes = notesTextarea.value;

        if (!subject || !teacher || !topic) {
            alert('Bitte füllen Sie alle Pflichtfelder aus.');
            return;
        }

        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const lessonKey = `${this.currentLessonEdit.dayIndex}-${this.currentLessonEdit.hour}`;

        if (!this.data.lessons[weekKey]) {
            this.data.lessons[weekKey] = {};
        }

        this.data.lessons[weekKey][lessonKey] = {
            subject,
            teacher,
            topic,
            notes
        };

        this.closeModals();
        this.renderKlassenbuch();
        this.updateDashboard();
        
        // Clear form
        const form = document.getElementById('lessonForm');
        if (form) {
            form.reset();
        }
    }

    loadWeekReflection() {
        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const reflection = this.data.weekReflections[weekKey] || '';
        const reflectionTextarea = document.getElementById('weekReflection');
        if (reflectionTextarea) {
            reflectionTextarea.value = reflection;
        }
    }

    saveWeekReflection() {
        const reflectionTextarea = document.getElementById('weekReflection');
        if (!reflectionTextarea) return;
        
        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const reflection = reflectionTextarea.value;
        this.data.weekReflections[weekKey] = reflection;
        
        // Show success feedback
        const btn = document.getElementById('saveReflection');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = 'Gespeichert!';
            btn.classList.add('btn--success');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('btn--success');
            }, 1500);
        }
    }

    renderClasses() {
        const container = document.getElementById('classesList');
        if (!container) return;
        
        let html = '';
        this.data.classes.forEach(cls => {
            html += `
                <div class="class-card card">
                    <div class="card__body">
                        <div class="class-header">
                            <h3 class="class-name">${cls.name}</h3>
                            <div class="class-actions">
                                <button class="btn btn--outline btn--sm" onclick="window.teacherApp.editClass(${cls.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn--outline btn--sm" onclick="window.teacherApp.deleteClass(${cls.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <p class="student-count">${cls.students.length} Schüler</p>
                        <ul class="students-list">
                            ${cls.students.map(student => `<li class="student-item">${student}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    showClassModal(classData = null) {
        const modal = document.getElementById('classModal');
        const title = document.getElementById('classModalTitle');
        const classNameInput = document.getElementById('className');
        const studentNamesTextarea = document.getElementById('studentNames');
        
        if (!modal || !title || !classNameInput || !studentNamesTextarea) return;
        
        if (classData) {
            title.textContent = 'Klasse bearbeiten';
            classNameInput.value = classData.name;
            studentNamesTextarea.value = classData.students.join('\n');
        } else {
            title.textContent = 'Neue Klasse';
            const form = document.getElementById('classForm');
            if (form) {
                form.reset();
            }
        }
        
        modal.classList.remove('hidden');
    }

    editClass(classId) {
        const cls = this.data.classes.find(c => c.id === classId);
        if (cls) {
            this.currentClassEdit = cls.id;
            this.showClassModal(cls);
        }
    }

    deleteClass(classId) {
        if (confirm('Möchten Sie diese Klasse wirklich löschen?')) {
            this.data.classes = this.data.classes.filter(c => c.id !== classId);
            this.renderClasses();
            this.updateDashboard();
        }
    }

    saveClass() {
        const classNameInput = document.getElementById('className');
        const studentNamesTextarea = document.getElementById('studentNames');
        
        if (!classNameInput || !studentNamesTextarea) {
            alert('Formularfelder nicht gefunden.');
            return;
        }

        const name = classNameInput.value.trim();
        const studentNames = studentNamesTextarea.value
            .split('\n')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        if (!name) {
            alert('Bitte geben Sie einen Klassennamen ein.');
            return;
        }

        if (this.currentClassEdit) {
            // Edit existing class
            const cls = this.data.classes.find(c => c.id === this.currentClassEdit);
            if (cls) {
                cls.name = name;
                cls.students = studentNames;
            }
            this.currentClassEdit = null;
        } else {
            // Add new class
            const newId = Math.max(...this.data.classes.map(c => c.id), 0) + 1;
            this.data.classes.push({
                id: newId,
                name: name,
                students: studentNames
            });
        }

        this.closeModals();
        this.renderClasses();
        this.updateDashboard();
    }

    renderCurriculumPlan() {
        const container = document.getElementById('curriculumPlan');
        if (!container) return;
        
        let html = '';
        this.data.curriculumUnits.forEach(unit => {
            const statusClass = unit.status === 'Abgeschlossen' ? 'status--success' : 
                               unit.status === 'In Bearbeitung' ? 'status--warning' : 'status--info';
            
            html += `
                <div class="curriculum-unit">
                    <div class="unit-header">
                        <h3 class="unit-title">${unit.title}</h3>
                        <div class="unit-status status ${statusClass}">${unit.status}</div>
                    </div>
                    <div class="unit-details">
                        <div class="unit-detail">
                            <strong>Fach:</strong> <span>${unit.subject}</span>
                        </div>
                        <div class="unit-detail">
                            <strong>Geplante Wochen:</strong> <span>${unit.plannedWeeks}</span>
                        </div>
                        <div class="unit-detail">
                            <strong>Beschreibung:</strong> <span>${unit.description}</span>
                        </div>
                        <div class="unit-detail">
                            <strong>Lernziele:</strong> <span>${unit.goals}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    addCurriculumUnit() {
        const title = prompt('Titel der neuen Einheit:');
        if (title) {
            const subject = prompt('Fach:');
            const weeks = prompt('Geplante Wochen:');
            const description = prompt('Beschreibung:');
            
            if (subject && weeks) {
                const newId = Math.max(...this.data.curriculumUnits.map(u => u.id), 0) + 1;
                this.data.curriculumUnits.push({
                    id: newId,
                    title: title,
                    subject: subject,
                    plannedWeeks: parseInt(weeks) || 1,
                    status: 'Geplant',
                    description: description || '',
                    goals: ''
                });
                this.renderCurriculumPlan();
                this.updateDashboard();
            }
        }
    }

    renderDocumentation() {
        // Implementation for documentation rendering
        this.switchDocumentationTab('uvp');
    }

    switchDocumentationTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        const container = document.getElementById('documentationContent');
        if (!container) return;
        
        const docs = this.data.documents[tabName] || [];
        
        let html = `
            <div class="documentation-section">
                <h3>${this.getTabTitle(tabName)}</h3>
                <button class="btn btn--primary btn--sm" onclick="window.teacherApp.addDocument('${tabName}')">
                    <i class="fas fa-plus"></i> Hinzufügen
                </button>
        `;

        if (docs.length > 0) {
            html += '<div class="documents-list">';
            docs.forEach((doc, index) => {
                html += `
                    <div class="document-item card">
                        <div class="card__body">
                            <h4>${doc.title}</h4>
                            <p><small>${doc.date}</small></p>
                            <p>${doc.content.substring(0, 100)}...</p>
                            <button class="btn btn--outline btn--sm" onclick="window.teacherApp.editDocument('${tabName}', ${index})">
                                Bearbeiten
                            </button>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
        } else {
            html += '<p class="text-center">Noch keine Dokumente vorhanden.</p>';
        }

        html += '</div>';
        container.innerHTML = html;
    }

    getTabTitle(tabName) {
        const titles = {
            uvp: 'Unterrichtsvorbereitungspläne (UVP)',
            beobachtung: 'Unterrichtsbeobachtungen',
            reflexion: 'Reflexionen',
            dateien: 'Dateien'
        };
        return titles[tabName] || tabName;
    }

    addDocument(type) {
        const title = prompt(`Titel für neues ${this.getTabTitle(type)} Dokument:`);
        if (title) {
            const content = prompt('Inhalt:');
            if (content) {
                if (!this.data.documents[type]) {
                    this.data.documents[type] = [];
                }
                
                this.data.documents[type].push({
                    title: title,
                    content: content,
                    date: new Date().toLocaleDateString('de-DE')
                });
                
                this.switchDocumentationTab(type);
                this.updateDashboard();
            }
        }
    }

    editDocument(type, index) {
        const doc = this.data.documents[type][index];
        const newContent = prompt('Inhalt bearbeiten:', doc.content);
        if (newContent !== null) {
            doc.content = newContent;
            this.switchDocumentationTab(type);
        }
    }

    updateDashboard() {
        // Update dashboard statistics
        const totalClasses = this.data.classes.length;
        const totalStudents = this.data.classes.reduce((sum, cls) => sum + cls.students.length, 0);
        const weekKey = `${this.currentWeek.year}-${this.currentWeek.week}`;
        const weeklyEntries = Object.keys(this.data.lessons[weekKey] || {}).length;
        const plannedLessons = this.data.curriculumUnits.length;
        const completedLessons = this.data.curriculumUnits.filter(u => u.status === 'Abgeschlossen').length;
        const totalDocuments = Object.values(this.data.documents).reduce((sum, docs) => sum + docs.length, 0);

        const elements = {
            totalClasses: `Verwaltete Klassen: ${totalClasses}`,
            totalStudents: `Schüler gesamt: ${totalStudents}`,
            weeklyEntries: `Einträge diese Woche: ${weeklyEntries}`,
            plannedLessons: `Geplante Einheiten: ${plannedLessons}`,
            completedLessons: `Abgeschlossen: ${completedLessons}`,
            totalDocuments: `Dokumente: ${totalDocuments}`,
            recentActivity: `Letzte Aktivität: ${new Date().toLocaleDateString('de-DE')}`
        };

        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = text;
            }
        });
    }

    exportKlassenbuch() {
        this.showView('klassenbuch');
        setTimeout(() => {
            window.print();
        }, 100);
    }

    exportKlassenlisten() {
        this.showView('klassenlisten');
        setTimeout(() => {
            window.print();
        }, 100);
    }

    exportBackup() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `lehrkraft-backup-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
        this.currentLessonEdit = null;
        this.currentClassEdit = null;
    }
}

// Initialize app when DOM is loaded
let teacherApp;
document.addEventListener('DOMContentLoaded', () => {
    teacherApp = new TeacherDashboard();
    // Make app globally available
    window.teacherApp = teacherApp;
    // Initialize the app
    teacherApp.initializeApp();
});