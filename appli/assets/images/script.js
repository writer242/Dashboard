// Données de l'application
let appData = {
    filieres: [],
    classes: [],
    matieres: [],
    professeurs: [],
    etudiants: [],
    notes: []
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Charger les données depuis le localStorage
    loadData();
    
    // Mettre à jour les compteurs
    updateCounters();
    
    // Gestion des clics sur le menu
    setupMenuNavigation();
    
    // Gestion des formulaires
    setupForms();
    
    // Afficher le dashboard par défaut
    showSection('dashboard-content');
    
    // Gestion des boutons d'ajout dans les cartes
    setupCardButtons();
});

// Charger les données depuis le localStorage
function loadData() {
    const savedData = localStorage.getItem('studentDashboardData');
    if (savedData) {
        appData = JSON.parse(savedData);
    } else {
        // Données par défaut pour le démo
        appData = {
            filieres: [
                { id: 1, nom: "Informatique", description: "Programmation et réseaux" },
                { id: 2, nom: "Gestion", description: "Comptabilité et management" }
            ],
            classes: [
                { id: 1, nom: "L1 Info", filiereId: 1 },
                { id: 2, nom: "L2 Info", filiereId: 1 },
                { id: 3, nom: "L1 Gestion", filiereId: 2 }
            ],
            matieres: [
                { id: 1, nom: "Programmation", coefficient: 4 },
                { id: 2, nom: "Réseaux", coefficient: 3 },
                { id: 3, nom: "Comptabilité", coefficient: 5 }
            ],
            professeurs: [
                { id: 1, nom: "Dupont", prenom: "Jean", email: "j.dupont@ecole.com", telephone: "0123456789", matiereId: 1 },
                { id: 2, nom: "Martin", prenom: "Sophie", email: "s.martin@ecole.com", telephone: "0987654321", matiereId: 2 }
            ],
            etudiants: [
                { 
                    id: 1, 
                    nom: "Doe", 
                    prenom: "John", 
                    dateNaissance: "2000-01-15", 
                    lieuNaissance: "Paris", 
                    matricule: "ET2023001", 
                    filiereId: 1, 
                    classeId: 1, 
                    dateInscription: "2023-09-01",
                    photo: null
                }
            ],
            notes: [
                { id: 1, etudiantId: 1, matiereId: 1, note: 15, date: "2023-10-15" },
                { id: 2, etudiantId: 1, matiereId: 1, note: 16, date: "2023-11-20" },
                { id: 3, etudiantId: 1, matiereId: 2, note: 12, date: "2023-10-18" },
                { id: 4, etudiantId: 1, matiereId: 2, note: 14, date: "2023-11-22" }
            ]
        };
        saveData();
    }
    
    // Mettre à jour les listes déroulantes
    updateSelectOptions();
    
    // Mettre à jour les tableaux
    updateTables();
}

// Sauvegarder les données dans le localStorage
function saveData() {
    localStorage.setItem('studentDashboardData', JSON.stringify(appData));
    updateCounters();
    updateSelectOptions();
    updateTables();
}

// Mettre à jour les compteurs
function updateCounters() {
    document.getElementById('filiere-count').textContent = appData.filieres.length;
    document.getElementById('classe-count').textContent = appData.classes.length;
    document.getElementById('matiere-count').textContent = appData.matieres.length;
    document.getElementById('prof-count').textContent = appData.professeurs.length;
    document.getElementById('etudiant-count').textContent = appData.etudiants.length;
}

// Configurer la navigation dans le menu
function setupMenuNavigation() {
    document.getElementById('dashboard-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('dashboard-content');
    });
    
    document.getElementById('filiere-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('filiere-content');
    });
    
    document.getElementById('classe-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('classe-content');
    });
    
    document.getElementById('matiere-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('matiere-content');
    });
    
    document.getElementById('prof-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('prof-content');
    });
    
    document.getElementById('etudiant-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('etudiant-content');
    });
}

