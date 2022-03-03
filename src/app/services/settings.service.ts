import { Injectable } from '@angular/core';

import { ISettings } from '../models/ISettings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: ISettings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true,
  };

  constructor() {
    if (localStorage.getItem('settings') != null) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings(): ISettings {
    return this.settings;
  }

  changeSettings(settings: ISettings) {
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
