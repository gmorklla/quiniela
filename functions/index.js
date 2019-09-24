const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.pronostico = functions.https.onRequest(async (request, response) => {
  const {
    usuario,
    local,
    visitante,
    pronostico,
    photo
  } = request.query;
  const resultado = pronostico === 'l' ? local : pronostico === 'v' ? visitante : 'empate';
  const msg = `${usuario}: ${local} vs ${visitante} = ${resultado}`;
  const payload = {
    notification: {
      title: 'Nuevo pronóstico',
      body: msg,
      icon: photo
    }
  };

  await db.collection('fcmTokens').get()
    .then(token => {
      const docs = token.docs;
      const tknArr = [];
      docs.forEach(doc => {
        tknArr.push(admin.messaging().sendToDevice(doc.get('token'), payload));
      })
      return Promise.all(tknArr)
    })
    .then(_ => {
      console.log("Sent Successfully");
      return 'Success!';
    })
    .catch(err => {
      console.log(err);
    });
  response.status(200).json('Ok');
});