// Configurer les boutons d'ajout dans les cartes
function setupCardButtons() {
    document.getElementById('add-filiere-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('filiere-content');
    });
    
    document.getElementById('add-classe-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('classe-content');
    });
    
    document.getElementById('add-matiere-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('matiere-content');
    });
    
    document.getElementById('add-prof-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('prof-content');
    });
    
    document.getElementById('add-etudiant-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('etudiant-content');
    });
}

// Afficher une section et masquer les autres
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Afficher la section demandée
    document.getElementById(sectionId).style.display = 'block';
    
    // Mettre à jour le menu actif
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Activer le lien correspondant dans le menu
    switch(sectionId) {
        case 'dashboard-content':
            document.getElementById('dashboard-link').classList.add('active');
            break;
        case 'filiere-content':
            document.getElementById('filiere-link').classList.add('active');
            break;
        case 'classe-content':
            document.getElementById('classe-link').classList.add('active');
            break;
        case 'matiere-content':
            document.getElementById('matiere-link').classList.add('active');
            break;
        case 'prof-content':
            document.getElementById('prof-link').classList.add('active');
            break;
        case 'etudiant-content':
            document.getElementById('etudiant-link').classList.add('active');
            break;
    }
}

// Configurer les formulaires
function setupForms() {
    // Formulaire de filière
    document.getElementById('filiere-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('filiere-nom').value;
        const description = document.getElementById('filiere-description').value;
        
        const newFiliere = {
            id: appData.filieres.length > 0 ? Math.max(...appData.filieres.map(f => f.id)) + 1 : 1,
            nom: nom,
            description: description
        };
        
        appData.filieres.push(newFiliere);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Filière ajoutée avec succès!');
    });
    
    // Formulaire de classe
    document.getElementById('classe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('classe-nom').value;
        const filiereId = parseInt(document.getElementById('classe-filiere').value);
        
        const newClasse = {
            id: appData.classes.length > 0 ? Math.max(...appData.classes.map(c => c.id)) + 1 : 1,
            nom: nom,
            filiereId: filiereId
        };
        
        appData.classes.push(newClasse);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Classe ajoutée avec succès!');
    });
    
    // Formulaire de matière
    document.getElementById('matiere-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('matiere-nom').value;
        const coefficient = parseInt(document.getElementById('matiere-coefficient').value);
        
        const newMatiere = {
            id: appData.matieres.length > 0 ? Math.max(...appData.matieres.map(m => m.id)) + 1 : 1,
            nom: nom,
            coefficient: coefficient
        };
        
        appData.matieres.push(newMatiere);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Matière ajoutée avec succès!');
    });
    
    // Formulaire de professeur
    document.getElementById('prof-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('prof-nom').value;
        const prenom = document.getElementById('prof-prenom').value;
        const email = document.getElementById('prof-email').value;
        const telephone = document.getElementById('prof-telephone').value;
        const matiereId = parseInt(document.getElementById('prof-matiere').value);
        
        const newProf = {
            id: appData.professeurs.length > 0 ? Math.max(...appData.professeurs.map(p => p.id)) + 1 : 1,
            nom: nom,
            prenom: prenom,
            email: email,
            telephone: telephone,
            matiereId: matiereId
        };
        
        appData.professeurs.push(newProf);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Professeur ajouté avec succès!');
    });
    
    // Formulaire d'étudiant
    document.getElementById('etudiant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('etudiant-nom').value;
        const prenom = document.getElementById('etudiant-prenom').value;
        const dateNaissance = document.getElementById('etudiant-date-naissance').value;
        const lieuNaissance = document.getElementById('etudiant-lieu-naissance').value;
        const matricule = document.getElementById('etudiant-matricule').value;
        const dateInscription = document.getElementById('etudiant-date-inscription').value;
        const filiereId = parseInt(document.getElementById('etudiant-filiere').value);
        const classeId = parseInt(document.getElementById('etudiant-classe').value);
        const photoInput = document.getElementById('etudiant-photo');
        
        // Gérer l'upload de la photo
        let photo = null;
        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                photo = e.target.result;
                saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo);
            };
            
            reader.readAsDataURL(file);
        } else {
            saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo);
        }
    });
    
    // Mettre à jour les classes en fonction de la filière sélectionnée
    document.getElementById('etudiant-filiere').addEventListener('change', function() {
        const filiereId = parseInt(this.value);
        const classeSelect = document.getElementById('etudiant-classe');
        
        // Vider les options actuelles
        classeSelect.innerHTML = '<option value="">Sélectionner une classe</option>';
        
        if (filiereId) {
            // Filtrer les classes par filière
            const classes = appData.classes.filter(c => c.filiereId === filiereId);
            
            // Ajouter les nouvelles options
            classes.forEach(classe => {
                const option = document.createElement('option');
                option.value = classe.id;
                option.textContent = classe.nom;
                classeSelect.appendChild(option);
            });
        }
    });
}

