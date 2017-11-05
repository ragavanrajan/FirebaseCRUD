import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

shoppingListRef$: FirebaseListObservable<ShoppingItem[]> 

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, 
    private actionsheetctrl:ActionSheetController) {

    /*Pointing shoppinglistRef$ at firebase -> 'shopping-list' node. 
     that means not only we can push things from reference to the database,
     but also we have access to everything inside of the node. */ 


    this.shoppingListRef$=this.database.list('shopping-list'); 

  }

selectShoppingItem(shoppingItem:ShoppingItem) {
 /* Display an action sheet that gives the user with the following options:

 1. Edit the shopping item
 2. Delete the shopping item 
 3. Cancel the shopping item 
 */ 

this.actionsheetctrl.create({
  title:`${shoppingItem.itemName}`,
  buttons: [
    {
      text:'Edit',
      handler:() => {
        //send the user to the edit shopping item page and pass the key as a parameter 
this.navCtrl.push(EditShoppingItemPage, { shoppingItemId:shoppingItem.$key })

/**
 * Navigation Stack: 
 * ['shoppingListpage' :
 *  'EditShoppingItemPage' { shoppingItemid: ' -Kqu4VLKqpPX6dTF-Uo-'} in firebase Ring item id ]
 */
        }
      },
      {
        text: 'Delete',
        role: 'Destructive',
        handler:() => {
          //Delete the current shopping Item, passed in via the parameter 
          this.shoppingListRef$.remove(shoppingItem.$key);

        }

         },
      {
        text: 'Cancel',
        role: 'cancel',
        handler:() => {
          console.log("The user has selected the cancel button");
        }
      }   
  ]
}).present();

}

  navigateToAddShoppingPage(){

    // navigate the users to the add shopping page 

    this.navCtrl.push(AddShoppingPage);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }*/

}
