const fetch = require('node-fetch');
const WebSocket = require('ws');
const server = require('./index');

// serveur ws
const wss = new WebSocket.Server({server});

// Event de connection d'un client
wss.on('connection', ws => {
    console.log('nouveau yencli connecté');

    // Event lorsque le client reçoit le message
    ws.on('message', async message => {
        console.log('message reçu => ${message}');

        try {
            // parse du message reçu
            const command = JSON.parse(message)

            // Commande de démarrage du flux vidéo
            if (command.cmd === 9) {
                // flux video start
                try {
                    // Voir pour l'api de la cam
                    const response = await fetch('http://4000/camera/start', {
                        method: 'POST',
                    });
                    const data = await response.json();
                    // envoi de la réponse au client avec les données de la cam
                    ws.send(JSON.stringify({
                        response: 'lancement de la cam',
                        // videoURL : 'http://4000/stream', // url fictive du flux de le cam
                        responseCamera: data
                    }));
                } catch(error) {
                    console.error('le lancement de la cam marche pas');
                    // envoi de la réponse au client si erreur
                    ws.send(JSON.stringify({
                        response: 'le lancement de la cam marche pas',
                        error: error.message
                    }));
                }
              
            // Commande de fermeture du flux vidéo
            } else if (command.cmd === 10) {
                // flux video stop
                try {
                    // Voir pour l'api de la cam
                    const response = await fetch('http://4000/camera/stop', {
                        method: 'POST',
                    });
                    const data = await response.json();
                    // envoi de la réponse au client avec les données de la cam
                    ws.send(JSON.stringify({
                        response: 'la cam se stop',
                        responseCamera: data
                    }));
                } catch(error) {
                    console.log('la cam de se trop pas');
                    // envoi de la réponse au client si erreur
                    ws.send(JSON.stringify({
                        response: 'la cam de se trop pas',
                        error: error.message
                    }));
                }
            }
        } catch(e) {
            // log des erreurs
            console.error('ya une erreur de json chef', e);
            ws.send(JSON.stringify({
                response: 'erreur de JSON la'
            }));
        }
    });

    // Event de déconnection d'un client
    ws.on('close', () => {
        // log du client qui est déconnecté
        console.log('le yencli est déco');
    })
});