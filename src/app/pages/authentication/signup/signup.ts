import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatus } from '@models/status.model';
import { AuthService } from '@services/auth/auth-service';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Button } from '@components/button/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-signup',
  imports: [Button, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './signup.html',
})
export class Signup {
  private authService: AuthService;
  private router: Router;
  private formBuilder: FormBuilder;
  status: RequestStatus = 'loading';
  statusUser: RequestStatus = 'init';
  showPassword = false;
  showRegister = false;
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  form: ReturnType<FormBuilder['group']>;
  formUser: ReturnType<FormBuilder['group']>;

  constructor() {
    const authService = inject(AuthService);
    const router = inject(Router);
    const formBuilder = inject(FormBuilder);

    this.authService = authService;
    this.router = router;
    this.formBuilder = formBuilder;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.formUser = this.formBuilder.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  signUpUser() {
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService.signUpAndLogin(name, email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/app/boards']);
        },
        error: (error) => {
          this.status = 'failed';
          console.log(error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  validateUser() {
    if (this.formUser.valid) {
      this.statusUser = 'loading';
      const { email } = this.formUser.getRawValue();
      this.authService.isAvailable(email).subscribe({
        next: (rta) => {
          this.statusUser = 'success';
          if (rta.isAvailable) {
            this.showRegister = true;
            this.form.controls['email'].setValue(email);
          } else {
            this.router.navigate(['/login'], {
              queryParams: { email },
            });
          }
        },
        error: (error) => {
          this.statusUser = 'failed';
          console.log(error);
        },
      });
    } else {
      this.formUser.markAllAsTouched();
    }
  }
}
