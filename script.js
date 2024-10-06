document.querySelector('.button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#cv').scrollIntoView({ behavior: 'smooth' });
});
