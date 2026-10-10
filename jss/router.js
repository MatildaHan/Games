const gameFrame = document.getElementById('gameFrame');
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const game = btn.dataset.game;
        gameFrame.src = `games/${game}.html`;
    });
});