// Sauvegarder un nouvel étudiant
function saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo) {
    const newEtudiant = {
        id: appData.etudiants.length > 0 ? Math.max(...appData.etudiants.map(e => e.id)) + 1 : 1,
        nom: nom,
        prenom: prenom,
        dateNaissance: dateNaissance,
        lieuNaissance: lieuNaissance,
        matricule: matricule,
        filiereId: filiereId,
        classeId: classeId,
        dateInscription: dateInscription,
        photo: photo
    };
    
    appData.etudiants.push(newEtudiant);
    saveData();
    
    // Réinitialiser le formulaire
    document.getElementById('etudiant-form').reset();
    
    // Afficher un message de succès
    alert('Étudiant ajouté avec succès!');
}

// Mettre à jour les options des listes déroulantes
function updateSelectOptions() {
    // Mettre à jour les options des filières
    const filiereSelects = document.querySelectorAll('.filiere-select');
    filiereSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une filière</option>';
        appData.filieres.forEach(filiere => {
            const option = document.createElement('option');
            option.value = filiere.id;
            option.textContent = filiere.nom;
            select.appendChild(option);
        });
    });

    // Mettre à jour les options des classes
    const classeSelects = document.querySelectorAll('.classe-select');
    classeSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une classe</option>';
        appData.classes.forEach(classe => {
            const option = document.createElement('option');
            option.value = classe.id;
            option.textContent = classe.nom;
            select.appendChild(option);
        });
    });

    // Mettre à jour les options des matières
    const matiereSelects = document.querySelectorAll('.matiere-select');
    matiereSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une matière</option>';
        appData.matieres.forEach(matiere => {
            const option = document.createElement('option');
            option.value = matiere.id;
            option.textContent = matiere.nom;
            select.appendChild(option);
        });
    });
}

