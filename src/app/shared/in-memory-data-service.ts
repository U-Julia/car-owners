import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { OwnerEntity } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const owners: OwnerEntity[] = [
      {
        id: 1,
        lastName: 'Иванов',
        firstName: 'Иван',
        middleName: 'Иванович',
        cars: [{
          stateNumber: 'AX5555BK',
          brand: 'Audi',
          model: 'TT',
          year: 2006,
        }],
      },
      {
        id: 2,
        lastName: 'Петрова',
        firstName: 'Наталья',
        middleName: 'Игоревна',
        cars: [{
          stateNumber: 'AX7777BK',
          brand: 'BMW',
          model: 'X6',
          year: 2012,
        },
          {
            stateNumber: 'AX8888BK',
            brand: 'Toyota',
            model: 'RAV4',
            year: 2010,
          }],
      },
      {
        id: 3,
        lastName: 'Антонов',
        firstName: 'Алексей',
        middleName: 'Сергеевич',
        cars: [{
          stateNumber: 'AX3333BK',
          brand: 'Porsche',
          model: 'Cayenne',
          year: 2017,
        }],
      }
    ];
    return {owners};
  }

}
