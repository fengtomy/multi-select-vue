import MultiSelect from "./MultiSelect.vue";

function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(MultiSelect.name, MultiSelect);
}

MultiSelect.install = install;

export default MultiSelect;