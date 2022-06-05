import {
  configure,
  defineRule,
  ErrorMessage,
  Form as VeeForm,
  Field as VeeField,
} from 'vee-validate';
import {
  min, max, email, required, confirmed,
  alpha_spaces as alphaSpaces,
  min_value as minVal,
  max_value as maxVal,
  not_one_of as excluded,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('tos', required);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);
    defineRule('required', required);
    defineRule('excluded', excluded);
    defineRule('alpha_spaces', alphaSpaces);
    defineRule('country_excluded', excluded);
    defineRule('passwords_mismatch', confirmed);

    configure({
      validateOnBlur: true,
      validateOnInput: false,
      validateOnChange: true,
      validateOnModelUpdate: true,
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} can only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid email.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          excluded: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_excluded: 'Due to restrictions we do not accept user from this location.',
          passwords_mismatch: "The passwords don't match",
          tos: 'You must accept the Terms of Service.',
        };

        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;

        return message;
      },
    });
  },
};
