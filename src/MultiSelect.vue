<template>
<section class="multiSelect">
  <p class="multiSelect--text" :class="size">
    <slot name="multiSelectText">
      <span>{{ selectText }}</span>
    </slot>
  </p>
  <el-select
    v-model="actualValue"
    :size="size"
    multiple
    value-key="value"
    @change="handleChange"
  >
    <slot>
      <el-option
        v-for="option in actualOptions"
        :key="option.value"
        :value="option"
        :label="option.label"
      />
    </slot>
  </el-select>
</section>
</template>

<script>
import { Select, Option } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export function copyValue(value) {
  if (Array.isArray(value)) return value.map(copyValue);
  if (Object.prototype.toString.call(value) === "[object Object]") return JSON.parse(JSON.stringify(value));
  return value;
}

const propsDefaultConfig = {
  label: "label",
  value: "value"
};

export function transform(config = propsDefaultConfig) {
  return function transformProps(option) {
    return {
      label: option[config.label],
      value: option[config.value]
    };
  };
}

export function notEmptyString(value) {
  return value !== "";
}

export function isEmptyString(value) {
  return value === "";
}

export function returnSpecificValueOfProp(prop) {
  return function returnSpecificValue(obj) {
    return obj[prop];
  }
}

export function returnSelf(self) {
  return self;
};

export default {
  name: "MultiSelect",
  components: {
    ElSelect: Select,
    ElOption: Option
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => ({
        label: "label",
        value: "value"
      })
    },
    size: {
      type: String,
      default: ""
    },
    optionObjAsValue: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      actualValue: []
    };
  },
  computed: {
    actualOptions() {
      const { config, options } = this;
      if (options.length === 0) return [];
      const transformProps = transform(config);
      return options.map(transformProps);
    },
    selectText() {
      const { actualValue } = this;
      if (actualValue.length === 0) return "请选择";
      const returnLabel = returnSpecificValueOfProp("label");
      return actualValue.map(returnLabel).join(",");
    }
  },
  methods: {
    handleChange(value) {
      const returnValue = returnSpecificValueOfProp("value");
      const filterValueFunc = this.optionObjAsValue ? copyValue : returnValue;
      const selected = value.filter(notEmptyString).map(filterValueFunc);
      this.sync(selected);
    },
    sync(selected) {
      this.$emit("input", selected);
    }
  }
}
</script>

<style>
  .multiSelect {
    position: relative;
  }
  .multiSelect .el-select {
    width: 100%;
  }
  .multiSelect .el-select__tags {
    display: none;
  }
  .multiSelect--text {
    position: absolute;
    top: 1px;
    left: 16px;
    right: 30px;
    bottom: 1px;
    z-index: 1;
    background-color: #fff;
    border-radius: 4px;
    pointer-events: none;
    padding: 0;
    margin: 0;
    color: #606266;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 38px;
  }
  .multiSelect--text.medium {
    line-height: 34px;
  }
  .multiSelect--text.small {
    line-height: 30px;
  }
  .multiSelect--text.mini {
    line-height: 24px;
  }
</style>
