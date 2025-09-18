import { AuthService } from '@services/auth/auth-service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Validators } from '@angular/forms';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/button/button';
import { RequestStatus } from '@models/status.model';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './login.html',
})
export class Login {
  private authService: AuthService;
  private router: Router;
  private formBuilder: FormBuilder;
  status: RequestStatus = 'loading';
  showPassword = false;
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  form: ReturnType<FormBuilder['group']>;

  constructor() {
    const authService = inject(AuthService);
    const router = inject(Router);
    const formBuilder = inject(FormBuilder);

    this.authService = authService;
    this.router = router;
    this.formBuilder = formBuilder;
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get('email') as ReturnType<FormBuilder['control']>;
  }

  get password() {
    return this.form.get('password') as ReturnType<FormBuilder['control']>;
  }

  loginUser() {
    if (this.form.valid) {
      this.status = 'loading';
      this.authService
        .login(this.email.value as string, this.password.value as string)
        .subscribe({
          next: (response) => {
            if (response) {
              this.authService.setToken(response.access_token);
            }
            this.status = 'success';
            this.router.navigate(['/app']);
          },
          error: (err) => {
            this.status = 'failed';
            console.error('Login error:', err);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
