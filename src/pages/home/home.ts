import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import * as EXIF from 'exif-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  img:string;
  isPhoto :boolean= false;
  constructor(
      public navCtrl: NavController,
      private imagePicker: ImagePicker
    ) {
    this.img ="../../assets/imgs/noImg.jpg";
  }


  loaded(e) {
    alert('load');
    alert(JSON.stringify(e));
    console.log(e);
    EXIF.getData(e.target, function () {
      //console.log(e.target);
      var allMetaData = EXIF.getAllTags(this);
      console.log(allMetaData);
      var make = EXIF.getTag(this, "Make");
      var model = EXIF.getTag(this, "Model");
      console.log(make);
      console.log(model);
      console.log(EXIF.getTag(this, "DateTime"));

      alert(make);
      alert(model);
      alert(EXIF.getTag(this, "DateTime"));
      alert(JSON.stringify(allMetaData));
    });
  }

  openGallery() {
    let options = {
      title :'Select Picture',
      message :'Select Atleast one picture',
      maximumImagesCount:1,
      outputType:0

    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        this.img = results[i];        
        console.log('Image URI: ' + results[i]);
        alert('Image URI: ' + results[i]);

        //this.loaded(results[i]);
        this.isPhoto = true;
      }
    }, (err) => { 
      alert(JSON.stringify(err));
    });
  }
}
