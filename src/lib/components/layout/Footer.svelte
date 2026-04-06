<footer class="footer">
    <div class="container">
        <div class="grid grid--cols-2 lg:grid--cols-12 gap-0_5 row-gap-2">
            <div class="footer__brand">
                <img src="/teddys-ladder-logo.svg" alt="">
            </div>
            <div class="footer__nav grid grid--cols-2 md:grid--cols-6 gap-0_5">
                <div class="footer__nav__column flex flex--column">
                    <a href="/" class="footer__nav__link">Home</a>
                    <a href="/" class="footer__nav__link">Programs</a>
                    <a href="/" class="footer__nav__link">Campus</a>
                </div>
                <div class="footer__nav__column flex flex--column">
                    <a href="/" class="footer__nav__link">About Us</a>
                    <a href="/" class="footer__nav__link">Fun & Celebrations</a>
                    <a href="/" class="footer__nav__link">Calendar & Newsletter</a>
                </div>
                <div class="footer__nav__column flex flex--column">
                    <a href="/" class="footer__nav__link">Testimonials</a>
                    <a href="/" class="footer__nav__link">Registration</a>
                    <a href="/" class="footer__nav__link">Privacy Policy</a>
                </div>
            </div>
        </div>
        <div class="footer__bar flex flex--items-center flex--justify-between">
            <p class="footer__copyright">© 2026 Teddy's Ladder. All rights reserved.</p>
            <div class="footer__social">
                <a href="https://www.facebook.com/SiennaKidsAcademy/" class="footer__social__link" target="_blank" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#002157"/>
                    <path d="M13.0567 17.5959V25.4358H17.3324V17.5959H20.5207L21.1841 13.991H17.3324V12.7157C17.3324 10.8101 18.0806 10.0803 20.012 10.0803C20.6128 10.0803 21.0957 10.0951 21.3758 10.1245V6.85515C20.8487 6.7114 19.5586 6.56396 18.8141 6.56396C14.8739 6.56396 13.0567 8.42534 13.0567 12.4393V13.991H10.624V17.5959H13.0567Z" fill="white"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</footer>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.footer {
    padding-block: a.$sp-section;

    &__brand {
        width: clamp(7.5rem, 5.73943661971831rem + 7.511737089201878vw, 12.5rem);
        height: auto;

        @include a.min(lg) {
            grid-column: span 2;
        }
    }
    &__nav {
        grid-row-start: 2;
        grid-column-start: 1;
        grid-column-end: 3;

        @include a.min(lg) {
            grid-row-start: 1;
            grid-column-start: 7;
            grid-column-end: 13;
        }

        &__column {
             @include a.min(md) {
                grid-column: span 2;
            }
        }

        &__link {
            color: inherit;
            font-size: a.$fs-sm;
            text-decoration: none;
        }
    }

    &__bar {
        background-color: a.$clr-pastel-secondary;
        padding: a.$sp-1;
        margin-top: a.$sp-section;
        border-radius: a.$br-1;
    }
    
    &__copyright {
        font-size: a.$fs-sm;
        margin-bottom: 0;
    }
}
</style>