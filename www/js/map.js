// Initialisation de la carte
function initMap() {
    // Coordonnées approximatives du Sénégal
    const senegalCoords = [14.4974, -14.4524];
    
    // Création de la carte
    const map = L.map('senegal-map').setView(senegalCoords, 7);
    
    // Ajout du fond de carte (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Régions du Sénégal avec leurs coordonnées approximatives
    const regions = [
        { name: 'Dakar', coords: [14.7167, -17.4677], temp: '28°C', max: '32°C', min: '25°C', humidity: '65%', alerts: 'Vague de chaleur prévue' },
        { name: 'Thiès', coords: [14.791, -16.9356], temp: '27°C', max: '31°C', min: '24°C', humidity: '70%', alerts: 'Aucune alerte' },
        { name: 'Saint-Louis', coords: [16.0333, -16.5], temp: '26°C', max: '30°C', min: '23°C', humidity: '75%', alerts: 'Vent fort attendu' },
        { name: 'Diourbel', coords: [14.6561, -16.2324], temp: '30°C', max: '35°C', min: '27°C', humidity: '60%', alerts: 'Fortes chaleurs' },
        { name: 'Tambacounda', coords: [13.7689, -13.6673], temp: '32°C', max: '38°C', min: '28°C', humidity: '55%', alerts: 'Risque de sécheresse' },
        { name: 'Kaolack', coords: [14.15, -16.0833], temp: '29°C', max: '34°C', min: '26°C', humidity: '68%', alerts: 'Aucune alerte' },
        { name: 'Ziguinchor', coords: [12.5833, -16.2667], temp: '27°C', max: '30°C', min: '25°C', humidity: '80%', alerts: 'Pluies localisées' },
        { name: 'Kolda', coords: [12.8833, -14.95], temp: '31°C', max: '36°C', min: '27°C', humidity: '62%', alerts: 'Températures élevées' },
        { name: 'Matam', coords: [15.6559, -13.2554], temp: '33°C', max: '39°C', min: '29°C', humidity: '50%', alerts: 'Alerte canicule' },
        { name: 'Fatick', coords: [14.3333, -16.4167], temp: '28°C', max: '32°C', min: '25°C', humidity: '72%', alerts: 'Aucune alerte' },
        { name: 'Kaffrine', coords: [14.1167, -15.7], temp: '30°C', max: '35°C', min: '26°C', humidity: '65%', alerts: 'Chaleurs intenses' },
        { name: 'Kédougou', coords: [12.55, -12.1833], temp: '34°C', max: '40°C', min: '30°C', humidity: '58%', alerts: 'Alerte canicule' },
        { name: 'Sédhiou', coords: [12.7, -15.5667], temp: '29°C', max: '33°C', min: '26°C', humidity: '75%', alerts: 'Aucune alerte' }
    ];
    
    // Ajout des marqueurs pour chaque région
    regions.forEach(region => {
        const marker = L.marker(region.coords).addTo(map)
            .bindPopup(`<b>${region.name}</b><br>Température: ${region.temp}`);
        
        marker.on('click', function() {
            showRegionInfo(region);
        });
    });
    
    // Gestion du panneau d'information
    const regionInfo = document.getElementById('region-info');
    const closeBtn = document.getElementById('close-info');
    
    closeBtn.addEventListener('click', function() {
        regionInfo.classList.remove('active');
    });
    
    function showRegionInfo(region) {
        document.getElementById('region-name').textContent = region.name;
        document.querySelector('.weather-summary .temp').textContent = region.temp;
        document.querySelector('.weather-summary .description').textContent = getWeatherDescription(region.temp);
        document.querySelectorAll('.weather-details .detail')[0].querySelector('span').textContent = `Max: ${region.max}`;
        document.querySelectorAll('.weather-details .detail')[1].querySelector('span').textContent = `Min: ${region.min}`;
        document.querySelectorAll('.weather-details .detail')[2].querySelector('span').textContent = `Humidité: ${region.humidity}`;
        document.getElementById('region-alerts').textContent = region.alerts;
        
        regionInfo.classList.add('active');
    }
    
    function getWeatherDescription(temp) {
        const tempValue = parseInt(temp);
        if (tempValue >= 35) return 'Très chaud';
        if (tempValue >= 30) return 'Chaud';
        if (tempValue >= 25) return 'Doux';
        if (tempValue >= 20) return 'Agréable';
        return 'Fraîche';
    }
}

// Initialiser la carte quand la page est chargée
document.addEventListener('DOMContentLoaded', initMap);