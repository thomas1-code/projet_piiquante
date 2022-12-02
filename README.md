# HotTakes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# API Errors

Les erreurs éventuelles doivent être renvoyées telles qu'elles sont produites, sans
modification ni ajout. 

# API Routes

Toutes les routes sauce pour les sauces doivent disposer d’une autorisation (le
token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token> »).
Avant que l'utilisateur puisse apporter des modifications à la route sauce, le code
doit vérifier si l'userId actuel correspond à l'userId de la sauce. Si l'userId ne
correspond pas, renvoyer « 403: unauthorized request. » Cela permet de s'assurer
que seul le propriétaire de la sauce peut apporter des modifications à celle-ci.

# Exigences de sécurité

● Le mot de passe de l'utilisateur doit être haché.
● L'authentification doit être renforcée sur toutes les routes sauce requises.
● Les adresses électroniques dans la base de données sont uniques et un
plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler
les erreurs.
● La sécurité de la base de données MongoDB (à partir d'un service tel que
MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.
● Un plugin Mongoose doit assurer la remontée des erreurs issues de la base
de données.
● Les versions les plus récentes des logiciels sont utilisées avec des correctifs
de sécurité actualisés.
● Le contenu du dossier images ne doit pas être téléchargé sur GitHub.