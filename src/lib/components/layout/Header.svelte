<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { afterNavigate } from '$app/navigation';
    import { browser } from '$app/environment';

    let isOpen = $state(false);
    let scrollY = $state(0);

    function toggleMenu() {
        isOpen = !isOpen;
    }

    afterNavigate(() => {
        isOpen = false;
        setTimeout(() => {
            document.documentElement.scrollTop = 0;
        }, 10);
    });

    let logoOpacity = $derived(browser ? Math.max(0, 1 - scrollY / 100) : 1);
</script>

<svelte:window bind:scrollY />

<header class="header">
    <div class="container container--full">
        <div class="flex flex--items-center flex--justify-between">
            <a href="/" class="header__brand" title="Teddy's Ladder A Prep School for Elementary">
                <img width="240" height="77" src="/teddys-ladder-logo.svg" alt="Teddy's Ladder A Prep School for Elementary" style="opacity: {logoOpacity};">
            </a>
            <div class="header__actions flex flex--items-center gap-0_5">
                <nav id="primary-nav" class="header__nav flex flex--column flex--justify-end gap-3" class:open={isOpen}>
                    <ul>
                        <li class="text-align-right">
                            <a href="/">Home</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/programs">Programs</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/campus">Campus</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/about-teddys-ladder">About Teddy's Ladder</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/calendar-and-newsletter">Calendar & Newsletter</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/fun-and-celebrations">Fun & Celebrations</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/testimonials">Testimonials</a>
                        </li>
                        <li class="text-align-right">
                            <a href="/registration">Registration</a>
                        </li>
                    </ul>
                    <div class="header__nav__subnav text-align-right">
                        <a href="/privacy-policy">Privacy Policy</a>
                    </div>
                </nav>
                <div class="header__schedule-tour-button">

                    <Button
                        href="/schedule-a-tour"
                        text="Schedule A Tour"
                        class={isOpen ? 'open' : ''}
                    />

                </div>
                <a
                    class="header__schedule-tour-icon"
                    aria-label="Schedule A Tour"
                    href="/schedule-a-tour"
                    >
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="52" height="52" rx="26" fill="#1DA1F2"/>
                        <path d="M19.5 17.7445H32.5C34.1569 17.7445 35.5 19.0877 35.5 20.7445V32.5004C35.4998 34.1571 34.1567 35.5004 32.5 35.5004H19.5C17.8433 35.5004 16.5002 34.1571 16.5 32.5004V20.7445C16.5 19.1394 17.7606 17.8287 19.3457 17.7484L19.5 17.7445Z" stroke="white" stroke-width="2"/>
                        <line x1="15.7265" y1="22.864" x2="36.253" y2="22.864" stroke="white" stroke-width="2"/>
                        <circle cx="21.0013" cy="26.7654" r="1.32541" fill="white"/>
                        <circle cx="25.9898" cy="26.7654" r="1.32541" fill="white"/>
                        <circle cx="30.9784" cy="26.7654" r="1.32541" fill="white"/>
                        <circle cx="21.0013" cy="31.5621" r="1.32541" fill="white"/>
                        <circle cx="25.9898" cy="31.5621" r="1.32541" fill="white"/>
                        <circle cx="30.9784" cy="31.5621" r="1.32541" fill="white"/>
                        <path d="M19.6758 16.8254C19.6758 16.0934 20.2692 15.5 21.0013 15.5V15.5C21.7333 15.5 22.3267 16.0934 22.3267 16.8254V18.7304C22.3267 19.4624 21.7333 20.0558 21.0013 20.0558V20.0558C20.2692 20.0558 19.6758 19.4624 19.6758 18.7304V16.8254Z" fill="white"/>
                        <path d="M29.653 16.8254C29.653 16.0934 30.2464 15.5 30.9784 15.5V15.5C31.7104 15.5 32.3038 16.0934 32.3038 16.8254V18.7304C32.3038 19.4624 31.7104 20.0558 30.9784 20.0558V20.0558C30.2464 20.0558 29.653 19.4624 29.653 18.7304V16.8254Z" fill="white"/>
                    </svg>
                </a>
                <button
                    class="header__nav-toggle"
                    class:open={isOpen}
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    onclick={toggleMenu}
                >
                    <span class="hamburger">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="52" height="52" rx="26" fill="#1DA1F2"/>
                        <line x1="15.2476" y1="17.3197" x2="36.7524" y2="17.3197" stroke="white" stroke-width="2"/>
                        <path d="M15.2476 25.488H36.7525" stroke="white" stroke-width="2"/>
                        <path d="M15.2476 33.6803H26" stroke="white" stroke-width="2"/>
                        </svg>
                    </span>
                    <span class="close">
                        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="52" height="52" rx="26" fill="#1DA1F2"/>
                        <line x1="15.9547" y1="16.0708" x2="35.0148" y2="35.131" stroke="white" stroke-width="2"/>
                        <path d="M16.0508 34.9327L34.8215 16.1619" stroke="white" stroke-width="2"/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</header>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.header {
    position: fixed;
    padding-block: a.$sp-0_5;
    z-index: 999;
    inset: 0 0 auto 0;
    
    &__brand {
        width: clamp(9rem, 6.887323943661972rem + 9.014084507042252vw, 15rem);
        height: auto;

        img {
            width: 100%;
            height: auto;
            transition: opacity 150ms ease-out;
        }
    }

    &__nav {
        position: fixed;
        inset: 0;
        background-color: a.$clr-primary;
        padding: clamp(1rem, -0.7605633802816902rem + 7.511737089201878vw, 6rem);
        color: a.$clr-white;
        transform: translateX(100%);
        transition: transform 300ms ease;
        backdrop-filter: blur(20px);

        @include a.min(md) {
            inset: 0 0 0 auto;
        }

        &.open {
            transform: translateX(0);
        }

            &-toggle {
            position: relative;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 52px;
            height: 52px;
            background-color: #1DA1F2;
            border-radius: 26px;
            cursor: pointer;

            span {
                position: absolute;
                transition: opacity 300ms ease-out;
            }

            .hamburger {
                opacity: 1;
            }

            .close {
                opacity: 0;
            }

            &.open {
                .hamburger {
                    opacity: 0;
                }
                .close {
                    opacity: 1;
                }
            }
        }
        
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            
            li {
                padding-block: a.$sp-0_5;
                a {
                    font-size: a.$fs-h3;
                    color: inherit;
                    font-weight: a.$fw-700;
                    text-decoration: none;
                    line-height: a.$lh-sm;
                }
            }
        }
        a {
            color: inherit;
        }
    }

    &__schedule-tour-button {
        display: none;
        @include a.min(md) {
            display: block;
        }
    }
    
    &__schedule-tour-icon {
        position: relative;
        @include a.min(md) {
            display: none;
        }
    }
}
</style>
