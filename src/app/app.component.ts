import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import data from '../../data/workflow.json';
import { GroupItem } from '../shared/interface/data-json';
import { MatStepperModule } from '@angular/material/stepper';
import { FormControlPipe } from './shared/pipes/form-control.pipe';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-root',
  standalone: true,
  host: {
    class: 'flex items-center justify-center bg-gray-100 w-full px-4 flex-col',
  },
  imports: [
    CommonModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatStepperModule,
    FormControlPipe,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class AppComponent {
  userForm!: FormGroup;
  userFields!: GroupItem[];
  panelOpenState!: boolean[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userFields = data;
    this.userForm = this.generateFilterForm();
  }

  generateFilterForm(): FormGroup {
    const baseForm = this.fb.group({});
    this.userFields.forEach((field) => {
      baseForm.addControl(field.key, this.generateFormGroup(field));
    });
    console.log(baseForm);
    return baseForm;
  }

  generateFormGroup(field: GroupItem): FormGroup | FormControl {
    if (field.group) {
      const formGroup = this.fb.group({});
      field.group.forEach((item) => {
        formGroup.addControl(item.key, this.generateFormGroup(item));
      });
      return formGroup;
    }

    return new FormControl('');
  }

  get fc() {
    return this.userForm.controls;
  }
}
