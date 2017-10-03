/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import ActionSheet from './ActionSheet'


export default class action_sheet extends Component {

  constructor(props) {
    super(props);

  }

  showAlertSelected(type){
      switch (type){

          case 0:{
              this.actionsheet0.show();
          }
          break;

          case 1:{
              this.actionsheet1.show();
          }
              break;

          case 2:{
              this.actionsheet2.show();
          }
              break;

          case 3:{
              this.actionsheet3.show();
          }
              break;
          case 4:{
              this.actionsheet4.show();
          }
              break;
          case 5:{
              this.actionsheet5.show();
          }
              break;
          case 6:{
              this.actionsheet6.show();
          }
              break;
          case 7:{
              this.actionsheet7.show();
          }
          break;

          case 8:{
              this.actionsheet8.show();
          }
              break;

          case 9:{
              this.actionsheet9.show();
          }
              break;
      }

  }

  takePhoto(){

    alert('take photo');

  }

  pickMultiple(){
    alert('pick multiple');
  }


  render() {





    return (
      <View style={styles.container}>
          <View style={styles.section}>
              <Text style={styles.title}>
                  default styles:
              </Text>
              <TouchableOpacity onPress={()=>this.showAlertSelected(0)}>
                  <Text style={styles.welcome}>
                      1. 3 selection without title
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(1)}>
                  <Text style={styles.welcome}>
                      2. 3 selection with title(one row)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(2)}>
                  <Text style={styles.welcome}>
                      3. 3 selection with title(two rows, testAlign is left)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(3)}>
                  <Text style={styles.welcome}>
                      4. 3 selection with title(two rows, testAlign is center)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(4)}>
                  <Text style={styles.welcome}>
                      5. 3 selection with title and without cancel
                  </Text>
              </TouchableOpacity>
          </View>

          <View style={styles.section}>
              <Text style={styles.title}>
                  iOS styles:
              </Text>
              <TouchableOpacity onPress={()=>this.showAlertSelected(5)}>
                  <Text style={styles.welcome}>
                      1. 3 selection without title
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(6)}>
                  <Text style={styles.welcome}>
                      2. 3 selection with title(one row)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(7)}>
                  <Text style={styles.welcome}>
                      3. 3 selection with title(two rows, testAlign is left)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(8)}>
                  <Text style={styles.welcome}>
                      4. 3 selection with title(two rows, testAlign is center)
                  </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.showAlertSelected(9)}>
                  <Text style={styles.welcome}>
                      5. 3 selection with title and without cancel
                  </Text>
              </TouchableOpacity>
          </View>

          <ActionSheet
              itemTitles = {["By phone","By message","By email"]}
              ref={(actionsheet0)=>{this.actionsheet0 = actionsheet0}}
          />
          <ActionSheet
            mainTitle="Are you sure to contact?"
            itemTitles = {["By phone","By message","By email"]}
            ref={(actionsheet1)=>{this.actionsheet1 = actionsheet1}}
          />
          <ActionSheet
              mainTitle="Are you sure to contact? Please choose one method to contact"
              itemTitles = {["By phone","By message","By email"]}
              ref={(actionsheet2)=>{this.actionsheet2 = actionsheet2}}
          />
          <ActionSheet
              mainTitle="Are you sure to contact? Please choose one method to contact"
              itemTitles = {["By phone","By message","By email"]}
              mainTitleTextAlign = 'center'
              ref={(actionsheet3)=>{this.actionsheet3 = actionsheet3}}
          />
          <ActionSheet
              mainTitle="Are you sure to contact?"
              itemTitles = {["By phone","By message","By email"]}
              hideCancel = {true}
              ref={(actionsheet4)=>{this.actionsheet4 = actionsheet4}}
          />

          {/*iOS style*/}
          <ActionSheet
              itemTitles = {["By phone","By message","By email"]}
              ref={(actionsheet5)=>{this.actionsheet5 = actionsheet5}}
              bottomSpace = {10}
              borderRadius = {5}
              sideSpace = {6}
              itemTitleColor = '#006FFF'
              cancelTitleColor = '#006FFF'
          />
          <ActionSheet
              mainTitle="Are you sure to contact?"
              itemTitles = {["By phone","By message","By email"]}
              ref={(actionsheet6)=>{this.actionsheet6 = actionsheet6}}
              bottomSpace = {10}
              borderRadius = {5}
              sideSpace = {6}
              itemTitleColor = '#006FFF'
              cancelTitleColor = '#006FFF'
          />
          <ActionSheet
              mainTitle="Are you sure to contact? Please choose one method to contact"
              itemTitles = {["By phone","By message","By email"]}
              ref={(actionsheet7)=>{this.actionsheet7 = actionsheet7}}
              bottomSpace = {10}
              borderRadius = {5}
              sideSpace = {6}
              itemTitleColor = '#006FFF'
              cancelTitleColor = '#006FFF'
          />
          <ActionSheet
              mainTitle="Are you sure to contact? Please choose one method to contact"
              itemTitles = {["By phone","By message","By email"]}
              mainTitleTextAlign = 'center'
              ref={(actionsheet8)=>{this.actionsheet8 = actionsheet8}}
              bottomSpace = {10}
              borderRadius = {5}
              sideSpace = {6}
              itemTitleColor = '#006FFF'
              cancelTitleColor = '#006FFF'
          />
          <ActionSheet
              mainTitle="Are you sure to contact?"
              itemTitles = {["By phone","By message","By email"]}
              hideCancel = {true}
              ref={(actionsheet9)=>{this.actionsheet9 = actionsheet9}}
              bottomSpace = {10}
              borderRadius = {5}
              sideSpace = {6}
              itemTitleColor = '#006FFF'
              cancelTitleColor = '#006FFF'
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    section:{
        marginTop:30
    },

  title: {
      marginBottom:10,
      fontWeight:'bold',
      fontSize:15

  },
});

AppRegistry.registerComponent('action_sheet', () => action_sheet);
