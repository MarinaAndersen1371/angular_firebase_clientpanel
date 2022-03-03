import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClient } from '../models/IClient';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientsCollection!: AngularFirestoreCollection<IClient>;
  clientDoc!: AngularFirestoreDocument<IClient>;
  clients!: Observable<IClient[]>;
  client!: Observable<IClient>;

  constructor(public afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', (ref) =>
      ref.orderBy('lastName', 'asc')
    );
  }

  getClients(): Observable<IClient[]> {
    //Get clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map((changes: any) => {
        return changes.map((action: any) => {
          const data = action.payload.doc.data() as IClient;
          data.id = action.payload.doc.id;
          return data;
        });
      })
    );
    return this.clients;
  }

  newClient(client: IClient) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<IClient> {
    this.clientDoc = this.afs.doc<IClient>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as IClient;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }

  updateClient(client: IClient) {
    this.clientDoc = this.afs.doc(`/clients/${client.id}`);
    this.clientDoc.update(client);
  }

  deleteClient(client: IClient) {
    this.clientDoc = this.afs.doc(`/clients/${client.id}`);
    this.clientDoc.delete();
  }
}
