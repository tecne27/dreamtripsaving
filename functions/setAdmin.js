const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

try {
  admin.app();
} catch (e) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dreamtripsaving-e777e.firebaseio.com"
  });
}

const uid = 'wdVNiKNculdMn4XHLvdZOQosF1n1';

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('Custom claim "admin: true" definida com sucesso para o user!');
    process.exit();
  })
  .catch(error => {
    console.error('Erro ao definir custom claim:', error);
    process.exit(1);
  });


