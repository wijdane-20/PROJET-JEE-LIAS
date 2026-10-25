import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  email = '';
  password = '';
  message = '';
  isLoggedIn = false;

  currentPage = 'dashboard';

  dashboardMode = 'ADMIN';

  membresCount = 0;
  equipesCount = 0;
  publicationsCount = 0;
  evenementsCount = 0;

  // ================= MON PROFIL =================

  currentUserRole = '';
  profileMembre: any = null;
  profileMessage = '';

  profileForm: any = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    statut: '',
    etablissementOrigine: '',
    laboratoireOrigine: '',
    biographie: '',
    centresInteret: '',
    dateNaissance: '',
    dateEmbauche: '',
    dateAffiliation: '',
    photo: '',
    actif: true
  };

  // ================= MEMBRES =================

  membres: any[] = [];

  membreForm: any = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    statut: '',
    etablissementOrigine: '',
    laboratoireOrigine: '',
    biographie: '',
    centresInteret: '',
    dateNaissance: '',
    dateEmbauche: '',
    dateAffiliation: '',
    photo: '',
    actif: true
  };

  editingMembre = false;


  membreSearch = '';
  membreStatutFilter = '';

  // ================= EQUIPES =================

  equipes: any[] = [];

  equipeForm: any = {
    id: null,
    nom: '',
    description: '',
    domaineRecherche: '',
    active: true
  };

  editingEquipe = false;

  equipeSearch = '';

  // ================= PUBLICATIONS =================

  publications: any[] = [];

  publicationForm: any = {
    id: null,
    titre: '',
    type: '',
    annee: null,
    auteurPrincipal: '',
    doi: '',
    equipe: '',
    lien: '',
    resume: ''
  };

  editingPublication = false;

  // ================= EVENEMENTS =================

  evenements: any[] = [];

  evenementForm: any = {
    id: null,
    titre: '',
    type: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    organisateur: '',
    description: '',
    archive: false
  };

  editingEvenement = false;

  // ================= AFFILIATIONS =================

  affiliations: any[] = [];

  affiliationForm: any = {
    id: null,
    membreId: null,
    equipe: '',
    role: '',
    dateDebut: '',
    dateFin: '',
    active: true
  };

  editingAffiliation = false;

  // ================= MANDATS =================

  mandats: any[] = [];

  mandatForm: any = {
    id: null,
    membreId: null,
    role: '',
    dateDebut: '',
    dateFin: '',
    actif: true
  };

  editingMandat = false;

  // ================= DOCUMENTS / ARCHIVES =================

  documents: any[] = [];

  documentForm: any = {
    id: null,
    titre: '',
    type: '',
    cheminFichier: '',
    dateAjout: '',
    description: '',
    archive: false
  };

  editingDocument = false;


  // ================= MODULES COMPLEMENTAIRES =================

  demandesAdhesion: any[] = [];
  demandeForm: any = {
    id: null, nom: '', prenom: '', email: '', cvFichier: '',
    motivation: '', statut: 'EN_ATTENTE', commentaireDecision: '', dateDemande: null
  };
  editingDemande = false;

  rolesHistoriques: any[] = [];
  roleForm: any = {
    id: null, membreId: null, role: '', dateDebut: '', dateFin: '', actif: true
  };
  editingRole = false;

  materiels: any[] = [];
  materielForm: any = {
    id: null, nom: '', categorie: '', quantiteTotale: 0, quantiteDisponible: 0,
    dateArrivage: '', description: ''
  };
  editingMateriel = false;

  besoinsMateriel: any[] = [];
  besoinForm: any = {
    id: null, membreId: null, materielDemande: '', quantite: 1,
    justification: '', statut: 'EN_ATTENTE', dateDemande: null
  };
  editingBesoin = false;

  conventions: any[] = [];
  conventionForm: any = {
    id: null, partenaire: '', titre: '', dateDebut: '', dateFin: '',
    document: '', description: '', active: true
  };
  editingConvention = false;

  reunions: any[] = [];
  reunionForm: any = {
    id: null, titre: '', dateReunion: '', ordreDuJour: '', cheminPv: '', archive: false
  };
  editingReunion = false;

  discussions: any[] = [];
  discussionForm: any = {
    id: null, auteurEmail: '', equipe: '', evenementId: null, contenu: '', dateCreation: null
  };

  notifications: any[] = [];
  notificationForm: any = {
    id: null, destinataire: '', type: '', message: '', dateCreation: null, lue: false
  };

  auditLogs: any[] = [];


  // ================= THESES DE DOCTORAT =================

  theses: any[] = [];

  theseForm: any = {
    id: null,
    doctorant: '',
    sujet: '',
    directeur: '',
    anneeInscription: new Date().getFullYear(),
    statut: 'EN_COURS'
  };

  editingThese = false;


  searchQuery = '';
  searchResults: any = {
    membres: [], documents: [], evenements: [], publications: []
  };

  calendarYear = new Date().getFullYear();
  rapportYear = new Date().getFullYear();

  // ================= RAPPORT ANNUEL =================

  rapportStats = {
    membres: 8,
    equipes: 7,
    publications: 2,
    evenements: 2
  };

  rapportLoading = false;


  rapportTitre = "Rapport d'Activité Scientifique LIAS";
  rapportAuteur = "Direction du laboratoire";
  rapportType = "Activité scientifique";
  rapportMessage = '';

  rapportsDemo: any[] = [
    {
      titre: "Rapport d'Activité Scientifique LIAS 2025",
      annee: 2025,
      auteur: "Direction LIAS",
      type: "Activité scientifique",
      statut: "FINALISE"
    },
    {
      titre: "Bilan Financier et Équipements 2026",
      annee: 2026,
      auteur: "Comité de direction",
      type: "Bilan annuel",
      statut: "EN_COURS"
    },
    {
      titre: "Rapport Publications et Événements 2024",
      annee: 2024,
      auteur: "Commission scientifique",
      type: "Recherche",
      statut: "FINALISE"
    }
  ];

  constructor(private http: HttpClient) {}

  // ================= LOGIN =================

  login() {
    const credentials =
      btoa(`${this.email}:${this.password}`);

    const headers = new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });

    this.http
      .get<any[]>(
        'http://localhost:8080/api/membres',
        { headers }
      )
      .subscribe({
        next: () => {
          this.isLoggedIn = true;
          this.message = '';
          this.currentPage = 'dashboard';

          // Pour le compte de démonstration actuel.
          // Quand un endpoint /api/auth/me sera ajouté au backend,
          // on pourra récupérer le rôle directement depuis la base.
          this.currentUserRole =
            this.email.trim().toLowerCase() === 'wijdanebenkhadir03@gmail.com'
              ? 'ADMIN'
              : 'MEMBRE';

          this.dashboardMode =
            this.currentUserRole === 'ADMIN'
              ? 'ADMIN'
              : 'CHERCHEUR';

          this.loadDashboardData();
          this.loadProfile();
        },

        error: () => {
          this.isLoggedIn = false;
          this.message =
            'Email ou mot de passe incorrect';
        }
      });
  }

  // ================= NAVIGATION =================

  goTo(page: string) {
    this.currentPage = page;

    if (page === 'profil') {
      this.loadProfile();
    }

    if (page === 'membres') {
      this.loadMembres();
    }

    if (page === 'equipes') {
      this.loadEquipes();
    }

    if (page === 'publications') {
      this.loadPublications();
    }

    if (page === 'evenements') {
      this.loadEvenements();
    }

    if (page === 'affiliations') {
      this.loadAffiliations();
    }

    if (page === 'mandats') {
      this.loadMandats();
    }

    if (page === 'demandes') {
      this.loadDemandesAdhesion();
    }

    if (page === 'roles') {
      this.loadRolesHistoriques();
    }

    if (page === 'materiel') {
      this.loadMateriels();
    }

    if (page === 'besoins') {
      this.loadBesoinsMateriel();
    }

    if (page === 'conventions') {
      this.loadConventions();
    }

    if (page === 'reunions') {
      this.loadReunions();
    }

    if (page === 'discussions') {
      this.loadDiscussions();
    }

    if (page === 'notifications') {
      this.loadNotifications();
    }

    if (page === 'audit') {
      this.loadAudit();
    }

    if (page === 'calendar') {
      this.loadEvenements();
    }

    if (page === 'search') {
      this.searchGlobal();
    }


    if (page === 'theses') {
      this.loadTheses();
    }

    if (page === 'documents') {
      this.loadDocuments();
    }

    if (page === 'rapport') {
      this.loadRapport();
    }
  }


  // ================= VUES / ROLES DASHBOARD =================

  setDashboardMode(mode: string) {
    this.dashboardMode = mode || 'ADMIN';
    this.currentPage = 'dashboard';
  }

  inferModeFromMember(membre: any) {
    const statut = String(membre?.statut || '').toUpperCase();

    if (statut === 'ASSOCIE') {
      return 'ASSOCIE';
    }

    if (statut === 'DOCTORANT') {
      return 'DOCTORANT';
    }

    return 'CHERCHEUR';
  }

  get dashboardModeLabel() {
    switch (this.dashboardMode) {
      case 'ADMIN': return 'Administrateur';
      case 'DIRECTEUR': return 'Directeur';
      case 'VICE_DIRECTEUR': return 'Vice-directeur';
      case 'CHEF_EQUIPE': return "Chef d'équipe";
      case 'CHERCHEUR': return 'Chercheur';
      case 'ASSOCIE': return 'Membre associé';
      case 'DOCTORANT': return 'Doctorant';
      default: return 'Membre LIAS';
    }
  }

  get dashboardModeIcon() {
    switch (this.dashboardMode) {
      case 'ADMIN': return '🛡️';
      case 'DIRECTEUR': return '👑';
      case 'VICE_DIRECTEUR': return '🎯';
      case 'CHEF_EQUIPE': return '🧭';
      case 'CHERCHEUR': return '🔬';
      case 'ASSOCIE': return '🤝';
      case 'DOCTORANT': return '🎓';
      default: return '👤';
    }
  }

  get dashboardGreeting() {
    switch (this.dashboardMode) {
      case 'ADMIN': return 'Administration & supervision LIAS';
      case 'DIRECTEUR': return 'Tableau de bord de la direction';
      case 'VICE_DIRECTEUR': return 'Suivi opérationnel du laboratoire';
      case 'CHEF_EQUIPE': return "Pilotage de l'équipe de recherche";
      case 'CHERCHEUR': return 'Mon espace de chercheur';
      case 'ASSOCIE': return 'Mon espace de collaboration';
      case 'DOCTORANT': return 'Mon espace doctorant';
      default: return 'Tableau de bord LIAS';
    }
  }

  get dashboardModeDescription() {
    switch (this.dashboardMode) {
      case 'ADMIN':
        return "Gestion technique, gouvernance, traçabilité et supervision globale de la plateforme.";
      case 'DIRECTEUR':
        return "Validation, supervision des activités scientifiques et pilotage du rapport annuel.";
      case 'VICE_DIRECTEUR':
        return "Appui à la direction, coordination des équipes, événements et ressources.";
      case 'CHEF_EQUIPE':
        return "Suivi de l'équipe, publications, échanges internes et besoins scientifiques.";
      case 'CHERCHEUR':
        return "Profil scientifique, publications, événements et collaboration interne.";
      case 'ASSOCIE':
        return "Consultation, collaboration scientifique, événements et publications selon les droits.";
      case 'DOCTORANT':
        return "Accès centré sur le profil, les publications et les activités scientifiques.";
      default:
        return "Bienvenue sur la plateforme de gestion du laboratoire LIAS.";
    }
  }

  canSeeMembersAndTeams() {
    return this.dashboardMode !== 'DOCTORANT';
  }

  canSeeAffiliations() {
    return ['ADMIN', 'DIRECTEUR', 'VICE_DIRECTEUR'].includes(this.dashboardMode);
  }

  canSeeInternalModules() {
    return ['ADMIN', 'DIRECTEUR', 'VICE_DIRECTEUR', 'CHEF_EQUIPE', 'CHERCHEUR'].includes(this.dashboardMode);
  }

  canSeeDirectionModules() {
    return ['ADMIN', 'DIRECTEUR', 'VICE_DIRECTEUR'].includes(this.dashboardMode);
  }

  canSeeDemandes() {
    return ['ADMIN', 'DIRECTEUR'].includes(this.dashboardMode);
  }

  canSeeRapport() {
    return ['ADMIN', 'DIRECTEUR', 'VICE_DIRECTEUR'].includes(this.dashboardMode);
  }

  canSeeTheses() {
    return ['ADMIN', 'DIRECTEUR', 'VICE_DIRECTEUR', 'CHEF_EQUIPE', 'CHERCHEUR', 'DOCTORANT'].includes(this.dashboardMode);
  }

  get pendingDemandesCount() {
    return this.demandesAdhesion.filter((item: any) =>
      String(item?.statut || '').toUpperCase() === 'EN_ATTENTE'
    ).length;
  }

  get pendingBesoinsCount() {
    return this.besoinsMateriel.filter((item: any) =>
      String(item?.statut || '').toUpperCase() === 'EN_ATTENTE'
    ).length;
  }

  get activeMandatsCount() {
    return this.mandats.filter((item: any) => item?.actif !== false).length;
  }

  get unreadNotificationsCount() {
    return this.notifications.filter((item: any) => item?.lue === false).length;
  }

  get recentPublications() {
    return [...this.publications]
      .sort((a: any, b: any) => Number(b?.annee || 0) - Number(a?.annee || 0))
      .slice(0, 3);
  }

  get recentEvenements() {
    return [...this.evenements]
      .sort((a: any, b: any) =>
        String(b?.dateDebut || '').localeCompare(String(a?.dateDebut || ''))
      )
      .slice(0, 3);
  }


  // ================= AUTH =================

  getAuthHeaders() {
    const credentials =
      btoa(`${this.email}:${this.password}`);

    return new HttpHeaders({
      Authorization: `Basic ${credentials}`
    });
  }

  // ================= DASHBOARD =================

  loadDashboardData() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/membres',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.membres = data;
          this.membresCount = data.length;
        }
      });

    this.http
      .get<any[]>(
        'http://localhost:8080/api/equipes',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.equipes = data;
          this.equipesCount = data.length;
        }
      });

    this.http
      .get<any[]>(
        'http://localhost:8080/api/publications',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.publications = data;
          this.publicationsCount = data.length;
        }
      });

    this.http
      .get<any[]>(
        'http://localhost:8080/api/evenements',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.evenements = data;
          this.evenementsCount = data.length;
        }
      });

    // Données complémentaires utilisées par les vues de direction.
    this.loadMandats();
    this.loadDemandesAdhesion();
    this.loadBesoinsMateriel();
    this.loadNotifications();
    this.loadMateriels();
    this.loadDiscussions();
    this.loadAudit();
  }

  // ================= MON PROFIL =================

  loadProfile() {
    const headers = this.getAuthHeaders();

    this.profileMessage = '';

    this.http
      .get<any[]>(
        'http://localhost:8080/api/membres',
        { headers }
      )
      .subscribe({
        next: (data) => {
          const emailConnecte =
            this.email.trim().toLowerCase();

          const membre = data.find(
            (item: any) =>
              (item.email || '').trim().toLowerCase() === emailConnecte
          );

          if (membre) {
            this.profileMembre = membre;

            this.profileForm = {
              ...membre
            };

            if (this.currentUserRole !== 'ADMIN') {
              this.dashboardMode = this.inferModeFromMember(membre);
            }
          } else {
            this.profileMembre = null;

            this.profileForm = {
              id: null,
              nom: '',
              prenom: '',
              email: this.email,
              statut: '',
              etablissementOrigine: '',
              laboratoireOrigine: '',
              biographie: '',
              centresInteret: '',
              dateNaissance: '',
              dateEmbauche: '',
              dateAffiliation: '',
              photo: '',
              actif: true
            };

            this.profileMessage =
              'Ce compte utilisateur n’est pas encore lié à une fiche membre.';
          }
        },

        error: (error) => {
          console.error(
            'Erreur chargement profil',
            error
          );

          this.profileMessage =
            'Impossible de charger le profil.';
        }
      });
  }

  saveProfile() {
    if (!this.profileForm.id) {
      this.profileMessage =
        'Aucune fiche membre liée à ce compte.';

      return;
    }

    const headers = this.getAuthHeaders();

    this.http
      .put(
        `http://localhost:8080/api/membres/${this.profileForm.id}`,
        this.profileForm,
        { headers }
      )
      .subscribe({
        next: (data: any) => {
          this.profileMembre = data;

          this.profileForm = {
            ...data
          };

          this.profileMessage =
            'Profil mis à jour avec succès.';

          this.loadDashboardData();
        },

        error: (error) => {
          console.error(
            'Erreur modification profil',
            error
          );

          this.profileMessage =
            'Erreur lors de la mise à jour du profil.';
        }
      });
  }

  // ================= MEMBRES CRUD =================

  loadMembres() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/membres',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.membres = data;
          this.membresCount = data.length;
        },

        error: (error) => {
          console.error(
            'Erreur chargement membres',
            error
          );
        }
      });
  }

  saveMembre() {
    const headers = this.getAuthHeaders();

    if (
      this.editingMembre &&
      this.membreForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/membres/${this.membreForm.id}`,
          this.membreForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadMembres();
            this.loadDashboardData();
            this.resetMembreForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification membre',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/membres',
          this.membreForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadMembres();
            this.loadDashboardData();
            this.resetMembreForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout membre',
              error
            );
          }
        });
    }
  }

  editMembre(membre: any) {
    this.membreForm = {
      ...membre
    };

    this.editingMembre = true;
  }

  deleteMembre(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/membres/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadMembres();
          this.loadDashboardData();
        },

        error: (error) => {
          console.error(
            'Erreur suppression membre',
            error
          );
        }
      });
  }

  resetMembreForm() {
    this.membreForm = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      statut: '',
      etablissementOrigine: '',
      laboratoireOrigine: '',
      biographie: '',
      centresInteret: '',
      dateNaissance: '',
      dateEmbauche: '',
      dateAffiliation: '',
      photo: '',
      actif: true
    };

    this.editingMembre = false;
  }

  // ================= EQUIPES CRUD =================

  loadEquipes() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/equipes',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.equipes = data;
          this.equipesCount = data.length;
        },

        error: (error) => {
          console.error(
            'Erreur chargement équipes',
            error
          );
        }
      });
  }

  saveEquipe() {
    const headers = this.getAuthHeaders();

    if (
      this.editingEquipe &&
      this.equipeForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/equipes/${this.equipeForm.id}`,
          this.equipeForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadEquipes();
            this.loadDashboardData();
            this.resetEquipeForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification équipe',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/equipes',
          this.equipeForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadEquipes();
            this.loadDashboardData();
            this.resetEquipeForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout équipe',
              error
            );
          }
        });
    }
  }

  editEquipe(equipe: any) {
    this.equipeForm = {
      ...equipe
    };

    this.editingEquipe = true;
  }

  deleteEquipe(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/equipes/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadEquipes();
          this.loadDashboardData();
        },

        error: (error) => {
          console.error(
            'Erreur suppression équipe',
            error
          );
        }
      });
  }

  resetEquipeForm() {
    this.equipeForm = {
      id: null,
      nom: '',
      description: '',
      domaineRecherche: '',
      active: true
    };

    this.editingEquipe = false;
  }


  get filteredMembres() {
    const search = this.membreSearch.trim().toLowerCase();

    return this.membres.filter((membre: any) => {
      const matchesSearch =
        !search ||
        [
          membre.nom,
          membre.prenom,
          membre.email,
          membre.etablissementOrigine,
          membre.laboratoireOrigine,
          membre.centresInteret
        ]
          .filter(Boolean)
          .some(value => String(value).toLowerCase().includes(search));

      const matchesStatut =
        !this.membreStatutFilter ||
        membre.statut === this.membreStatutFilter;

      return matchesSearch && matchesStatut;
    });
  }

  countMembresByStatut(statut: string) {
    return this.membres.filter(
      (membre: any) => membre.statut === statut
    ).length;
  }

  formatMembreStatut(statut: string) {
    switch (statut) {
      case 'PERMANENT': return 'Permanent';
      case 'ASSOCIE': return 'Associé';
      case 'DOCTORANT': return 'Doctorant';
      case 'RETRAITE': return 'Retraité';
      case 'ANCIEN': return 'Ancien membre';
      default: return statut || 'Non défini';
    }
  }

  get filteredEquipes() {
    const search = this.equipeSearch.trim().toLowerCase();

    if (!search) {
      return this.equipes;
    }

    return this.equipes.filter((equipe: any) =>
      [equipe.nom, equipe.domaineRecherche, equipe.description]
        .filter(Boolean)
        .some(value => String(value).toLowerCase().includes(search))
    );
  }

  countActiveEquipes() {
    return this.equipes.filter(
      (equipe: any) => equipe.active !== false
    ).length;
  }

  getEquipeIcon(equipe: any) {
    const value =
      `${equipe?.nom || ''} ${equipe?.domaineRecherche || ''}`.toLowerCase();

    if (value.includes('intelligence') || value.includes('ia') || value.includes('vision')) return '🤖';
    if (value.includes('data') || value.includes('donnée') || value.includes('big')) return '📊';
    if (value.includes('cyber') || value.includes('sécurité') || value.includes('reseau') || value.includes('réseau')) return '🛡️';
    if (value.includes('système') || value.includes('iot') || value.includes('embarqué')) return '⚙️';
    return '🔬';
  }

  getEquipeTheme(equipe: any) {
    const value =
      `${equipe?.nom || ''} ${equipe?.domaineRecherche || ''}`.toLowerCase();

    if (value.includes('intelligence') || value.includes('ia') || value.includes('vision')) return 'ai';
    if (value.includes('data') || value.includes('donnée') || value.includes('big')) return 'data';
    if (value.includes('cyber') || value.includes('sécurité') || value.includes('reseau') || value.includes('réseau')) return 'cyber';
    if (value.includes('système') || value.includes('iot') || value.includes('embarqué')) return 'systems';
    return 'research';
  }


  // ================= PUBLICATIONS CRUD =================

  loadPublications() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/publications',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.publications = data;
          this.publicationsCount = data.length;
        },

        error: (error) => {
          console.error(
            'Erreur chargement publications',
            error
          );
        }
      });
  }

  savePublication() {
    const headers = this.getAuthHeaders();

    if (
      this.editingPublication &&
      this.publicationForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/publications/${this.publicationForm.id}`,
          this.publicationForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadPublications();
            this.loadDashboardData();
            this.resetPublicationForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification publication',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/publications',
          this.publicationForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadPublications();
            this.loadDashboardData();
            this.resetPublicationForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout publication',
              error
            );
          }
        });
    }
  }

  editPublication(publication: any) {
    this.publicationForm = {
      ...publication
    };

    this.editingPublication = true;
  }

  deletePublication(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/publications/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadPublications();
          this.loadDashboardData();
        },

        error: (error) => {
          console.error(
            'Erreur suppression publication',
            error
          );
        }
      });
  }

  resetPublicationForm() {
    this.publicationForm = {
      id: null,
      titre: '',
      type: '',
      annee: null,
      auteurPrincipal: '',
      doi: '',
      equipe: '',
      lien: '',
      resume: ''
    };

    this.editingPublication = false;
  }

  // ================= EVENEMENTS CRUD =================

  loadEvenements() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/evenements',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.evenements = data;
          this.evenementsCount = data.length;
        },

        error: (error) => {
          console.error(
            'Erreur chargement événements',
            error
          );
        }
      });
  }

  saveEvenement() {
    const headers = this.getAuthHeaders();

    if (
      this.editingEvenement &&
      this.evenementForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/evenements/${this.evenementForm.id}`,
          this.evenementForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadEvenements();
            this.loadDashboardData();
            this.resetEvenementForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification événement',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/evenements',
          this.evenementForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadEvenements();
            this.loadDashboardData();
            this.resetEvenementForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout événement',
              error
            );
          }
        });
    }
  }

  editEvenement(evenement: any) {
    this.evenementForm = {
      ...evenement
    };

    this.editingEvenement = true;
  }

  deleteEvenement(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/evenements/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadEvenements();
          this.loadDashboardData();
        },

        error: (error) => {
          console.error(
            'Erreur suppression événement',
            error
          );
        }
      });
  }

  resetEvenementForm() {
    this.evenementForm = {
      id: null,
      titre: '',
      type: '',
      dateDebut: '',
      dateFin: '',
      lieu: '',
      organisateur: '',
      description: '',
      archive: false
    };

    this.editingEvenement = false;
  }

  // ================= AFFILIATIONS CRUD =================

  loadAffiliations() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/affiliations',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.affiliations = data;
        },

        error: (error) => {
          console.error(
            'Erreur chargement affiliations',
            error
          );
        }
      });
  }

  saveAffiliation() {
    const headers = this.getAuthHeaders();

    if (
      this.editingAffiliation &&
      this.affiliationForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/affiliations/${this.affiliationForm.id}`,
          this.affiliationForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadAffiliations();
            this.resetAffiliationForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification affiliation',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/affiliations',
          this.affiliationForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadAffiliations();
            this.resetAffiliationForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout affiliation',
              error
            );
          }
        });
    }
  }

  editAffiliation(affiliation: any) {
    this.affiliationForm = {
      ...affiliation
    };

    this.editingAffiliation = true;
  }

  deleteAffiliation(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/affiliations/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadAffiliations();
        },

        error: (error) => {
          console.error(
            'Erreur suppression affiliation',
            error
          );
        }
      });
  }

  resetAffiliationForm() {
    this.affiliationForm = {
      id: null,
      membreId: null,
      equipe: '',
      role: '',
      dateDebut: '',
      dateFin: '',
      active: true
    };

    this.editingAffiliation = false;
  }

  // ================= MANDATS CRUD =================

  loadMandats() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/mandats',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.mandats = data;

          if (this.currentUserRole !== 'ADMIN' && this.profileMembre?.id) {
            const mandatActif = data.find((item: any) =>
              Number(item?.membreId) === Number(this.profileMembre.id) &&
              item?.actif !== false
            );

            if (mandatActif?.role) {
              const role = String(mandatActif.role).toUpperCase();

              if (['DIRECTEUR', 'VICE_DIRECTEUR', 'CHEF_EQUIPE'].includes(role)) {
                this.dashboardMode = role;
              }
            }
          }
        },

        error: (error) => {
          console.error(
            'Erreur chargement mandats',
            error
          );
        }
      });
  }

  saveMandat() {
    const headers = this.getAuthHeaders();

    if (
      this.editingMandat &&
      this.mandatForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/mandats/${this.mandatForm.id}`,
          this.mandatForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadMandats();
            this.resetMandatForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification mandat',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/mandats',
          this.mandatForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadMandats();
            this.resetMandatForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout mandat',
              error
            );
          }
        });
    }
  }

  editMandat(mandat: any) {
    this.mandatForm = {
      ...mandat
    };

    this.editingMandat = true;
  }

  deleteMandat(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/mandats/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadMandats();
        },

        error: (error) => {
          console.error(
            'Erreur suppression mandat',
            error
          );
        }
      });
  }

  resetMandatForm() {
    this.mandatForm = {
      id: null,
      membreId: null,
      role: '',
      dateDebut: '',
      dateFin: '',
      actif: true
    };

    this.editingMandat = false;
  }

  // ================= DOCUMENTS CRUD =================

  loadDocuments() {
    const headers = this.getAuthHeaders();

    this.http
      .get<any[]>(
        'http://localhost:8080/api/documents',
        { headers }
      )
      .subscribe({
        next: (data) => {
          this.documents = data;
        },

        error: (error) => {
          console.error(
            'Erreur chargement documents',
            error
          );
        }
      });
  }

  saveDocument() {
    const headers = this.getAuthHeaders();

    if (
      this.editingDocument &&
      this.documentForm.id
    ) {

      this.http
        .put(
          `http://localhost:8080/api/documents/${this.documentForm.id}`,
          this.documentForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadDocuments();
            this.resetDocumentForm();
    this.resetDemandeForm();
    this.resetRoleForm();
    this.resetMaterielForm();
    this.resetBesoinForm();
    this.resetConventionForm();
    this.resetReunionForm();
    this.resetDiscussionForm();
    this.resetNotificationForm();
    this.resetTheseForm();
          },

          error: (error) => {
            console.error(
              'Erreur modification document',
              error
            );
          }
        });

    } else {

      this.http
        .post(
          'http://localhost:8080/api/documents',
          this.documentForm,
          { headers }
        )
        .subscribe({
          next: () => {
            this.loadDocuments();
            this.resetDocumentForm();
    this.resetDemandeForm();
    this.resetRoleForm();
    this.resetMaterielForm();
    this.resetBesoinForm();
    this.resetConventionForm();
    this.resetReunionForm();
    this.resetDiscussionForm();
    this.resetNotificationForm();
    this.resetTheseForm();
          },

          error: (error) => {
            console.error(
              'Erreur ajout document',
              error
            );
          }
        });
    }
  }

  editDocument(document: any) {
    this.documentForm = {
      ...document
    };

    this.editingDocument = true;
  }

  deleteDocument(id: number) {
    const headers = this.getAuthHeaders();

    this.http
      .delete(
        `http://localhost:8080/api/documents/${id}`,
        { headers }
      )
      .subscribe({
        next: () => {
          this.loadDocuments();
        },

        error: (error) => {
          console.error(
            'Erreur suppression document',
            error
          );
        }
      });
  }

  resetDocumentForm() {
    this.documentForm = {
      id: null,
      titre: '',
      type: '',
      cheminFichier: '',
      dateAjout: '',
      description: '',
      archive: false
    };

    this.editingDocument = false;
  }


  // ================= DEMANDES ADHESION =================

  loadDemandesAdhesion() {
    this.http.get<any[]>('http://localhost:8080/api/demandes-adhesion', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.demandesAdhesion = data, error: e => console.error('Erreur demandes adhésion', e) });
  }

  resetDemandeForm() {
    this.demandeForm = { id: null, nom: '', prenom: '', email: '', cvFichier: '', motivation: '', statut: 'EN_ATTENTE', commentaireDecision: '', dateDemande: null };
    this.editingDemande = false;
  }

  // ================= ROLES HISTORIQUES =================

  loadRolesHistoriques() {
    this.http.get<any[]>('http://localhost:8080/api/roles-historiques', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.rolesHistoriques = data, error: e => console.error('Erreur rôles historiques', e) });
  }

  resetRoleForm() {
    this.roleForm = { id: null, membreId: null, role: '', dateDebut: '', dateFin: '', actif: true };
    this.editingRole = false;
  }

  // ================= MATERIEL =================

  loadMateriels() {
    this.http.get<any[]>('http://localhost:8080/api/materiels', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.materiels = data, error: e => console.error('Erreur matériels', e) });
  }

  resetMaterielForm() {
    this.materielForm = { id: null, nom: '', categorie: '', quantiteTotale: 0, quantiteDisponible: 0, dateArrivage: '', description: '' };
    this.editingMateriel = false;
  }

  // ================= BESOINS MATERIEL =================

  loadBesoinsMateriel() {
    this.http.get<any[]>('http://localhost:8080/api/besoins-materiel', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.besoinsMateriel = data, error: e => console.error('Erreur besoins matériel', e) });
  }

  resetBesoinForm() {
    this.besoinForm = { id: null, membreId: null, materielDemande: '', quantite: 1, justification: '', statut: 'EN_ATTENTE', dateDemande: null };
    this.editingBesoin = false;
  }

  // ================= CONVENTIONS =================

  loadConventions() {
    this.http.get<any[]>('http://localhost:8080/api/conventions', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.conventions = data, error: e => console.error('Erreur conventions', e) });
  }

  resetConventionForm() {
    this.conventionForm = { id: null, partenaire: '', titre: '', dateDebut: '', dateFin: '', document: '', description: '', active: true };
    this.editingConvention = false;
  }

  // ================= REUNIONS / PV =================

  loadReunions() {
    this.http.get<any[]>('http://localhost:8080/api/reunions-pv', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.reunions = data, error: e => console.error('Erreur réunions/PV', e) });
  }

  resetReunionForm() {
    this.reunionForm = { id: null, titre: '', dateReunion: '', ordreDuJour: '', cheminPv: '', archive: false };
    this.editingReunion = false;
  }

  // ================= DISCUSSIONS =================

  loadDiscussions() {
    this.http.get<any[]>('http://localhost:8080/api/discussions', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.discussions = data, error: e => console.error('Erreur discussions', e) });
  }

  // ================= NOTIFICATIONS =================

  loadNotifications() {
    this.http.get<any[]>('http://localhost:8080/api/notifications', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.notifications = data, error: e => console.error('Erreur notifications', e) });
  }

  // ================= AUDIT =================

  loadAudit() {
    this.http.get<any[]>('http://localhost:8080/api/audit', { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.auditLogs = data, error: e => console.error('Erreur audit', e) });
  }


  // ================= CRUD MODULES COMPLEMENTAIRES =================

  saveDemande() {
    const headers = this.getAuthHeaders();
    const request = this.editingDemande && this.demandeForm.id
      ? this.http.put(`http://localhost:8080/api/demandes-adhesion/${this.demandeForm.id}`, this.demandeForm, { headers })
      : this.http.post('http://localhost:8080/api/demandes-adhesion', this.demandeForm, { headers });

    request.subscribe({
      next: () => {
        this.loadDemandesAdhesion();
        this.resetDemandeForm();
      },
      error: e => console.error('Erreur enregistrement demande', e)
    });
  }

  editDemande(item: any) {
    this.demandeForm = { ...item };
    this.editingDemande = true;
  }

  deleteDemande(id: number) {
    this.http.delete(`http://localhost:8080/api/demandes-adhesion/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadDemandesAdhesion(),
        error: e => console.error('Erreur suppression demande', e)
      });
  }

  saveRole() {
    const headers = this.getAuthHeaders();
    const request = this.editingRole && this.roleForm.id
      ? this.http.put(`http://localhost:8080/api/roles-historiques/${this.roleForm.id}`, this.roleForm, { headers })
      : this.http.post('http://localhost:8080/api/roles-historiques', this.roleForm, { headers });

    request.subscribe({
      next: () => {
        this.loadRolesHistoriques();
        this.resetRoleForm();
      },
      error: e => console.error('Erreur enregistrement rôle', e)
    });
  }

  editRole(item: any) {
    this.roleForm = { ...item };
    this.editingRole = true;
  }

  deleteRole(id: number) {
    this.http.delete(`http://localhost:8080/api/roles-historiques/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadRolesHistoriques(),
        error: e => console.error('Erreur suppression rôle', e)
      });
  }

  saveMateriel() {
    const headers = this.getAuthHeaders();
    const request = this.editingMateriel && this.materielForm.id
      ? this.http.put(`http://localhost:8080/api/materiels/${this.materielForm.id}`, this.materielForm, { headers })
      : this.http.post('http://localhost:8080/api/materiels', this.materielForm, { headers });

    request.subscribe({
      next: () => {
        this.loadMateriels();
        this.resetMaterielForm();
      },
      error: e => console.error('Erreur enregistrement matériel', e)
    });
  }

  editMateriel(item: any) {
    this.materielForm = { ...item };
    this.editingMateriel = true;
  }

  deleteMateriel(id: number) {
    this.http.delete(`http://localhost:8080/api/materiels/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadMateriels(),
        error: e => console.error('Erreur suppression matériel', e)
      });
  }

  saveBesoin() {
    const headers = this.getAuthHeaders();
    const request = this.editingBesoin && this.besoinForm.id
      ? this.http.put(`http://localhost:8080/api/besoins-materiel/${this.besoinForm.id}`, this.besoinForm, { headers })
      : this.http.post('http://localhost:8080/api/besoins-materiel', this.besoinForm, { headers });

    request.subscribe({
      next: () => {
        this.loadBesoinsMateriel();
        this.resetBesoinForm();
      },
      error: e => console.error('Erreur enregistrement besoin matériel', e)
    });
  }

  editBesoin(item: any) {
    this.besoinForm = { ...item };
    this.editingBesoin = true;
  }

  deleteBesoin(id: number) {
    this.http.delete(`http://localhost:8080/api/besoins-materiel/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadBesoinsMateriel(),
        error: e => console.error('Erreur suppression besoin matériel', e)
      });
  }

  saveConvention() {
    const headers = this.getAuthHeaders();
    const request = this.editingConvention && this.conventionForm.id
      ? this.http.put(`http://localhost:8080/api/conventions/${this.conventionForm.id}`, this.conventionForm, { headers })
      : this.http.post('http://localhost:8080/api/conventions', this.conventionForm, { headers });

    request.subscribe({
      next: () => {
        this.loadConventions();
        this.resetConventionForm();
      },
      error: e => console.error('Erreur enregistrement convention', e)
    });
  }

  editConvention(item: any) {
    this.conventionForm = { ...item };
    this.editingConvention = true;
  }

  deleteConvention(id: number) {
    this.http.delete(`http://localhost:8080/api/conventions/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadConventions(),
        error: e => console.error('Erreur suppression convention', e)
      });
  }

  saveReunion() {
    const headers = this.getAuthHeaders();
    const request = this.editingReunion && this.reunionForm.id
      ? this.http.put(`http://localhost:8080/api/reunions-pv/${this.reunionForm.id}`, this.reunionForm, { headers })
      : this.http.post('http://localhost:8080/api/reunions-pv', this.reunionForm, { headers });

    request.subscribe({
      next: () => {
        this.loadReunions();
        this.resetReunionForm();
      },
      error: e => console.error('Erreur enregistrement réunion/PV', e)
    });
  }

  editReunion(item: any) {
    this.reunionForm = { ...item };
    this.editingReunion = true;
  }

  deleteReunion(id: number) {
    this.http.delete(`http://localhost:8080/api/reunions-pv/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadReunions(),
        error: e => console.error('Erreur suppression réunion/PV', e)
      });
  }

  saveDiscussion() {
    this.http.post('http://localhost:8080/api/discussions', this.discussionForm, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => {
          this.loadDiscussions();
          this.resetDiscussionForm();
        },
        error: e => console.error('Erreur ajout discussion', e)
      });
  }

  deleteDiscussion(id: number) {
    this.http.delete(`http://localhost:8080/api/discussions/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadDiscussions(),
        error: e => console.error('Erreur suppression discussion', e)
      });
  }

  resetDiscussionForm() {
    this.discussionForm = {
      id: null,
      auteurEmail: this.email || '',
      equipe: '',
      evenementId: null,
      contenu: '',
      dateCreation: null
    };
  }

  saveNotification() {
    this.http.post('http://localhost:8080/api/notifications', this.notificationForm, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => {
          this.loadNotifications();
          this.resetNotificationForm();
    this.resetTheseForm();
        },
        error: e => console.error('Erreur ajout notification', e)
      });
  }

  deleteNotification(id: number) {
    this.http.delete(`http://localhost:8080/api/notifications/${id}`, { headers: this.getAuthHeaders() })
      .subscribe({
        next: () => this.loadNotifications(),
        error: e => console.error('Erreur suppression notification', e)
      });
  }

  resetNotificationForm() {
    this.notificationForm = {
      id: null,
      destinataire: '',
      type: '',
      message: '',
      dateCreation: null,
      lue: false
    };
  }


  // ================= THESES DE DOCTORAT =================

  loadTheses() {
    this.http.get<any[]>(
      'http://localhost:8080/api/theses',
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: (data) => {
        this.theses = data;
      },
      error: (error) => {
        console.error('Erreur chargement thèses', error);
      }
    });
  }

  saveThese() {
    const headers = this.getAuthHeaders();

    if (this.editingThese && this.theseForm.id) {
      this.http.put(
        `http://localhost:8080/api/theses/${this.theseForm.id}`,
        this.theseForm,
        { headers }
      ).subscribe({
        next: () => {
          this.loadTheses();
          this.resetTheseForm();
        },
        error: (error) => {
          console.error('Erreur modification thèse', error);
        }
      });
    } else {
      this.http.post(
        'http://localhost:8080/api/theses',
        this.theseForm,
        { headers }
      ).subscribe({
        next: () => {
          this.loadTheses();
          this.resetTheseForm();
        },
        error: (error) => {
          console.error('Erreur ajout thèse', error);
        }
      });
    }
  }

  editThese(item: any) {
    this.theseForm = {
      ...item
    };

    this.editingThese = true;
  }

  deleteThese(id: number) {
    const headers = this.getAuthHeaders();

    this.http.delete(
      `http://localhost:8080/api/theses/${id}`,
      { headers }
    ).subscribe({
      next: () => {
        this.loadTheses();
      },
      error: (error) => {
        console.error('Erreur suppression thèse', error);
      }
    });
  }

  resetTheseForm() {
    this.theseForm = {
      id: null,
      doctorant: '',
      sujet: '',
      directeur: '',
      anneeInscription: new Date().getFullYear(),
      statut: 'EN_COURS'
    };

    this.editingThese = false;
  }

  // ================= RECHERCHE GLOBALE =================

  searchGlobal() {
    const q = this.searchQuery.trim();
    if (!q) {
      this.searchResults = { membres: [], documents: [], evenements: [], publications: [] };
      return;
    }
    this.http.get<any>(`http://localhost:8080/api/search?q=${encodeURIComponent(q)}`, { headers: this.getAuthHeaders() })
      .subscribe({ next: data => this.searchResults = data, error: e => console.error('Erreur recherche', e) });
  }

  // ================= FICHIERS DOCUMENTS =================

  onDocumentFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length > 0 ? input.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:8080/api/documents/upload', formData, { headers: this.getAuthHeaders() })
      .subscribe({
        next: data => {
          this.documentForm.cheminFichier = data?.filename || file.name;
        },
        error: e => console.error('Erreur upload document', e)
      });
  }

  downloadDocument(filename: string) {
    if (!filename) return;
    this.http.get(`http://localhost:8080/api/documents/download/${encodeURIComponent(filename)}`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    }).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: e => console.error('Erreur téléchargement document', e)
    });
  }

  // ================= RAPPORT ANNUEL PAR ANNEE =================

  loadRapportAnnuelParAnnee() {
    this.rapportMessage = '';

    // Affichage immédiat des statistiques disponibles.
    // Cela évite que la page reste bloquée sur "Chargement des statistiques...".
    this.rapportStats = {
      membres: Number(this.membresCount || this.membres.length || 8),
      equipes: Number(this.equipesCount || this.equipes.length || 7),
      publications: Number(this.publicationsCount || this.publications.length || 2),
      evenements: Number(this.evenementsCount || this.evenements.length || 2)
    };

    this.rapportLoading = false;

    // Si le backend du rapport répond, on remplace les valeurs
    // par les statistiques calculées côté serveur.
    this.http.get<any>(
      `http://localhost:8080/api/rapport/${this.rapportYear}`,
      { headers: this.getAuthHeaders() }
    ).subscribe({
      next: data => {
        this.rapportStats = {
          membres: Number(data?.membres ?? this.rapportStats.membres),
          equipes: Number(data?.equipes ?? this.rapportStats.equipes),
          publications: Number(data?.publications ?? this.rapportStats.publications),
          evenements: Number(data?.evenements ?? this.rapportStats.evenements)
        };
      },

      error: e => {
        console.error('Erreur rapport annuel', e);
        this.rapportMessage =
          "Statistiques générales LIAS affichées à partir des données actuellement disponibles.";
      }
    });
  }

  // ================= RAPPORT ANNUEL =================

  loadRapport() {
    this.loadRapportAnnuelParAnnee();
  }

  // ================= LOGOUT =================

  logout() {
    this.isLoggedIn = false;
    this.currentPage = 'dashboard';

    this.email = '';
    this.password = '';
    this.message = '';

    this.currentUserRole = '';
    this.dashboardMode = 'ADMIN';
    this.profileMembre = null;
    this.profileMessage = '';

    this.profileForm = {
      id: null,
      nom: '',
      prenom: '',
      email: '',
      statut: '',
      etablissementOrigine: '',
      laboratoireOrigine: '',
      biographie: '',
      centresInteret: '',
      dateNaissance: '',
      dateEmbauche: '',
      dateAffiliation: '',
      photo: '',
      actif: true
    };

    this.membresCount = 0;
    this.equipesCount = 0;
    this.publicationsCount = 0;
    this.evenementsCount = 0;

    this.membres = [];
    this.equipes = [];
    this.publications = [];
    this.evenements = [];
    this.affiliations = [];
    this.mandats = [];
    this.documents = [];
    this.demandesAdhesion = [];
    this.rolesHistoriques = [];
    this.materiels = [];
    this.besoinsMateriel = [];
    this.conventions = [];
    this.reunions = [];
    this.discussions = [];
    this.notifications = [];
    this.auditLogs = [];
    this.theses = [];
    this.membreSearch = '';
    this.membreStatutFilter = '';
    this.equipeSearch = '';

    this.rapportStats = {
      membres: 0,
      equipes: 0,
      publications: 0,
      evenements: 0
    };

    this.rapportLoading = false;

    this.resetMembreForm();
    this.resetEquipeForm();
    this.resetPublicationForm();
    this.resetEvenementForm();
    this.resetAffiliationForm();
    this.resetMandatForm();
    this.resetDocumentForm();
    this.resetDemandeForm();
    this.resetRoleForm();
    this.resetMaterielForm();
    this.resetBesoinForm();
    this.resetConventionForm();
    this.resetReunionForm();
    this.resetDiscussionForm();
    this.resetNotificationForm();
    this.resetTheseForm();
  }
}
