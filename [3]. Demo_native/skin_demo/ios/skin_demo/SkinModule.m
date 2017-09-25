//
//  SkinModule.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinModule.h"

@implementation SkinModule


RCT_EXPORT_MODULE();


RCT_EXPORT_METHOD(currentSkinName:(RCTResponseSenderBlock)callback){

   NSString *skinName = [[NSUserDefaults standardUserDefaults] objectForKey:@"current_skin"];
   callback(@[skinName]);
}



RCT_EXPORT_METHOD(changeSkinWithName:(NSString *)skinName){
  
  //首先修改本地主题
  [[NSUserDefaults standardUserDefaults] setValue:skinName forKey:@"current_skin"];
  
  //
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSArray *keys = [dict allKeys];
  if ([keys containsObject:skinName]) {
    NSLog(@"有当前皮肤");
    NSString *skin_color = [[dict objectForKey:skinName] objectForKey:@"color"];
    NSLog(@"%@",skin_color);
    
    //给RN发通知

    [self emittChangeSkinEventSkinName:skinName];
    
    //给原生换肤
    
    
  }else{
    NSLog(@"没有当前皮肤");
  }
}


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"RNChangeSkin"];//有几个就写几个
}

-(void)emittChangeSkinEventSkinName:(NSString*)skinName
{
  [self sendEventWithName:@"RNChangeSkin"
                     body:@{@"skinName": skinName}];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}







@end
