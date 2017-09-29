import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DropDownService } from './services/drop-down.service';
import { IPersonModel } from './interface/person-model';
import { InputDataService } from './services/input-data.service';
// FormBuilder imported from anuglar/forms
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DropDownService, InputDataService]
})
export class AppComponent implements OnInit {
  courseForm: FormGroup;
  personDetail: IPersonModel;
  dropDownArr = [];
  selectedOption = null;
  personsList: IPersonModel[] = [];


  constructor(public dropdown: DropDownService, public fieldData: InputDataService, private fb: FormBuilder) {
  }
  onSubmit(): void {
    // adds the user submited data to personDetail object
    this.personDetail.chosenCourse = this.selectedOption;
    this.personDetail.name = this.courseForm.value.username;
    this.personDetail.email = this.courseForm.value.email;
    this.personDetail.address = this.courseForm.value.address;
    this.personDetail.date = this.courseForm.value.date;
    this.fieldData.setPersonData({ ...this.personDetail });
    this.personsList.push({ ...this.personDetail });
    console.log({ ...this.personDetail });
    this.courseForm.reset();
    console.log(this.personsList);
    console.log(this.courseForm);
  }


  // resets the form on clicking the reset button
  resetForm(): void {
    this.courseForm.reset();
  }
  // sets the dropdownlist values on intialization
  ngOnInit() {
    // form controls validation specicified in the class for the Reactive Forms
    this.courseForm = this.fb.group({
      username: [null, [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,16}$/)]],
      email: [null, [Validators.required, Validators.pattern('([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})')]],
      address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      date: [null, [Validators.required]],
      select: [null, [Validators.required]]
    });
    this.dropDownArr = this.dropdown.getData();
    // this.personDetail = {
    //   name: '',
    //   email: '',
    //   address: '',
    //   chosenCourse: ''
    // };
    this.personDetail = this.fieldData.getPersonData();
    console.log(this.courseForm);
  }

}
