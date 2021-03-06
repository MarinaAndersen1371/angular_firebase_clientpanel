import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email!: string;
  password!: string;
  faUser = faUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .register(this.email, this.password)
      .then((res) => {
        this.flashMessage.show('Your are now registered and logged in', {
          cssClass: 'alert-success',
          timeout: 4000,
        });
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
