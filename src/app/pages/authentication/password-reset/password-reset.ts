import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '@components/button/button';
import { RequestStatus } from '@models/status.model';
import { AuthService } from '@services/auth/auth-service';

@Component({
  selector: 'app-password-reset',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './password-reset.html',
})
export class PasswordReset {
  private authService: AuthService;
  private formBuilder: FormBuilder;
  form: ReturnType<FormBuilder['group']>;
  status: RequestStatus = 'init';
  emailSent = false;

  constructor() {
    const authService = inject(AuthService);
    const formBuilder = inject(FormBuilder);

    this.authService = authService;
    this.formBuilder = formBuilder;
    this.form = this.formBuilder.nonNullable.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  sendLink() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email } = this.form.getRawValue();
      this.authService.recovery(email).subscribe({
        next: () => {
          this.status = 'success';
          this.emailSent = true;
        },
        error: () => {
          this.status = 'failed';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
