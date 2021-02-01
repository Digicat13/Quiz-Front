import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';

export function correctAnswersCountValidator(): ValidatorFn {
  return (formArray: FormArray): { [key: string]: any } | null => {
    let correctCount = 0;
    formArray.controls.forEach((group: FormGroup) => {
      if (group.value.isCorrect) {
        correctCount++;
      }
    });
    return correctCount === 0 ? { error: 'No correct answers' } : null;
  };
}
