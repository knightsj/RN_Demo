//
//  SkinModule.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinModule.h"
//#import "SkinManager.h"
#import "SkinUtils.h"

@implementation SkinModule


RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"RNChangeSkin"];//有几个就写几个
}

-(void)emittChangeSkinEventSkinName:(NSString*)skinName
{
  NSLog(@"通知RN更换皮肤");
  [self sendEventWithName:@"RNChangeSkin"
                     body:@{@"skinName": skinName}];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}



RCT_EXPORT_METHOD(currentSkinName:(RCTResponseSenderBlock)callback){

   NSString *skinName = [[NSUserDefaults standardUserDefaults] objectForKey:@"current_skin"];
   callback(@[skinName]);
}



RCT_EXPORT_METHOD(changeSkinWithName:(NSString *)skinName){

  NSString *lastSkinName = [[NSUserDefaults standardUserDefaults] objectForKey:@"current_skin"];

  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSArray *keys = [dict allKeys];
  if ([keys containsObject:skinName]) {
    
//    [SkinManager sharedManager].lastSkin = lastSkinName;
//    NSLog(@"保存上一个皮肤为：%@",lastSkinName);
    
    [[NSUserDefaults standardUserDefaults] setValue:skinName forKey:@"current_skin"];
    NSLog(@"修改皮肤为：%@",skinName);
    
    [self emittChangeSkinEventSkinName:skinName];
    
    //给原生换肤
    
    
  }else{
    NSLog(@"没有当前皮肤");
  }
}


#pragma mark - Color bridge

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


#pragma mark - Image bridge

RCT_EXPORT_METHOD(getImage:(NSString *)stateName imageName:(NSString*)imageName callback:(RCTResponseSenderBlock)callback){
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSDictionary *dict = [self returnImageStateDictWithStateName:stateName imageName:imageName inConfigureDict:configdict];
  callback(@[dict]);
}


RCT_EXPORT_METHOD(getImages:(NSArray *)stateNames imageName:(NSArray *)imageNames callback:(RCTResponseSenderBlock)callback){
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  if ([stateNames count] == [imageNames count]) {
    NSUInteger length = [stateNames count];
    for (NSUInteger index = 0; index < length;  index++) {
      
      [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:stateNames[index] imageName:imageNames[index] inConfigureDict:configdict]];
    }
  }
  
  callback(@[dict]);
}

RCT_EXPORT_METHOD(getImagesDict:(NSDictionary *)stateAndColorNameDict callback:(RCTResponseSenderBlock)callback){
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configdict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  NSArray *keys = [stateAndColorNameDict allKeys];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
 
    for (NSUInteger index = 0; index < [keys count];  index++) {
      NSString *state = keys[index];
      NSString *imageName = [stateAndColorNameDict objectForKey:state];
      [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:state imageName:imageName inConfigureDict:configdict]];
    }
  
  callback(@[dict]);
}



- (NSDictionary *)returnImageStateDictWithStateName:(NSString *)stateName imageName:(NSString *)imageName inConfigureDict:(NSDictionary *)configdict{

  NSArray *keys = [configdict allKeys];
  NSString *current_skin = [[NSUserDefaults standardUserDefaults] objectForKey:@"current_skin"];
  NSString *imagePath = nil;
  NSString *skinFolderPath = [self getSkinFolderPathWithSkinName:current_skin];
  
  //找到当前主题的配置
  if ([keys containsObject:current_skin]) {
    
    //查看是内置的还是在沙盒中
    NSDictionary *currentSkinDict = [configdict objectForKey:current_skin];
    NSString *localPath = [currentSkinDict objectForKey:@"local_path"];
    
    if (localPath.length == 0) {
      
    }else if ([localPath isEqualToString:@"bundle"]){
      NSLog(@"即将获取bundle的皮肤资源");
      imagePath = [NSString stringWithFormat:@"%@_%@",current_skin,imageName];
      
      
    }else if ([localPath isEqualToString:skinFolderPath]){
      
      NSLog(@"即将获取沙盒中的皮肤资源");
      imagePath = [NSString stringWithFormat:@"%@/%@",skinFolderPath,[NSString stringWithFormat:@"%@_%@",current_skin,imageName]];
      
    }else{
      
    }
    
  }else{
    
  }

  NSDictionary *stateImageDict = @{stateName:imagePath};
  NSLog(@"返回图片%@",stateImageDict);
  return stateImageDict;
  
}

- (NSString *)getSkinFolderPathWithSkinName:(NSString *)skinName{
  return [NSString stringWithFormat:@"~/Documents/skin/%@",skinName];
}



@end
