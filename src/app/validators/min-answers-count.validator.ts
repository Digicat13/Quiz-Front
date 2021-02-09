import { FormArray, ValidatorFn } from '@angular/forms';

export function minAnswersCountValidator(): ValidatorFn {
  const minCount = 2;
  return (formArray: FormArray): { [key: string]: any } | null => {
    let answerCount = 0;
    answerCount = formArray.controls.length;
    return answerCount < minCount ? { error: 'Not enough answers' } : null;
  };
}
