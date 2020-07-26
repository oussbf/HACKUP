import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  changed = [false, false];
  submitting = false;
  errMessage = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required , Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]]
    });
  }

  onSubmitSignIn(formValue) {
    this.submitting = true;
    if (this.signInForm.valid) {
      this.authService.doLogin(formValue.email , formValue.password).then(err => {
        this.errMessage = err;
        this.submitting = false;
      });
    } else {
      for (let i = 0 ; i < this.changed.length; i++) { this.changed[i] = true; }
      this.submitting = false;
    }
  }

}
