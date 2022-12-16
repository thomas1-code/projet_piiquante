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