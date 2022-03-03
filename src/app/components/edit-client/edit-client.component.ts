import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from 'src/app/services/client.service';
import { SettingsService } from 'src/app/services/settings.service';
import { faArrowCircleLeft, faEdit } from '@fortawesome/free-solid-svg-icons';

import { IClient } from '../../models/IClient';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
  id!: string;
  client: IClient = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
  };
  disabledBalanceOnEdit!: boolean;

  faArrowCircleLeft = faArrowCircleLeft;
  faEdit = faEdit;

  constructor(
    private clientService: ClientService,
    private settingsService: SettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    //Get Client
    this.clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
    });

    this.disabledBalanceOnEdit =
      this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: IClient; valid: boolean }) {
    if (this.disabledBalanceOnEdit) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      // Add id
      value.id = this.id;
      //Update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client has been updated!', {
        cssClass: 'alert-success',
        timeout: 4000,
      });
      this.router.navigate(['/client/' + this.id]);
    }
  }
}
