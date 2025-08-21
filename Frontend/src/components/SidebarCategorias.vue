<template>
  <aside class="sidebar">
    <h2>Categorias</h2>
    <ul>
      <li><a href="#">Ação</a></li>
      <li><a href="#">Aventura</a></li>
      <li><a href="#">Drama</a></li>
      <li><a href="#">Fantasia</a></li>
      <li><a href="#">Romance</a></li>
      <li><a href="#">Cooperativo</a></li>
      <li><a href="#">Esportes</a></li>
      <li><a href="#">Estratégia</a></li>
      <li><a href="#">Luta</a></li>
      <li><a href="#">Terror</a></li>
      <li><a href="#">Simulador</a></li>
      <li><a href="#">RPG</a></li>
      <li><a href="#">Indie</a></li>
      <li><a href="#">Corrida</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'SidebarCategorias'
}
</script>

<style scoped>
.sidebar {
  width: 220px;
  margin-top: 20px;
  margin: 20px;
  background-color: #423261;
  color: white;
  padding: 30px;
  flex-shrink: 0;
  height: 70vh;
  border-radius: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.sidebar h2 {
  font-size: 20px;
  margin-bottom: 30px;
  color: white;
}

.sidebar ul {
  list-style: none;
  padding-left: 0;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
}

.sidebar ul li a:hover {
  text-decoration: underline;
}
</style>
