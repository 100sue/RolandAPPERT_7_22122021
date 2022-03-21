<template>
    <footer>
        <div class="footer__contact">
          <p>Mentions légales</p>
          <a href="mailto:?to=email@example.com">Contact</a>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>
.footer__contact{
    justify-content: space-evenly;
    align-items: center;
    display: flex;
}
a{
    text-decoration: none;
    color: black;
}
</style>