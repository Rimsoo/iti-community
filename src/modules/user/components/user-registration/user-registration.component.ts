import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { LocalUserQueries } from '../../services/platform/local/user.queries.local';
import { UserLocalStorage } from '../../services/platform/local/user.storage';
import { UserService } from '../../services/user.service';

class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  providers: [ LocalUserQueries ],
  styleUrls: ['./user-registration.component.less' ]
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private localUserQueries: LocalUserQueries,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
  }

  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  async submit() {

    // Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.form.form.invalid || this.model.password !== this.model.confirmPassword) {
      // this.model.confirmPassword.
      return;
    }
    this.localUserQueries.exists(this.model.username).then(exist =>{
      if(exist)
      {
        this.message.error("Ce nom d'utilisateur n'est pas disponilble");
        return;
      }

      // Enregistrer l'utilisateur via le UserService
      this.userService.register(this.model.username, this.model.password);
      this.goToLogin();
    });
    
  }

  goToLogin() {
    // rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login']);
  }
}
