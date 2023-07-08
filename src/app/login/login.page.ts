import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router
  ) { 
    this.credentials = this.fb.group ({
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  get email () {
    return this.credentials.get('email');
  }

  get password () {
    return this.credentials.get('password');
  }


  ngOnInit() {
    this.credentials = this.fb.group ({
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  async register (){
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl ('/home',{replaceUrl: true});
    } else {
      this.showAlert('Registro fallido', 'Por favor, vuelva a intentar');
    }
  }

  async login () {
   

    const user = await this.authService.login(this.credentials.value);
 

    if (user) {
      this.router.navigateByUrl ('/home',{replaceUrl: true});
    } else {
      this.showAlert('Usuario o contraseña incorrectas', 'Por favor, vuelva a intentar');
    }
  }

  async showAlert (header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
