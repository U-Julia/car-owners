import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { OwnerEntity } from '../../shared/data.model';
import { ActionType } from '../../shared/enum';
import { OwnersService } from '../../shared/owners.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [
    ConfirmationService
  ],
})
export class DashboardComponent implements OnInit {
  owners: OwnerEntity[] = [];
  selectedRecord: OwnerEntity;
  readonly ActionType = ActionType;

  constructor(private ownersService: OwnersService,
              private router: Router,
              private route: ActivatedRoute,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.getOwners();
  }

  handleRecord(actionType: ActionType): void {
    switch (actionType) {
      case ActionType.DELETE:
        this.deleteOwner();
        break;
      case ActionType.CREATE:
        this.router.navigate(['record'], {queryParams: {actionType: actionType}});
        break;
      case ActionType.PREVIEW:
      case ActionType.EDIT:
        this.router.navigate(['record', this.selectedRecord.id], {queryParams: {actionType: actionType}});
        break;
    }
  }

  private getOwners(): void {
    this.ownersService.getOwners()
      .subscribe((owners: OwnerEntity[]) => {
        this.owners = owners;
      });
  }

  private deleteOwner() {
    this.confirmationService.confirm({
      message: 'Вы уверены, что хотите удалить эту запись?',
      header: 'Внимание!',
      acceptLabel: 'Да',
      rejectLabel: 'Нет',
      accept: () => {
        this.delete();
      },
    });
  }

  private delete() {
    this.ownersService.deleteOwner(this.selectedRecord.id)
      .subscribe(() => {
        this.selectedRecord = null;
        this.getOwners();
      });
  }
}
