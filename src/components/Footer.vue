<template>
    <footer class="footer">
      <div class="page-up">
        <a href="#" id="scrollToTopButton">
          <span class="arrow_carrot-up"></span>
        </a>
      </div>
  
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="footer__logo">
              <a href="/"><img src="/img/gamelinklogo.png" alt="Logo" /></a>
            </div>
          </div>
  
          <div class="col-lg-6">
            <div class="footer__nav">
              <ul>
                <li class="active"><a href="/">Início</a></li>
                <li><a href="/categories.html">Categorias</a></li>
                <li><a href="/blog.html">Nosso Blog</a></li>
                <li><a href="#">Contatos</a></li>
              </ul>
            </div>
          </div>
  
          <div class="col-lg-3">
            <p>
              &copy; {{ currentYear }} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const currentYear = new Date().getFullYear()
  </script>