import { Component } from '@angular/core';
import { AvatarService } from '../services/avatar.service';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuctionService } from '../services/auction.service';
import { Auction } from '../Models/auction';

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

  


}
