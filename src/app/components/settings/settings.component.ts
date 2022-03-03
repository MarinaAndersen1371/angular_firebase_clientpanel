import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from 'src/app/services/settings.service';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { ISettings } from '../../models/ISettings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  faArrowCircleLeft = faArrowCircleLeft;
  settings!: ISettings;

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessage.show('Settings has been saved', {
      cssClass: 'alert-success',
      timeout: 4000,
    });
  }
}
