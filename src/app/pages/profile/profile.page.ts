import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController, AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
  profile: any;
  formperfil!: FormGroup;
  title='Login page';


  constructor(
    private fb: FormBuilder,
    private avatarService: AvatarService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private appComponent: AppComponent
    ) {
      
      this.avatarService.getUserProfile().subscribe((data) => {
        this.profile = data;
        this.title='Pagina perfil';
        //this.appComponent.title=this.title;
      });

      this.formperfil = this.fb.group ({
        
        email: ['', [Validators.required,Validators.email]],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
      this.goProfile() ;
      console.log ("en profile",   this.profile);
      
   }

    cargaPerfil ():any{

      return ;
   }
   get email () {
    return this.formperfil.get('email');
  }

  get password () {

    return this.formperfil.get('password');
  }
   async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // Camera, Photos or Prompt!
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
  async returnHome (){
    
      this.router.navigateByUrl ('/',{replaceUrl: true});
    
  }

  async actualizaPerfil () {
   

  /*  const user = await this.authService.login(this.formperfil.value);
 

    if (user) {
      this.router.navigateByUrl ('/home',{replaceUrl: true});
    } else {
      this.showAlert('Usuario o contraseña incorrectas', 'Por favor, vuelva a intentar');
    }*/
  }

  async showAlert (header:string, message:string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
  ngOnInit() {
    console.log ("perfil " , this.profile);
   /* this.formperfil = this.fb.group ({
      
      email: ['', [Validators.required,Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });*/
    console.log ("en profile oinit");
   }
   async goProfile() {
    //this.profile = this.avatarService.getUserProfile();
    console.log (await this.profile);
   // this.router.navigateByUrl('/profile',{replaceUrl: true});
   }
  
}