// Mettre à jour les tableaux
function updateTables() {
    // Tableau des étudiants
    const etudiantTableBody = document.getElementById('etudiant-table-body');
    etudiantTableBody.innerHTML = '';
    
    appData.etudiants.forEach(etudiant => {
        const filiere = appData.filieres.find(f => f.id === etudiant.filiereId);
        const classe = appData.classes.find(c => c.id === etudiant.classeId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${etudiant.photo ? 
                    `<img src="${etudiant.photo}" class="etudiant-photo">` : 
                    '<i class="fas fa-user-circle fa-2x"></i>'}
            </td>
            <td>${etudiant.matricule}</td>
            <td>
                <a href="#" class="student-name" data-id="${etudiant.id}">
                    ${etudiant.nom}
                </a>
            </td>
            <td>
                <a href="#" class="student-name" data-id="${etudiant.id}">
                    ${etudiant.prenom}
                </a>
            </td>
            <td>${filiere ? filiere.nom : 'Inconnue'}</td>
            <td>${classe ? classe.nom : 'Inconnue'}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${etudiant.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${etudiant.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        etudiantTableBody.appendChild(row);
    });
}

// Ajouter des gestionnaires pour les boutons edit-btn et delete-btn
document.getElementById('etudiant-table-body').addEventListener('click', function(e) {
    const target = e.target;

    // Gestion du bouton d'édition
    if (target.classList.contains('edit-btn') || target.closest('.edit-btn')) {
        const studentId = parseInt(target.closest('.edit-btn').getAttribute('data-id// filepath: c:\Users\judee\Desktop\appli\script.js

// Données de l'application
let appData = {
    filieres: [],
    classes: [],
    matieres: [],
    professeurs: [],
    etudiants: [],
    notes: []
};

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Charger les données depuis le localStorage
    loadData();
    
    // Mettre à jour les compteurs
    updateCounters();
    
    // Gestion des clics sur le menu
    setupMenuNavigation();
    
    // Gestion des formulaires
    setupForms();
    
    // Afficher le dashboard par défaut
    showSection('dashboard-content');
    
    // Gestion des boutons d'ajout dans les cartes
    setupCardButtons();
});

// Charger les données depuis le localStorage
function loadData() {
    const savedData = localStorage.getItem('studentDashboardData');
    if (savedData) {
        appData = JSON.parse(savedData);
    } else {
        // Données par défaut pour le démo
        appData = {
            filieres: [
                { id: 1, nom: "Informatique", description: "Programmation et réseaux" },
                { id: 2, nom: "Gestion", description: "Comptabilité et management" }
            ],
            classes: [
                { id: 1, nom: "L1 Info", filiereId: 1 },
                { id: 2, nom: "L2 Info", filiereId: 1 },
                { id: 3, nom: "L1 Gestion", filiereId: 2 }
            ],
            matieres: [
                { id: 1, nom: "Programmation", coefficient: 4 },
                { id: 2, nom: "Réseaux", coefficient: 3 },
                { id: 3, nom: "Comptabilité", coefficient: 5 }
            ],
            professeurs: [
                { id: 1, nom: "Dupont", prenom: "Jean", email: "j.dupont@ecole.com", telephone: "0123456789", matiereId: 1 },
                { id: 2, nom: "Martin", prenom: "Sophie", email: "s.martin@ecole.com", telephone: "0987654321", matiereId: 2 }
            ],
            etudiants: [
                { 
                    id: 1, 
                    nom: "Doe", 
                    prenom: "John", 
                    dateNaissance: "2000-01-15", 
                    lieuNaissance: "Paris", 
                    matricule: "ET2023001", 
                    filiereId: 1, 
                    classeId: 1, 
                    dateInscription: "2023-09-01",
                    photo: null
                }
            ],
            notes: [
                { id: 1, etudiantId: 1, matiereId: 1, note: 15, date: "2023-10-15" },
                { id: 2, etudiantId: 1, matiereId: 1, note: 16, date: "2023-11-20" },
                { id: 3, etudiantId: 1, matiereId: 2, note: 12, date: "2023-10-18" },
                { id: 4, etudiantId: 1, matiereId: 2, note: 14, date: "2023-11-22" }
            ]
        };
        saveData();
    }
    
    // Mettre à jour les listes déroulantes
    updateSelectOptions();
    
    // Mettre à jour les tableaux
    updateTables();
}

// Sauvegarder les données dans le localStorage
function saveData() {
    localStorage.setItem('studentDashboardData', JSON.stringify(appData));
    updateCounters();
    updateSelectOptions();
    updateTables();
}

// Mettre à jour les compteurs
function updateCounters() {
    document.getElementById('filiere-count').textContent = appData.filieres.length;
    document.getElementById('classe-count').textContent = appData.classes.length;
    document.getElementById('matiere-count').textContent = appData.matieres.length;
    document.getElementById('prof-count').textContent = appData.professeurs.length;
    document.getElementById('etudiant-count').textContent = appData.etudiants.length;
}

// Configurer la navigation dans le menu
function setupMenuNavigation() {
    document.getElementById('dashboard-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('dashboard-content');
    });
    
    document.getElementById('filiere-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('filiere-content');
    });
    
    document.getElementById('classe-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('classe-content');
    });
    
    document.getElementById('matiere-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('matiere-content');
    });
    
    document.getElementById('prof-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('prof-content');
    });
    
    document.getElementById('etudiant-link').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('etudiant-content');
    });
}

// Configurer les boutons d'ajout dans les cartes
function setupCardButtons() {
    document.getElementById('add-filiere-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('filiere-content');
    });
    
    document.getElementById('add-classe-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('classe-content');
    });
    
    document.getElementById('add-matiere-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('matiere-content');
    });
    
    document.getElementById('add-prof-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('prof-content');
    });
    
    document.getElementById('add-etudiant-btn').addEventListener('click', function(e) {
        e.preventDefault();
        showSection('etudiant-content');
    });
}

