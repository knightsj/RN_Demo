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
  NSLog(@"修改皮肤为：%@",skinName);
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSArray *keys = [dict allKeys];
  if ([keys containsObject:skinName]) {
    NSLog(@"有当前皮肤");
    //给RN发通知
    [self emittChangeSkinEventSkinName:skinName];
    
    //给原生换肤
    
    
  }else{
    NSLog(@"没有当前皮肤");
  }
}



RCT_EXPORT_METHOD(getColor:(NSString *)stateName color:(NSString*)colorName callback:(RCTResponseSenderBlock)callback){
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];

  NSDictionary * dict = [self returnColorStateDictWithStateName:stateName colorName:colorName inConfigureDict:configdict];
  callback(@[dict]);
}


RCT_EXPORT_METHOD(getColors:(NSArray *)states color:(NSArray*)colorNames callback:(RCTResponseSenderBlock)callback){

  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  
  if ([states count] == [colorNames count]) {
     NSInteger length = [colorNames count];
     NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
    for (NSInteger index = 0; index < length; index ++) {
      [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:states[index] colorName:colorNames[index] inConfigureDict:configdict]];
    }
    NSLog(@"返回批量色值（数组）%@",dict);
    callback(@[dict]);
  }
}

RCT_EXPORT_METHOD(getColorsWithDict:(NSDictionary *)stateAndColorNameDict callback:(RCTResponseSenderBlock)callback){
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  
  NSArray *keys = [stateAndColorNameDict allKeys];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  for (NSUInteger index = 0; index < [keys count]; index++) {
    NSString *state = keys[index];
    NSString *colorName = [stateAndColorNameDict objectForKey:state];
    [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:state colorName:colorName inConfigureDict:configdict]];
  }
  NSLog(@"返回批量色值（字典）%@",dict);
  callback(@[dict]);
}



- (NSDictionary *)returnColorStateDictWithStateName:(NSString *)stateName colorName:(NSString *)colorName inConfigureDict:(NSDictionary *)configdict{
  
  NSString *current_skin = [[NSUserDefaults standardUserDefaults] objectForKey:@"current_skin"];
  NSString *colorValue = nil;
  if (current_skin.length == 0) {
    NSLog(@"没有设置主题，取当前主题默认色值");
    colorValue = @"#FB5C89";
  }
  
  NSArray *keys = [configdict allKeys];
  
  //找到当前主题的配置
  if ([keys containsObject:current_skin]) {
    colorValue = [[configdict objectForKey:current_skin] objectForKey:colorName];
    NSString *defaultColorValue = [[configdict objectForKey:current_skin] objectForKey:@"color_1"];
    
    if (colorValue.length == 0) {
      if (defaultColorValue.length > 0) {
        NSLog(@"有设置主题，但是当前颜色名取不到对应的色值，取当前主题默认色值");
        colorValue = defaultColorValue;
      }else{
        NSLog(@"有设置主题，但是当前颜色名取不到对应的色值，而且没有主题默认色值，则取默认主题的默认色值");
        colorValue = @"#FB5C89";
      }
    }
    
  }else{
    NSLog(@"没有设置主题，取当前主题默认色值");
    colorValue = @"#FB5C89";
  }
  
  
  NSDictionary *stateColorDict = @{stateName:colorValue};
  NSLog(@"返回色值%@",stateColorDict);
  
  return stateColorDict;
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
