<!-- <template>
    <div>
    <section class="product spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-8" style="border: 2px solid red;">
                </div>
                <div class="col-lg-4 col-md-12" style="border: 2px solid blue;">
                
                <Sidebar />
                </div>
                <div class="col-lg-8 col-md-8" style="border: 2px solid red;">
                </div>

            </div>
        </div>
    </section>
</div>
</template> -->
<template>
  <div class="wrapper">
    <!-- Sidebar de Categorias -->
    <SidebarCategorias />

    <!-- Conteúdo principal -->
    <div class="content">
      <section class="product spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-8" style="border: 2px solid red;">
              <!-- Conteúdo à esquerda da seção -->
            </div>
            <div class="col-lg-4 col-md-12" style="border: 2px solid blue;">
              <Sidebar />
            </div>
            <div class="col-lg-8 col-md-8" style="border: 2px solid red;">
              <!-- Outro conteúdo -->
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import SidebarCategorias from '../components/SidebarCategorias.vue'

export default {
  components: {
    Sidebar,
    SidebarCategorias
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
}

.content {
  flex: 1;
}
</style>

