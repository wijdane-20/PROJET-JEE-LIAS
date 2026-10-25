Projet LIAS - Gestion de laboratoire

Backend:
- Java 21
- Spring Boot
- PostgreSQL
- Port backend: 8080

Frontend:
- Angular
- Port frontend: 4200

Base de données:
- PostgreSQL
- Nom de la base: lias_db
- Sauvegarde: database/lias_db.backup

Lancement:
1. Démarrer PostgreSQL.
2. Lancer le backend Spring Boot.
3. Dans le frontend, exécuter: ng serve
4. Ouvrir: http://localhost:4200

Compte administrateur de démonstration:
Email: wijdanebenkhadir03@gmail.Com
Mot de passe: wijdane20

## Configuration de la base de données

Le backend utilise PostgreSQL.

Pour exécuter l'application, il faut créer une base de données PostgreSQL et configurer les paramètres de connexion dans le fichier `application.properties`.

Les identifiants et le mot de passe de la base de données doivent être renseignés localement.

## Exécution du projet

**Backend :** Ouvrir le projet Spring Boot dans IntelliJ IDEA et lancer `LiasApplication`.

**Frontend :** Ouvrir le projet Angular dans VS Code, exécuter `npm install`, puis `ng serve`.

Le frontend est accessible à l'adresse `http://localhost:4200`.