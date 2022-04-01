import { computed } from "vue";

// let extraValidations = null;

const Required = "REQUIRED";
const NotRequired = "NOT_REQUIRED";

const validate = (form) => {
  form.errorObj = updateErrorObj(form.state, form.rules);
}

const updateErrorObj = (state, rules) => {
  return Object.keys(state).reduce((acc, key) => {
    if (Array.isArray(state[key])) {
      acc[key] = {
        $this: computed(() => {
          const errorObj = {
            isErrorExists: false,
            errorMessage: ""
          }
          return errorObj;
        }),
        $child: []
      };
      acc[key].$child = state[key].reduce((_acc, _cur) => {
        _acc.push(updateErrorObj(_cur, rules[key].$child));
        return _acc;
      }, new Array());
    } else {
      acc[key] = computed(() => {
        const errorObj = {
          isErrorExists: false,
          errorMessage: ""
        }
        if (rules[key] == Required && !state[key]) {
          errorObj.isErrorExists = true;
          errorObj.errorMessage = "이 항목은 필수입니다.";
        }
        return errorObj;
      })
    }
    // if (extraValidations !== undefined) {
    //   if (Object.keys(extraValidations).includes(key)) {
    //     if (Array.isArray(obj[key]) && obj[key].length > 0) {
    //       acc['extra'] = extraValidations[key](obj[key]);
    //       console.log(acc.extra)
    //     }
    //     else if (obj[key]) {
    //       acc['extra'] = extraValidations[key](obj[key]);
    //     }
    //   }
    // }
    return acc;
  }, new Object());
};

const initializeErrorObj = (state) => {
  const result = Object.keys(state).reduce((acc, key) => {
    if (Array.isArray(state[key])) {
      acc[key] = {
        $this: {
          isErrorExists: false,
          message: ""
        },
        $child: []
      };
      acc[key].$child = state[key].reduce((_acc, _cur) => {
        _acc.push(initializeErrorObj(_cur));
        return _acc;
      }, new Array());
    } else {
      acc[key] = {
        isErrorExists: false,
        errorMessage: "",
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
  // return form;
  const val = Object.keys(errorObj).reduce((result, key) => {
    // if erorrObj is list,
    if (Object.prototype.hasOwnProperty.call(errorObj[key], "$child")) {
      result = errorObj[key].$this.isErrorExists || result;
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
  NotRequired,
  Required,
} 