// Afficher une section et masquer les autres
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Afficher la section demandée
    document.getElementById(sectionId).style.display = 'block';
    
    // Mettre à jour le menu actif
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Activer le lien correspondant dans le menu
    switch(sectionId) {
        case 'dashboard-content':
            document.getElementById('dashboard-link').classList.add('active');
            break;
        case 'filiere-content':
            document.getElementById('filiere-link').classList.add('active');
            break;
        case 'classe-content':
            document.getElementById('classe-link').classList.add('active');
            break;
        case 'matiere-content':
            document.getElementById('matiere-link').classList.add('active');
            break;
        case 'prof-content':
            document.getElementById('prof-link').classList.add('active');
            break;
        case 'etudiant-content':
            document.getElementById('etudiant-link').classList.add('active');
            break;
    }
}

// Configurer les formulaires
function setupForms() {
    // Formulaire de filière
    document.getElementById('filiere-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('filiere-nom').value;
        const description = document.getElementById('filiere-description').value;
        
        const newFiliere = {
            id: appData.filieres.length > 0 ? Math.max(...appData.filieres.map(f => f.id)) + 1 : 1,
            nom: nom,
            description: description
        };
        
        appData.filieres.push(newFiliere);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Filière ajoutée avec succès!');
    });
    
    // Formulaire de classe
    document.getElementById('classe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('classe-nom').value;
        const filiereId = parseInt(document.getElementById('classe-filiere').value);
        
        const newClasse = {
            id: appData.classes.length > 0 ? Math.max(...appData.classes.map(c => c.id)) + 1 : 1,
            nom: nom,
            filiereId: filiereId
        };
        
        appData.classes.push(newClasse);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Classe ajoutée avec succès!');
    });
    
    // Formulaire de matière
    document.getElementById('matiere-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('matiere-nom').value;
        const coefficient = parseInt(document.getElementById('matiere-coefficient').value);
        
        const newMatiere = {
            id: appData.matieres.length > 0 ? Math.max(...appData.matieres.map(m => m.id)) + 1 : 1,
            nom: nom,
            coefficient: coefficient
        };
        
        appData.matieres.push(newMatiere);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Matière ajoutée avec succès!');
    });
    
    // Formulaire de professeur
    document.getElementById('prof-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('prof-nom').value;
        const prenom = document.getElementById('prof-prenom').value;
        const email = document.getElementById('prof-email').value;
        const telephone = document.getElementById('prof-telephone').value;
        const matiereId = parseInt(document.getElementById('prof-matiere').value);
        
        const newProf = {
            id: appData.professeurs.length > 0 ? Math.max(...appData.professeurs.map(p => p.id)) + 1 : 1,
            nom: nom,
            prenom: prenom,
            email: email,
            telephone: telephone,
            matiereId: matiereId
        };
        
        appData.professeurs.push(newProf);
        saveData();
        
        // Réinitialiser le formulaire
        this.reset();
        
        // Afficher un message de succès
        alert('Professeur ajouté avec succès!');
    });
    
    // Formulaire d'étudiant
    document.getElementById('etudiant-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const nom = document.getElementById('etudiant-nom').value;
        const prenom = document.getElementById('etudiant-prenom').value;
        const dateNaissance = document.getElementById('etudiant-date-naissance').value;
        const lieuNaissance = document.getElementById('etudiant-lieu-naissance').value;
        const matricule = document.getElementById('etudiant-matricule').value;
        const dateInscription = document.getElementById('etudiant-date-inscription').value;
        const filiereId = parseInt(document.getElementById('etudiant-filiere').value);
        const classeId = parseInt(document.getElementById('etudiant-classe').value);
        const photoInput = document.getElementById('etudiant-photo');
        
        // Gérer l'upload de la photo
        let photo = null;
        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                photo = e.target.result;
                saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo);
            };
            
            reader.readAsDataURL(file);
        } else {
            saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo);
        }
    });
    
    // Mettre à jour les classes en fonction de la filière sélectionnée
    document.getElementById('etudiant-filiere').addEventListener('change', function() {
        const filiereId = parseInt(this.value);
        const classeSelect = document.getElementById('etudiant-classe');
        
        // Vider les options actuelles
        classeSelect.innerHTML = '<option value="">Sélectionner une classe</option>';
        
        if (filiereId) {
            // Filtrer les classes par filière
            const classes = appData.classes.filter(c => c.filiereId === filiereId);
            
            // Ajouter les nouvelles options
            classes.forEach(classe => {
                const option = document.createElement('option');
                option.value = classe.id;
                option.textContent = classe.nom;
                classeSelect.appendChild(option);
            });
        }
    });
}

