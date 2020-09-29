import MultiSelect from "./MultiSelect.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component("multi-select", MultiSelect);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

MultiSelect.install = install;

export default MultiSelect;