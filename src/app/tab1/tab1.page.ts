import { Component } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public datas=([] as any[]);
  dataurl={
    url:'url',
    no:'',
    con:'62',
  }

  constructor(private alertController: AlertController,
    private loadingCtrl: LoadingController) {}

  // copyString(){
  //   this.clipboard.copy('sda');
  // }

  
  clear(){
    this.dataurl.no='';
  }
  
  open_link(){
    const no=this.dataurl.no;
    this.dataurl.no=this.dataurl.no.replace(/[- +-]/g,'');
    // if(this.dataurl.no.substr(0,2) == '08'){
    //   this.dataurl.no=this.dataurl.no.replace('08','628');
    // }
    // else if(this.dataurl.no.substr(0,2) == '+62'){
    //   this.dataurl.no=this.dataurl.no.replace('+62','62');
    // }

    // if(this.dataurl.no.substr(0,2) != '62'){
    //   this.presentAlert();
    //   return;
    // }

    if(this.dataurl.no.substr(0,1) == '0'){
      this.dataurl.no=this.dataurl.con+this.dataurl.no.substr(1);
    }else if(this.dataurl.no.substr(0,2) != this.dataurl.con){
      this.presentAlert();
      return;
    }

    this.dataurl.url='https://wa.me/'+this.dataurl.no;
    this.dataurl.no=no;
    window.open(this.dataurl.url);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Invalid number!',
      message: 'Number must be start with  08/+62/62/country code.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlert2(text:any) {
    const alert = await this.alertController.create({
      header: 'Alert',
      // subHeader: 'Invalid number!',
      message: text,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async load_fakegps(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    fetch(`${environment.baseUrl}/get_fakegps`)
    .then(async response => {
      if (response.ok) {
        const data = await response.json();
        console.log(data.data)
        this.datas=data.data
        loading.dismiss();
        this.presentAlert2('eror');
      }
    })
    .catch(e => {
      this.presentAlert2('eror');
      loading.dismiss();
    })


  }
  
  convert(){
    const no=this.dataurl.no;
    this.dataurl.no=this.dataurl.no.replace(/[- +-]/g,'');
    // if(this.dataurl.no.substr(0,2) == '08'){
    //   this.dataurl.no=this.dataurl.no.replace('08','628');
    // }
    // else if(this.dataurl.no.substr(0,2) == '+62'){
    //   this.dataurl.no=this.dataurl.no.replace('+62','62');
    // }

    // if(this.dataurl.no.substr(0,2) != '62'){
    //   this.presentAlert();
    //   return;
    // }

    if(this.dataurl.no.substr(0,1) == '0'){
      this.dataurl.no=this.dataurl.con+this.dataurl.no.substr(1);
    }else if(this.dataurl.no.substr(0,2) != this.dataurl.con){
      this.presentAlert();
      return;
    }

    this.dataurl.url='https://wa.me/'+this.dataurl.no;
    this.dataurl.no=no;

    this.load_fakegps()
  }
  
}
