const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    butInstall.style.visibility = 'visible';
});

butInstall.addEventListener('click', async (event) => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
});

window.addEventListener('appinstalled', (event) => {
    textHeader.textContent = 'Successfully installed. Enjoy!';
    console.log('appinstalled', event);
});
