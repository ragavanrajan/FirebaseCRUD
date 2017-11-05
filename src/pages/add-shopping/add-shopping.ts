import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from  'angularfire2/database';


import { ShoppingItem } from '../../models/shopping-items/shopping-items.interface';


/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {
/**
 creating a new new object 
 * @type {Object}
 */
shoppingItem = {} as ShoppingItem 

ShoppingItemRef$: FirebaseListObservable <ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase ) {

  	this.ShoppingItemRef$=this.database.list('shopping-list');


  	/*
  	
	shopping-list: 
		0: 
			itemName: 'pizza',
			itemNumber: 1

		1 
			itemName : 'cheesecake',
			itemNumber : 5

  	 */
  }


addShoppingItem (shoppingItem:ShoppingItem){
/**
 * [log the results in console ]
 * @param {[type]} shoppingItem [description]
 */
/*console.log(shoppingItem);*/

/*
 	create a new anonymous object and convert item number  to a number
 	push this to our firedatabse under the shopping-list node
 */

this.ShoppingItemRef$.push({

	itemName: this.shoppingItem.itemName,
	itemNumber: Number(this.shoppingItem.itemNumber)
});

//Reset our shopping item 

this.shoppingItem= {} as ShoppingItem;

//Navigate the user to the shopping list page 

this.navCtrl.pop();

}


 /* ionViewDidLoad() {
    console.log('ionViewDidLoad AddShoppingPage');
  }*/

}
