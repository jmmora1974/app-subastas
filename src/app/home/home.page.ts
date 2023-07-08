import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../Models/auction';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  subastas: []=[];
  profile:any;
  auctions: Auction[]=[];
  id?:number;
  valorPuja: any;

  content_loaded: boolean = false;

  constructor(
    private avatarService: AvatarService,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private auctionService: AuctionService
  ) {
    console.log('aqui1 const');
  }

  async logout () {
    await this.authService.logout();
    this.router.navigateByUrl('/login',{replaceUrl: true});
  }

  async changeImage() {}

  async goProfile() {
   // this.profile =this.avatarService.getUserProfile();
   // console.log (this.profile);
    this.router.navigateByUrl('/home/profile',{replaceUrl: true});
  }
 

  ngOnInit() {
    console.log('aqui1');
    this.getAllAuctions();
    
    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
    }, 2000);
  }

  // getAll show a list of Auctions
  getAllAuctions() {
    this.auctionService.getAll().subscribe({
      next: (data: Auction[]) => {
        console.log('aqui');
        this.auctions = data;
        // Handle the response data
        console.log(this.auctions);
      },
      error: (error) => {
        // Handle errors
        console.error(error);
      }
    });
  }

  deleteAuction(id:number){
    this.auctionService.delete(id).subscribe(res => {
      this.auctions = this.auctions.filter(item => item.id !== id);
      console.log('Auction deleted successfully!');
    });

  }


   showDetails(id:number){
      this.router.navigateByUrl(`auctions/show/${id}`);
  } 

  makeAuction (valor:any, auction: Auction){
    
    //console.log ("Puja ", auction.id, " a ", valor, userPuja.email);
    auction.user_id_won=this.authService.userLogged();
    auction.fprice=valor;
    this.valorPuja=valor++;

    console.log (auction);
       

   
    if (!valor) {
      //No deberia occurri por la propiedad disable de html del boton puja.
      this.showAlert('Puja invalida', 'Por favor, debes introducir un precio a la subasta');
      
    }
    
    if (valor<=auction.fprice) {
      //No deberia occurri por la propiedad disable de html del boton puja.
      this.showAlert('Puja invalida', 'El precio de la puja ha de ser mayor al actual.');
      
    }else {

      try {
       
        this.auctionService.update(auction)
      
      }
  
  catch (error:any){
      console.log ('error',error);
    }

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
