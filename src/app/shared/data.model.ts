import { Observable } from 'rxjs';

export interface ICarOwnersService {
  getOwners(): Observable<OwnerEntity[]>;
  getOwnerById(aId: number): Observable<OwnerEntity>;

  createOwner(
    aLastName: string,
    aFirstName: string,
    aMiddleName: string,
    aCars: CarEntity[]
  ): Observable<OwnerEntity>;

  editOwner(aOwner: OwnerEntity): Observable<OwnerEntity>;
  deleteOwner(aOwnerId: number): Observable<OwnerEntity[]>;
}

export interface OwnerEntity {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  cars: CarEntity[];
}

export interface CarEntity {
  stateNumber: string;
  brand: string;
  model: string;
  year: number;
}

