let promedioMateria = document.getElementById('promedioMateria').value;
let registroAsesorForm = document.getElementById('registroAsesor');

registroAsesorForm.addEventListener('submit', function(e) {
    if(promedioMateria < 9) {
        alert('Lo sentimos. El promedio debe ser mayor a 9.')
        e.preventDefault();
    }
});