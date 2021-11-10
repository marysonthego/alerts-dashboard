
const isText = RegExp(/^[A-Z ]+$/i);
const isCity = RegExp(/\D{1,49}$/);
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const is10DigitCell = RegExp(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4,6})$/); // us
const isFormattedCell = RegExp(/^\+1 \(\d\d\d\) \d\d\d-\d\d\d\d$/); //+1 (###) ###-####
//const isZip = RegExp(/^[0-9]{5}([- /]?[0-9]{4})?$/); // us
const isNumber = RegExp(/^\d+$/);

export function FormValidation(name, value, schema, required, isADuplicate) {
  const { validate, minLength, maxLength } = schema[name];
  let error = '';
 
  if (!value && required) {
    error = `Required field`;
    return error;
  }
  if (minLength && value.length < minLength)
    error = `Minimum ${minLength} characters required`;
  else if (maxLength && value.length > maxLength)
    error = `Maximum length of ${maxLength} exceeded`;
  if (!validate) return;

  switch (validate) {
    case 'text':
      if (!isText.test(value)) error = 'characters only';
      break;

    case 'number':
      if (!isNumber.test(value)) error = 'numbers only';
      break;

    case 'city':
      if (!isCity.test(value)) error = 'invalid city';
      break;

    case 'email':
      if (!isEmail.test(value)) {
        error = 'a valid email address is required';
        break;
      }
      if (isADuplicate) {
        error = 'duplicate email address';
        break;
      }
      break;
     
    case 'cell':
      //console.log(`cell value: `, value);
      if (isADuplicate) {
        error = 'duplicate Cell Number';
        break;
      }
       if (isFormattedCell.test(value)) break;
       if (!is10DigitCell.test(value)) {
        error = 'invalid cell phone number';
        break;
       }
    break;
    
    case 'checkbox':
      if (!value) error = 'Please select a value';
      break;

    case 'password':
      break;

    default:
      error = "";
      break;
  }
  return error;
}

export const fieldsValidation = {
  firstname: {
    error: '',
    validate: 'text',
    minLength: 2,
    maxLength: 20,
  },
  lastname: {
    error: '',
    validate: 'text',
    minLength: 2,
    maxLength: 20,
  },
  email: {
    error: '',
    validate: 'email',
    minLength: 5,
    maxLength: 40,
  },
  cell: {
    error: '',
    validate: 'cell',
    minLength: 10,
    maxLength: 18,
  },
  pwd: {
    error: '',
    validate: 'password',
    minLength: 8,
    maxLength: 20,
  },
  pwd2: {
    error: '',
    validate: 'password',
    minLength: 8,
    maxLength: 20,
  },
  newpwd: {
    error: '',
    validate: 'password',
    minLength: 8,
    maxLength: 20,
  },
  newpwd2: {
    error: '',
    validate: 'password',
    minLength: 8,
    maxLength: 20,
  },
  city: {
    error: '',
    validate: 'city',
    minLength: 3,
    maxLength: 20,
  },
  st: {
    error: '',
    validate: 'text',
    minLength: 2,
    maxLength: 2,
  },
  zip: {
    error: '',
    validate: 'zip',
    minLength: 5,
    maxLength: 5,
  },
  // nickname: {
  //   error: '',
  //   validate: 'text',
  //   minLength: 2,
  //   maxLength: 20,
  // },
  // address1: {
  //   error: '',
  //   validate: 'text',
  //   minLength: 5,
  //   maxLength: 30,
  // },
  card: {
    error: '',
    validate: 'number',
    minLength: 15,
    maxLength: 16,
  },
  exp: {
    error: '',
    validate: 'number',
    minLength: 4,
    maxLength: 4,
  },
  cvv: {
    error: '',
    validate: 'number',
    minLength: 3,
    maxLength: 3,
  },
  amount: {
    error: '',
    validate: 'number',
    minLength: 1,
  },
};
