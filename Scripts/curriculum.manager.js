class CurriculumManager {
  constructor() {
    this.storageKey = 'anux_subjects';
    this.subjects = [];
    this.selectedSubjectId = null;
    this.colorPalette = [
      '#4A90E2', '#E74C3C', '#2ECC71', '#9B59B6', '#F39C12',
      '#1ABC9C', '#E67E22', '#3498DB', '#E91E63', '#00BCD4'
    ];
    this.init();
  }

  init() {
    console.log('Curriculum Manager initialized');
    this.loadFromLocalStorage();
    this.setupEventListeners();
    this.render();
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.subjects = JSON.parse(stored);
      } catch (error) {
        console.error('Error loading subjects:', error);
        this.subjects = [];
      }
    }
  }

  saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.subjects));
  }

  setupEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      const addSubjectBtn = document.getElementById('add-subject-btn');
      const addFirstSubjectBtn = document.getElementById('add-first-subject');

      if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', () => this.showAddSubjectModal());
      }

      if (addFirstSubjectBtn) {
        addFirstSubjectBtn.addEventListener('click', () => this.showAddSubjectModal());
      }
    });
  }

  render() {
    this.renderSubjectsList();
    this.renderSubjectDetails();
  }

  renderSubjectsList() {
    const subjectsGrid = document.getElementById('subjects-grid');
    if (!subjectsGrid) return;

    if (this.subjects.length === 0) {
      subjectsGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📚</div>
          <h4>No subjects added yet</h4>
          <p>Add your first subject to get started with your personalized curriculum.</p>
          <button class="btn-primary" id="add-first-subject">+ Add Your First Subject</button>
        </div>
      `;

      const addFirstBtn = subjectsGrid.querySelector('#add-first-subject');
      if (addFirstBtn) {
        addFirstBtn.addEventListener('click', () => this.showAddSubjectModal());
      }
      return;
    }

    subjectsGrid.innerHTML = this.subjects.map(subject => `
      <div class="subject-card" data-subject-id="${subject.id}" style="border-left-color: ${subject.color}">
        <h4>${subject.name}</h4>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${subject.progress || 0}%; background: ${subject.color}"></div>
        </div>
        <p>${subject.progress || 0}% Complete</p>
      </div>
    `).join('');

    document.querySelectorAll('.subject-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const subjectId = card.dataset.subjectId;
        this.selectSubject(subjectId);
      });
    });
  }

  renderSubjectDetails() {
    const detailView = document.getElementById('subject-detail-view');
    if (!detailView) return;

    if (!this.selectedSubjectId) {
      detailView.innerHTML = `
        <div class="empty-detail-content">
          <div class="empty-icon">📖</div>
          <h4>Select a subject</h4>
          <p>Choose a subject from the list to view and manage its details.</p>
        </div>
      `;
      return;
    }

    const subject = this.subjects.find(s => s.id === this.selectedSubjectId);
    if (!subject) return;

    detailView.innerHTML = `
      <div class="subject-detail-header" style="border-color: ${subject.color}">
        <h3 style="color: ${subject.color}">${subject.name}</h3>
      </div>
      <div class="subject-detail-body">
        <div class="detail-section">
          <h4>Progress</h4>
          <div class="progress-bar-large">
            <div class="progress-fill" style="width: ${subject.progress || 0}%; background: ${subject.color}"></div>
          </div>
          <p class="progress-text">${subject.progress || 0}% Complete</p>
        </div>
        <div class="detail-actions">
          <button class="btn-secondary" onclick="window.curriculumManager.editSubject('${subject.id}')">
            ✏️ Rename
          </button>
          <button class="btn-secondary" onclick="window.curriculumManager.changeColor('${subject.id}')">
            🎨 Change Color
          </button>
          <button class="btn-danger" onclick="window.curriculumManager.deleteSubject('${subject.id}')">
            🗑️ Delete
          </button>
        </div>
      </div>
    `;
  }

  selectSubject(subjectId) {
    this.selectedSubjectId = subjectId;

    document.querySelectorAll('.subject-card').forEach(card => {
      card.classList.remove('active');
      if (card.dataset.subjectId === subjectId) {
        card.classList.add('active');
      }
    });

    this.renderSubjectDetails();
  }

  showAddSubjectModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Subject</h3>
          <button class="close-modal">&times;</button>
        </div>
        <form id="add-subject-form">
          <div class="form-group">
            <label for="subject-name">Subject Name</label>
            <input type="text" id="subject-name" required placeholder="e.g., Mathematics">
          </div>
          <div class="form-group">
            <label>Choose Color</label>
            <div class="color-picker">
              ${this.colorPalette.map((color, index) => `
                <div class="color-option ${index === 0 ? 'selected' : ''}"
                     data-color="${color}"
                     style="background: ${color}"></div>
              `).join('')}
            </div>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary close-modal">Cancel</button>
            <button type="submit" class="btn btn-primary">Add Subject</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => modal.remove());
    });

    const colorOptions = modal.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });

    const form = modal.querySelector('#add-subject-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('subject-name').value;
      const selectedColor = modal.querySelector('.color-option.selected').dataset.color;

      this.addSubject(name, selectedColor);
      modal.remove();
    });
  }

  addSubject(name, color) {
    const subject = {
      id: Date.now().toString(),
      name: name,
      color: color,
      progress: 0
    };

    this.subjects.push(subject);
    this.saveToLocalStorage();
    this.render();

    this.showNotification('Subject added successfully!', 'success');
  }

  editSubject(subjectId) {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const newName = prompt('Enter new name:', subject.name);
    if (newName && newName.trim()) {
      subject.name = newName.trim();
      this.saveToLocalStorage();
      this.render();
      this.showNotification('Subject renamed successfully!', 'success');
    }
  }

  changeColor(subjectId) {
    const subject = this.subjects.find(s => s.id === subjectId);
    if (!subject) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Change Color</h3>
          <button class="close-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="color-picker">
            ${this.colorPalette.map(color => `
              <div class="color-option ${subject.color === color ? 'selected' : ''}"
                   data-color="${color}"
                   style="background: ${color}"></div>
            `).join('')}
          </div>
        </div>
        <div class="form-actions">
          <button type="button" class="btn btn-secondary close-modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="save-color">Save</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    const closeButtons = modal.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => modal.remove());
    });

    const colorOptions = modal.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });

    const saveBtn = modal.querySelector('#save-color');
    saveBtn.addEventListener('click', () => {
      const selectedColor = modal.querySelector('.color-option.selected').dataset.color;
      subject.color = selectedColor;
      this.saveToLocalStorage();
      this.render();
      modal.remove();
      this.showNotification('Color changed successfully!', 'success');
    });
  }

  deleteSubject(subjectId) {
    if (!confirm('Are you sure you want to delete this subject?')) return;

    this.subjects = this.subjects.filter(s => s.id !== subjectId);
    if (this.selectedSubjectId === subjectId) {
      this.selectedSubjectId = null;
    }
    this.saveToLocalStorage();
    this.render();
    this.showNotification('Subject deleted successfully!', 'success');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      z-index: 10001;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    `;

    if (type === 'success') {
      notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    } else if (type === 'error') {
      notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.curriculumManager = new CurriculumManager();
});
