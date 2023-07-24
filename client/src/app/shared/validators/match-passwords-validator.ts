import { FormGroup, ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
  passOneControl: string,
  passTwoControl: string
): ValidatorFn {
  return (control) => {
    const group = control as FormGroup;
    const pass1 = group.get(passOneControl);
    const pass2 = group.get(passTwoControl);

    return pass1?.value === pass2?.value ? null : { matching: true };
  };
}
