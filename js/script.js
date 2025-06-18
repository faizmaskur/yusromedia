// Dropdown Menu
document.addEventListener('DOMContentLoaded', () => {
    const productMenu = document.querySelector('.product-menu');
    const submenu = document.querySelector('.submenu');

    productMenu.addEventListener('click', (e) => {
        e.preventDefault();
        submenu.classList.toggle('active');
    });

    // Tutup dropdown jika klik di luar
    document.addEventListener('click', (e) => {
        if (!productMenu.contains(e.target) && !submenu.contains(e.target)) {
            submenu.classList.remove('active');
        }
    });
});

// Fungsi WhatsApp
function sendWhatsApp(product) {
    const phoneNumber = "6283837017668";
    const message = encodeURIComponent(`Saya ingin memesan ${product}`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}
