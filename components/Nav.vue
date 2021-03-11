<template>
  <div>
    <b-navbar variant="light">
      <b-navbar-brand to="/">
        <img
          src="~/assets/images/logo_32.png"
          class="d-inline-block align-top"
          alt="Logo InfoCEI"
        />
        InfoCEI
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/operacoes">Operações</b-nav-item>
      </b-navbar-nav>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Renda Variável">
            <b-dropdown-item to="/operacoes/acoes">
              <b-icon-graph-up></b-icon-graph-up>
              Operações Comuns / Day-Trade
            </b-dropdown-item>
            <b-dropdown-item to="/operacoes/imob">
              <b-icon-building></b-icon-building>
              Operações Comuns Fundo Invest. Imob.
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/configuracoes">Configurações</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
