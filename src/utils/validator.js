import { computed } from "vue";

const Required = (state) => {
  if (state) {
    return false;
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
          const validationFunctions = rules[key].$this;
          return Object.keys(validationFunctions).reduce((errorObj, _key) => {
            const _validate = validationFunctions[_key]
            const errorMessage = _validate(state[key]);
            if (errorMessage) {
              errorObj.isErrorExists = true;
              errorObj.message = errorMessage;
            }
            return errorObj;
          }, {
            isErrorExists: false,
            message: ""
          });
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
          const validationFunctions = rules[key];
          return Object.keys(validationFunctions).reduce((errorObj, _key) => {
            const _validate = validationFunctions[_key]
            const errorMessage = _validate(state[key]);
            if (errorMessage) {
              errorObj.isErrorExists = true;
              errorObj.message = errorMessage;
            }
            return errorObj;
          }, {
            isErrorExists: false,
            message: ""
          });
        });
      }
    }
    return acc;
  }, new Object());
};

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
  // NotRequired,
} 