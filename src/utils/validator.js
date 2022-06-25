import { computed, readonly, ref } from "vue";


class Validator {
  #isTriggered;
  #state;
  #rules;
  #errorObj;

  constructor(state, rules) {
    this.#state = state;
    this.#rules = rules;
    this.#errorObj = readonly(this.__initializeErrorObj__(this.#state, this.#rules));

    this.#isTriggered = ref(false);
  }

  __initializeErrorObj__ = (state, rules) => {
    const result = Object.keys(state).reduce((acc, key) => {
      // check value is array.
      if (Array.isArray(state[key])) {
        acc[key] = {
          $this: computed(() => {
            return this.__runValidaionFunctions__(state[key], rules[key].$this);
          }),
          $child: state[key].reduce((_acc, _cur) => {
            _acc.push(this.__initializeErrorObj__(_cur, rules[key].$child));
            return _acc;
          }, new Array())
        };
      } else {
        // otherwise create computed property.
        if (rules[key] == undefined) {
          acc[key] = {
            hasError: false,
            message: ""
          };
        }
        else {
          acc[key] = computed(() => {
            return this.__runValidaionFunctions__(state[key], rules[key]);
          });
        }
      }
      return acc;
    }, new Object());
    return result;
  }

  __runValidaionFunctions__ = (state, validationFunctions) => {
    if (this.#isTriggered.value) {
      for (const key in validationFunctions) {
        const runValidation = validationFunctions[key];
        const errorMessage = runValidation(state);
        if (errorMessage) {
          return {
            hasError: true,
            message: errorMessage
          };
        }
      }
    }
    return {
      hasError: false,
      message: ""
    };
  }

  validate = () => {
    this.#isTriggered.value = true;
  }

  get errorObj() {
    return this.#errorObj;
  }

  hasError = () => {
    return getError(this.#errorObj);
  }

  __getError__ = (errorObj) => {
    const val = Object.keys(errorObj).reduce((result, key) => {
      // check erorrObj is array
      if (Object.prototype.hasOwnProperty.call(errorObj[key], "$child")) {
        result = errorObj[key].$this.hasError || result;
        // call getError method recursively on each child errorObj.
        result = errorObj[key].$child.reduce(
          (_result, erorrObjRef) => {
            _result = getError(erorrObjRef) || _result;
            return _result;
          }, false
        ) || result;
      } else {
        result = errorObj[key].hasError || result;
      }
      return result;
    }, false);
    return val;
  }
}


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


export {
  Required,
  Validator,
} 