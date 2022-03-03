import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { faUsers, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

import { IClient } from '../../models/IClient';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients!: IClient[];
  faUsers = faUsers;
  faArrowCircleRight = faArrowCircleRight;
  totalOwed!: number;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client: any) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }
}
