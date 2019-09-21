<template>
<div id="app">
  <div class="messenger">
    <div class="messenger__container container">
      <Form v-on:updateStorage="getMessageHistory()" />
      <History :storage="storage" />
    </div>
  </div>
</div>
</template>

<script>
import History from './components/History.vue';
import Form from './components/Form.vue';
import { getLocalStorage } from './services.js';

export default {
  name: 'app',
  components: {
    History,
    Form
  },
  data() {
    return {
        storage: []
    }
  },
  methods: {
    getMessageHistory() {
      this.storage = getLocalStorage('storage');
    }
  },
  mounted() {

    this.getMessageHistory();
      window.addEventListener('storage', () => {
        this.getMessageHistory();
      });
  }
}
</script>

<style lang="scss">
@breakpoint xs 576px;
@breakpoint sm 768px;

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 100vh;
  margin: 0;
}

.container {
  position: relative;
  width: 960px;
  margin: auto;

  @to-width sm {
    width: 20.5rem;
  }
}

.messenger {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  @to-width sm {
    position: initial;
    height: 100%;
  }
}

.messenger__container {
  display: flex;
  flex-flow: row nowrap;
  padding-top: 10rem;
  height: 30rem;

  @to-width sm {
    flex-flow: column nowrap;
    height: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 0;
  }
}
</style>
