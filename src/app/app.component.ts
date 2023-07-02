import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
      this.showSplash();
  }
  private async  showSplash (){
    await this.platform.ready();

    const lottie =(window as any).lottie;
    if (this.platform.is('android')&&lottie){
      await lottie.SplashScreen.hide();
      await lottie.SplashScreen.show('public/assets/splash.json',false);
    }
    // Hide the splash (you should do this on app launch)
    await SplashScreen.hide();

    // Show the splash for an indefinite amount of time:
    await SplashScreen.show({
      autoHide: false,
    });

    // Show the splash for two seconds and then automatically hide it:
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }
  
}
