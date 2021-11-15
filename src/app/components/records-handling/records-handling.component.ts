import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, take } from 'rxjs/operators';
import { CarEntity, OwnerEntity } from '../../shared/data.model';
import { ActionType } from '../../shared/enum';
import { OwnersService } from '../../shared/owners.service';
import { stateNumberValidator } from '../../shared/validators';

@Component({
  selector: 'app-records-handling',
  templateUrl: './records-handling.component.html',
  styleUrls: ['./records-handling.component.scss']
})
export class RecordsHandlingComponent implements OnInit {
  form = new FormGroup({
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    cars: new FormArray([], [Validators.required, Validators.minLength(1)]),
  });

  minYear: number = 1990;
  actionType: ActionType;
  owner: OwnerEntity;
  ActionType = ActionType;

  constructor(private router: Router,
              private ownersService: OwnersService,
              private route: ActivatedRoute,) {
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get middleName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get cars(): FormArray {
    return this.form.get('cars') as FormArray;
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    this.checkRouteQueryParams();
    this.checkRouteParams();
  }

  addCar(): void {
    this.cars.push(this.createCarFormGroup());
  }

  save(): void {
    if (this.form.valid) {
      if (this.actionType === ActionType.CREATE) {
        this.createOwner();
      }
      if (this.actionType === ActionType.EDIT) {
        this.editOwner();
      }
    }
  }

  back(): void {
    this.router.navigate(['']);
  }

  deleteCar(index: number) {
    this.cars.removeAt(index);
  }

  checkStateNumber(formControl: AbstractControl): void {
    this.ownersService.searchStateNumber(formControl.value).subscribe((isCreated: boolean) => {
      if (isCreated) {
        formControl.setErrors({...(formControl.errors || {}), exists: true});
      }
    });
  }

  private createCarFormGroup(car?: CarEntity) {
    return new FormGroup({
      stateNumber: new FormControl(car?.stateNumber || '', [Validators.required, stateNumberValidator()]),
      brand: new FormControl(car?.brand || '', Validators.required),
      model: new FormControl(car?.model || '', Validators.required),
      year: new FormControl(car?.year || '', [Validators.required, Validators.min(this.minYear), Validators.max(this.currentYear)]),
    });
  }

  private createOwner(): void {
    this.ownersService.createOwner(this.lastName.value, this.firstName.value, this.middleName.value, this.cars.value)
      .subscribe(() => {
        this.back();
      });
  }

  private editOwner(): void {
    this.ownersService.editOwner({...this.form.value, id: this.owner.id})
      .subscribe(() => {
        this.back();
      });
  }

  private checkRouteQueryParams(): void {
    this.route.queryParamMap
      .pipe(
        take(1)
      )
      .subscribe((queryParam: ParamMap) => {
        this.actionType = queryParam.get('actionType') as ActionType;
        if (this.actionType === ActionType.PREVIEW) {
          this.form.disable();
        }
      });
  }

  private checkRouteParams(): void {
    this.route.paramMap
      .pipe(
        take(1)
      )
      .subscribe((paramMap: ParamMap) => {
        const id: string = paramMap.get('id');
        if (id) {
          this.ownersService.getOwnerById(Number(id))
            .subscribe((owner: OwnerEntity) => {
              this.owner = owner;
              this.form.patchValue(owner);

              owner.cars.forEach((car: CarEntity) => {
                this.cars.push(this.createCarFormGroup(car));
              });
              if (this.actionType === ActionType.PREVIEW) {
                this.cars.controls.forEach((control) => control.disable());
              }
            });
        }
      });
  }
}