// Sauvegarder un nouvel étudiant
function saveNewStudent(nom, prenom, dateNaissance, lieuNaissance, matricule, filiereId, classeId, dateInscription, photo) {
    const newEtudiant = {
        id: appData.etudiants.length > 0 ? Math.max(...appData.etudiants.map(e => e.id)) + 1 : 1,
        nom: nom,
        prenom: prenom,
        dateNaissance: dateNaissance,
        lieuNaissance: lieuNaissance,
        matricule: matricule,
        filiereId: filiereId,
        classeId: classeId,
        dateInscription: dateInscription,
        photo: photo
    };
    
    appData.etudiants.push(newEtudiant);
    saveData();
    
    // Réinitialiser le formulaire
    document.getElementById('etudiant-form').reset();
    
    // Afficher un message de succès
    alert('Étudiant ajouté avec succès!');
}

// Mettre à jour les options des listes déroulantes
function updateSelectOptions() {
    // Mettre à jour les options des filières
    const filiereSelects = document.querySelectorAll('.filiere-select');
    filiereSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une filière</option>';
        appData.filieres.forEach(filiere => {
            const option = document.createElement('option');
            option.value = filiere.id;
            option.textContent = filiere.nom;
            select.appendChild(option);
        });
    });

    // Mettre à jour les options des classes
    const classeSelects = document.querySelectorAll('.classe-select');
    classeSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une classe</option>';
        appData.classes.forEach(classe => {
            const option = document.createElement('option');
            option.value = classe.id;
            option.textContent = classe.nom;
            select.appendChild(option);
        });
    });

    // Mettre à jour les options des matières
    const matiereSelects = document.querySelectorAll('.matiere-select');
    matiereSelects.forEach(select => {
        select.innerHTML = '<option value="">Sélectionner une matière</option>';
        appData.matieres.forEach(matiere => {
            const option = document.createElement('option');
            option.value = matiere.id;
            option.textContent = matiere.nom;
            select.appendChild(option);
        });
    });
}

