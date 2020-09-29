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
}