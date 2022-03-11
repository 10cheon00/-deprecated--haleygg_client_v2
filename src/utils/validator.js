import { reactive, watch } from "vue";

let extraValidations = null;

const createErrorObj = (obj, rules) => {
  const result = Object.keys(obj).reduce((acc, key) => {
    if (Array.isArray(obj[key])) {
      acc[key] = obj[key].reduce((_acc, _cur) => {
        _acc.push(createErrorObj(_cur, rules[key]));
        return _acc;
      }, new Array());
    } else {
      acc[key] = {
        isTouched: v$.isTouched,
        isError: false,
        errorMessage: "",
      };
      if (!obj[key] && rules[key].required) {
        acc[key].isError = true;
        acc[key].errorMessage = "이 항목은 필수입니다.";
      }
    }
    if (extraValidations !== undefined) {
      if (Object.keys(extraValidations).includes(key)) {
        // extra validation execute.
        if (obj[key])
          acc['extra'] = extraValidations[key](obj[key]);
      }
    }
    return acc;
  }, new Object());
  return result;
};

const getError = (obj) => {
  v$.isTouched = true;
  return Object.keys(obj).reduce((acc, key) => {
    if (Array.isArray(obj[key])) {
      acc = (obj[key].reduce((_acc, _obj) => {
        _acc = (getError(_obj) || _acc);
        return _acc
      }, new Boolean(false)) || acc);
    } else {
      obj[key].isTouched = v$.isTouched;
      acc = (obj[key].isError || acc);
    }
    return acc;
  }, new Boolean(false));
};

const v$ = reactive({
  state: null,
  isTouched: false,
  isErrorExists() {
    return getError(this.state);
  }
});

const useValidator = (state, rules, extra) => {
  extraValidations = undefined;
  if (extra !== undefined) {
    extraValidations = extra;
  }
  v$.isTouched = false;
  v$.state = createErrorObj(state, rules);

  watch(state, () => {
    v$.state = createErrorObj(state, rules);
  });

  return v$;
}

export {
  useValidator
} 