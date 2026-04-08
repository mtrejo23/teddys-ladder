<script>
    import { page } from '$app/stores';
</script>

<div class="error-container">
    <h1>{$page.status}</h1>
    <p>{$page.error?.message}</p>
    <a href="/">Go home</a>
</div>

<style lang="scss">
@use '$lib/styles/abstracts' as a;

.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: clamp(700px, 100dvh, 900px);
    font-family: sans-serif;
}

h1 {
    font-size: 6rem;
    margin: 0;
}

p {
    font-size: 1.5rem;
}

a {
    margin-top: 1rem;
    font-size: 1.1rem;
}
</style>