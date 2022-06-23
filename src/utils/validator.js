import { computed } from "vue";

const Required = (state) => {
  if (state) {
    if (typeof state == "string" && state.length > 0) {
      return false;
    }
    else {
      return false;
    }
  }
  return "이 항목은 필수입니다."
}

const validate = (form) => {
  form.errorObj = updateErrorObj(form.state, form.rules);
}

const updateErrorObj = (state, rules) => {
  return Object.keys(state).reduce((acc, key) => {
    // check value is array
    if (Array.isArray(state[key])) {
      acc[key] = {
        $this: computed(() => {
          return runValidators(state[key], rules[key].$this);
        }),
        $child: state[key].reduce((_acc, _cur) => {
          _acc.push(updateErrorObj(_cur, rules[key].$child));
          return _acc;
        }, new Array())
      };
    } else {
      // otherwise create computed property.
      if (rules[key] == undefined) {
        acc[key] = {
          isErrorExists: false,
          message: ""
        }
      }
      else {
        acc[key] = computed(() => {
          return runValidators(state[key], rules[key]);
        });
      }
    }
    return acc;
  }, new Object());
};

const runValidators = (state, validationFunctions) => {
  for (const key in validationFunctions) {
    const validate = validationFunctions[key];
    const errorMessage = validate(state);
    if (errorMessage) {
      return {
        isErrorExists: true,
        message: errorMessage
      }
    }
  }
  return {
    isErrorExists: false,
    message: ""
  }
}

const initializeErrorObj = (state) => {
  const result = Object.keys(state).reduce((acc, key) => {
    // check value is array.
    if (Array.isArray(state[key])) {
      acc[key] = {
        $this: {
          isErrorExists: false,
          message: ""
        },
        $child: state[key].reduce((_acc, _cur) => {
          _acc.push(initializeErrorObj(_cur));
          return _acc;
        }, new Array())
      };
    } else {
      // otherwise, create error object.
      acc[key] = {
        isErrorExists: false,
        message: "",
      };
    }
    return acc;
  }, new Object());
  return result;
}

const isErrorExists = (form) => {
  return getError(form.errorObj)
}

const getError = (errorObj) => {
  const val = Object.keys(errorObj).reduce((result, key) => {
    // check erorrObj is array
    if (Object.prototype.hasOwnProperty.call(errorObj[key], "$child")) {
      result = errorObj[key].$this.isErrorExists || result;
      // call getError method recursively on each child errorObj.
      result = errorObj[key].$child.reduce(
        (_result, erorrObjRef) => {
          _result = getError(erorrObjRef) || _result;
          return _result;
        }, false
      ) || result;
    } else {
      result = errorObj[key].isErrorExists || result;
    }
    return result;
  }, false);
  return val;
};

export {
  initializeErrorObj,
  isErrorExists,
  validate,
  Required,
} 