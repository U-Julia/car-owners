import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CarEntity, ICarOwnersService, OwnerEntity } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class OwnersService implements ICarOwnersService {
  private ownersUrl = 'api/owners';

  constructor(private http: HttpClient) {
  }

  getOwners(): Observable<OwnerEntity[]> {
    return this.http.get<OwnerEntity[]>(this.ownersUrl)
      .pipe(
        catchError(this.handleError<OwnerEntity[]>('getOwners', []))
      );
  }

  createOwner(aLastName: string, aFirstName: string, aMiddleName: string, aCars: CarEntity[]): Observable<OwnerEntity> {
    return this.http.post<OwnerEntity>(this.ownersUrl, {
      id: null,
      lastName: aLastName,
      firstName: aFirstName,
      middleName: aMiddleName,
      cars: aCars
    });
  }

  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]> {
    return this.http.delete<OwnerEntity[]>(`${this.ownersUrl}/${aOwnerId}`);
  }

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity> {
    return this.http.put<OwnerEntity>(`${this.ownersUrl}/${aOwner.id}`, aOwner);
  }

  getOwnerById(aId: number): Observable<OwnerEntity> {
    return this.http.get<OwnerEntity>(`${this.ownersUrl}/${aId}`);
  }

  searchStateNumber(term: string): Observable<boolean> {
    if (!term.trim()) {
      return of(false);
    }
    return this.http.get<OwnerEntity[]>(`${this.ownersUrl}`)
      .pipe(
      map((owners: OwnerEntity[]) =>
        owners.some((owner: OwnerEntity) =>
          owner.cars.some((car: CarEntity) =>
            car.stateNumber === term)))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
