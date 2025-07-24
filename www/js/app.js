document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova is ready!');
    
    // Géolocalisation
    getCurrentLocation();
    
    // Gestion des formulaires
    setupForms();
    
    // Simulation de données météo
    simulateWeatherData();
}

function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            // Ici vous feriez une requête à une API pour obtenir le nom de la localité
            // Pour l'exemple, nous utilisons une valeur fixe
            updateLocationUI('Dakar');
        },
        function(error) {
            console.error('Erreur de géolocalisation:', error);
            updateLocationUI('Dakar'); // Valeur par défaut
        },
        { enableHighAccuracy: true }
    );
}

function updateLocationUI(locationName) {
    const locationElement = document.getElementById('current-location');
    if (locationElement) {
        locationElement.textContent = locationName;
    }
}

function setupForms() {
    // Initialisation Firebase
    const firebaseConfig = {
        apiKey: "VOTRE_CLE_API",
        authDomain: "VOTRE_PROJET.firebaseapp.com",
        projectId: "VOTRE_PROJET",
        storageBucket: "VOTRE_PROJET.appspot.com",
        messagingSenderId: "VOTRE_SENDER_ID",
        appId: "VOTRE_APP_ID"
    };
    
    // Initialiser Firebase
    Firebase.initializeApp(firebaseConfig);

    // Gestion connexion
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            try {
                await Firebase.auth().signInWithEmailAndPassword(email, password);
                alert('Connexion réussie!');
                window.location.href = 'index.html';
            } catch (error) {
                alert('Erreur: ' + error.message);
            }
        });
    }

    // Gestion inscription
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            
            if (password !== document.getElementById('register-confirm').value) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }

            try {
                await Firebase.auth().createUserWithEmailAndPassword(email, password);
                // Enregistrer les infos supplémentaires dans Firestore
                await Firebase.firestore().collection('users').doc(Firebase.auth().currentUser.uid).set({
                    name: document.getElementById('register-name').value,
                    region: document.getElementById('register-region').value,
                    createdAt: Firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('Inscription réussie!');
                window.location.href = 'index.html';
            } catch (error) {
                alert('Erreur: ' + error.message);
            }
        });
    }
}
    // Formulaire d'inscription
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            const region = document.getElementById('register-region').value;
            
            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas!');
                return;
            }
            
            // Ici, vous feriez une requête à votre backend
            console.log('Inscription avec:', name, email, password, region);
            alert('Inscription en cours...');
        });
    }
    
    // Formulaire d'alerte
    const alertForm = document.getElementById('alert-form');
    if (alertForm) {
        alertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const region = document.getElementById('alert-region').value;
            const alertType = document.getElementById('alert-type').value;
            const message = document.getElementById('alert-message').value;
            
            // Ici, vous feriez une requête à votre backend
            console.log('Nouvelle alerte:', region, alertType, message);
            alert('Alerte envoyée!');
            
            // Réinitialiser le formulaire
            alertForm.reset();
        });
    }
}

function simulateWeatherData() {
    // Cette fonction simule des données météo
    // En réalité, vous feriez une requête à une API météo
    
    // Météo actuelle
    const weatherIcon = document.querySelector('.weather-icon i');
    if (weatherIcon) {
        const now = new Date();
        const hours = now.getHours();
        
        if (hours >= 6 && hours < 18) {
            weatherIcon.className = 'fas fa-sun';
            weatherIcon.style.color = '#f39c12';
            document.querySelector('.weather-info .description').textContent = 'Ensoleillé';
        } else {
            weatherIcon.className = 'fas fa-moon';
            weatherIcon.style.color = '#3498db';
            document.querySelector('.weather-info .description').textContent = 'Nuit claire';
        }
    }
    
    // Prévisions
    const preventionItems = document.querySelectorAll('.prevention-item');
    if (preventionItems.length > 0) {
        const now = new Date();
        const day = now.getDay();
        
        if (day === 0 || day === 6) {
            // Week-end
            preventionItems[0].querySelector('p').textContent = 'Températures élevées ce week-end (38-40°C)';
            preventionItems[1].querySelector('p').textContent = 'Activités extérieures déconseillées entre 12h et 16h';
        } else {
            // Semaine
            preventionItems[0].querySelector('p').textContent = 'Vague de chaleur prévue entre 12h et 16h';
            preventionItems[1].querySelector('p').textContent = 'Vent fort sur la côte (25-30 km/h)';
        }
    }
}

// Navigation entre les pages
function navigateTo(page) {
    window.location.href = page;
}