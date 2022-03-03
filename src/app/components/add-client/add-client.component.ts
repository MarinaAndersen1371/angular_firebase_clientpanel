import { Component, OnInit, ViewChild } from '@angular/core';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';
import { Router } from '@angular/router';

import { IClient } from '../../models/IClient';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  client: IClient = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };

  @ViewChild('clientForm') form: any;

  disabledBalanceOnAdd!: boolean;
  faArrowCircleLeft = faArrowCircleLeft;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.disabledBalanceOnAdd =
      this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: IClient; valid: boolean }) {
    if (this.disabledBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      //Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      //Add new client
      this.clientService.newClient(value);
      //Show message
      this.flashMessage.show('New Client has been added!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      //Redirect to the dashboard
      this.router.navigate(['/']);
    }
  }
}
