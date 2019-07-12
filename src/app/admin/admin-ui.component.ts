import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../backend/authentication-service';

@Component({
  selector: 'app-admin-ui',
  templateUrl: './admin-ui.component.html',
  styleUrls: ['./admin-ui.component.scss']
})
export class AdminUiComponent implements OnInit {

  public showPostManagement = true;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }


  logout() {
    this.authenticationService.logout();
  }

  showPostManagementForm() {
    this.showPostManagement = true;
  }

  showUserManagementForm() {
    this.showPostManagement = false;
  }
}
