<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <div class="col-lg-2">
          <div class="header__logo">
            <a href="/"><img src="/img/gamelinklogo.png" alt="Logo" /></a>
          </div>
        </div>
        <div class="col-lg-8">
          <div class="header__nav">
            <nav class="header__menu mobile-menu">
              <ul>
                <li class="active"><a href="/">Início</a></li>
                <li>
                  <a href="#">Categorias <span class="arrow_carrot-down"></span></a>
                  <ul class="dropdown">
                    <li><a href="/categories.html">Categorias</a></li>
                    <li><a href="/anime-details.html">Anime Details</a></li>
                    <li><a href="/blog-details.html">Blog Details</a></li>
                    <li><a href="/login">Login</a></li>
                  </ul>
                </li>
                <li><a href="/blog.html">Nosso Blog</a></li>
                <li><a href="#">Contatos</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="col-lg-2">
          <div class="header__right">
            <a href="#" class="search-switch"><span class="icon_search"></span></a>
            <a href="/login"><span class="icon_profile"></span></a>
          </div>
        </div>
      </div>
      <div id="mobile-menu-wrap"></div>
    </div>
  </header>
</template>