// Mettre à jour les tableaux
function updateTables() {
    // Tableau des étudiants
    const etudiantTableBody = document.getElementById('etudiant-table-body');
    etudiantTableBody.innerHTML = '';
    
    appData.etudiants.forEach(etudiant => {
        const filiere = appData.filieres.find(f => f.id === etudiant.filiereId);
        const classe = appData.classes.find(c => c.id === etudiant.classeId);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${etudiant.photo ? 
                    `<img src="${etudiant.photo}" class="etudiant-photo">` : 
                    '<i class="fas fa-user-circle fa-2x"></i>'}
            </td>
            <td>${etudiant.matricule}</td>
            <td>
                <a href="#" class="student-name" data-id="${etudiant.id}">
                    ${etudiant.nom}
                </a>
            </td>
            <td>
                <a href="#" class="student-name" data-id="${etudiant.id}">
                    ${etudiant.prenom}
                </a>
            </td>
            <td>${filiere ? filiere.nom : 'Inconnue'}</td>
            <td>${classe ? classe.nom : 'Inconnue'}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${etudiant.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${etudiant.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        etudiantTableBody.appendChild(row);
    });
}

// Ajouter des gestionnaires pour les boutons edit-btn et delete-btn
document.getElementById('etudiant-table-body').addEventListener('click', function(e) {
    const target = e.target;

    // Gestion du bouton d'édition
    if (target.classList.contains('edit-btn') || target.closest('.edit-btn')) {
        const studentId = parseInt(target.closest('.edit-btn').getAttribute('data-id        ));
        editStudent(studentId);
    }

    // Gestion du bouton de suppression
    if (target.classList.contains('delete-btn') || target.closest('.delete-btn')) {
        const studentId = parseInt(target.closest('.delete-btn').getAttribute('data-id'));
        deleteStudent(studentId);
    }
});

// Fonction pour éditer un étudiant
function editStudent(studentId) {
    const student = appData.etudiants.find(e => e.id === studentId);
    if (!student) return;

    // Pré-remplir les champs du formulaire avec les données de l'étudiant
    document.getElementById('etudiant-nom').value = student.nom;
    document.getElementById('etudiant-prenom').value = student.prenom;
    document.getElementById('etudiant-date-naissance').value = student.dateNaissance;
    document.getElementById('etudiant-lieu-naissance').value = student.lieuNaissance;
    document.getElementById('etudiant-matricule').value = student.matricule;
    document.getElementById('etudiant-date-inscription').value = student.dateInscription;
    document.getElementById('etudiant-filiere').value = student.filiereId;
    updateClassOptions(student.filiereId); // Mettre à jour les options des classes
    document.getElementById('etudiant-classe').value = student.classeId;

    // Ajouter un gestionnaire pour sauvegarder les modifications
    document.getElementById('etudiant-form').addEventListener('submit', function handleEdit(e) {
        e.preventDefault();

        // Mettre à jour les données de l'étudiant
        student.nom = document.getElementById('etudiant-nom').value;
        student.prenom = document.getElementById('etudiant-prenom').value;
        student.dateNaissance = document.getElementById('etudiant-date-naissance').value;
        student.lieuNaissance = document.getElementById('etudiant-lieu-naissance').value;
        student.matricule = document.getElementById('etudiant-matricule').value;
        student.dateInscription = document.getElementById('etudiant-date-inscription').value;
        student.filiereId = parseInt(document.getElementById('etudiant-filiere').value);
        student.classeId = parseInt(document.getElementById('etudiant-classe').value);

        saveData();
        updateTables();
        alert('Étudiant modifié avec succès!');

        // Supprimer le gestionnaire pour éviter les doublons
        this.removeEventListener('submit', handleEdit);
        this.reset();
    });

    // Afficher la section du formulaire d'étudiant
    showSection('etudiant-content');
}

// Fonction pour supprimer un étudiant
function deleteStudent(studentId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
        appData.etudiants = appData.etudiants.filter(e => e.id !== studentId);
        saveData();
        updateTables();
        alert('Étudiant supprimé avec succès!');
    }
}

// Fonction pour mettre à jour les options des classes en fonction de la filière sélectionnée
function updateClassOptions(filiereId) {
    const classeSelect = document.getElementById('etudiant-classe');
    classeSelect.innerHTML = '<option value="">Sélectionner une classe</option>';

    if (filiereId) {
        const classes = appData.classes.filter(c => c.filiereId === filiereId);
        classes.forEach(classe => {
            const option = document.createElement('option');
            option.value = classe.id;
            option.textContent = classe.nom;
            classeSelect.appendChild(option);
        });
    }
}function handleEdit(e) {
    e.preventDefault();
    // Mettre à jour les données de l'étudiant
    student.nom = document.getElementById('etudiant-nom').value;
    student.prenom = document.getElementById('etudiant-prenom').value;
    student.dateNaissance = document.getElementById('etudiant-date-naissance').value;
    student.lieuNaissance = document.getElementById('etudiant-lieu-naissance').value;
    student.matricule = document.getElementById('etudiant-matricule').value;
    student.dateInscription = document.getElementById('etudiant-date-inscription').value;
    student.filiereId = parseInt(document.getElementById('etudiant-filiere').value);
    student.classeId = parseInt(document.getElementById('etudiant-classe').value);

    saveData();
    updateTables();
    alert('Étudiant modifié avec succès!');

    // Supprimer le gestionnaire
    document.getElementById('etudiant-form').removeEventListener('submit', handleEdit);
    document.getElementById('etudiant-form').reset();
}