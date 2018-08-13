// Se inicializa firebase
window.visitorRegistration = {
  initializeFirebase: () => {
    firebase.initializeApp({
      apiKey: 'AIzaSyCsiVpy51uveEfSALI5eonaTBASpjjDwx8',
      authDomain: 'registro-de-visitas-5f008.firebaseapp.com',
      databaseURL: 'https://registro-de-visitas-5f008.firebaseio.com',
      projectId: 'registro-de-visitas-5f008',
      storageBucket: 'registro-de-visitas-5f008.appspot.com',
      messagingSenderId: '586868443204'
    });
  },

  // Registro de Administrador
  registerAdmin: (emailAdmin, passwordAdmin) => {
    // Función de firebase para crer usuario tomando como parametros email y contraseña
    firebase.auth().createUserWithEmailAndPassword(emailAdmin, passwordAdmin)
      .then(result => {
        // Se muestra una alerta exitosa
        swal({
          confirmButtonText: 'Aceptar',
          type: 'success',
          title: 'Su registro fue exitoso',
          text: 'Ya tiene un nuevo usuario'
        });
      })
      .catch(error => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          // Se muestra alerta de error si algun dato fue incorrecto
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Contraseña inválida',
            text: 'Inténtalo de nuevo'
          });
        } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Usuario inválido',
            text: 'Inténtalo de nuevo'
          });
        } else if (errorCode === 'auth/email-already-in-use') {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Usuario ya registrado',
            text: 'Verifica tus datos'
          }); 
        }
      });
  },

  // Se crea acceso para administrador
  loginAdmin: (emailAdmin, passwordAdmin) => {
    // Función de firebase para comprobar usuario logeado 
    firebase.auth().signInWithEmailAndPassword(emailAdmin, passwordAdmin)
      .then((result) => {
        // Si los datos son correctos se le enviara a rata página
        location.href = ('admin.html');
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Contraseña inválida',
            text: 'Inténtalo de nuevo'
          });
        } else if (errorCode === 'auth/user-not-found' || errorCode === 'auth/invalid-email') {
          swal({
            confirmButtonText: 'Aceptar',
            type: 'error',
            title: 'Usuario inválido',
            text: 'Inténtalo de nuevo'
          });
        }
      });
  },
  
  // Cerrar sesión
  signOut: () => {
    // Función de firebase para cerrar sesión
    firebase.auth().signOut()
      .then(result =>{
        // Enviara al usuario a la página principal (login 'index.html')
        location.href = ('../index.html');
      }).catch(error =>{
        console.log('Error al cerrar sesión', error);
      });
  } 
  
};
