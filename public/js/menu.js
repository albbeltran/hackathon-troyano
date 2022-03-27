window.addEventListener('load', function() {
    let profile = document.getElementById('profile');
    let profileOptions = document.getElementById('profile-options');

    profile.addEventListener('click', function() {
        if(profileOptions.style.display == 'none'){
            profileOptions.style.display = 'block';
        } else {
            profileOptions.style.display = 'none';
        }
    });
});