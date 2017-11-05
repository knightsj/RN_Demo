//
//  SkinModule.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinModule.h"
#import "SkinManager.h"

@implementation SkinModule

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}


RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"RNChangeSkin"];//有几个就写几个
}

//给RN页面的父组件发送更换皮肤的通知
- (void)emittChangeSkinEventSkinName:(NSString*)skinName
{
  SKLog(@"通知RN更换皮肤");
  [self sendEventWithName:@"RNChangeSkin"
                     body:@{@"skinName": skinName}];
}


//下载某个皮肤: url & skin
RCT_EXPORT_METHOD(downloadSkin:(NSString *)skin url:(NSString *)url callback:(RCTResponseSenderBlock)callback){
  
  [[SkinManager sharedManager] downloadSkin:skin
                                        url:url
                                    success:^(id object) {
                                      
       callback(@[[NSNull null],@"下载成功"]);
  } progress:nil falure:^(NSError *error) {
         callback(@[error,@"下载失败"]);
  }];
}

//下载某个皮肤 url & skin & parameter
RCT_EXPORT_METHOD(downloadSkin:(NSString *)skin url:(NSString *)url info:(NSDictionary*)infoDict callback:(RCTResponseSenderBlock)callback){
  
  [[SkinManager sharedManager] downloadSkin:skin
                                        url:url
                                       info:infoDict
                                    success:^(id object) {
                                      
    callback(@[[NSNull null],@"下载成功"]);
  } progress:nil falure:^(NSError *error) {
    callback(@[error,@"下载失败"]);
  }];
}



//当前是哪个皮肤
RCT_EXPORT_METHOD(currentSkin:(RCTResponseSenderBlock)callback){
   callback(@[[[SkinManager sharedManager] getCurrentSkin]]);
}

//是否包含某个皮肤
RCT_EXPORT_METHOD(containsSkin:(NSString*)skin callback:(RCTResponseSenderBlock)callback){
  
  NSString *skinFolderPath = [SkinUtils generateSkinFolderPathWithSkinName:skin];
  
  BOOL contains = [[SkinManager sharedManager] containsSkin:skin];
  NSString *result = nil;
  if (contains) {
    result = @"1";
  }else{
    result = @"0";
  }
  callback(@[result]);
}

//切换皮肤
RCT_EXPORT_METHOD(changeSkin:(NSString *)skinName callback:(RCTResponseSenderBlock)callback){

  NSMutableDictionary *dict = [SkinUtils generateSandboxSkinConfigDict];
  NSArray *keys = [dict allKeys];
  if ([keys containsObject:skinName]) {
    
    //设置上一个皮肤
    [[SkinManager sharedManager] setLastSkin:[[SkinManager sharedManager] getCurrentSkin]];
    //设置当前皮肤
    [[SkinManager sharedManager] setCurrentSkin:skinName];
    SKLog(@"======= 修改皮肤为：%@",skinName);
    
    //打印皮肤信息：
    [[SkinManager sharedManager] logSkinInfo];
    
    //给RN的根控制器发送换皮肤的消息
    [self emittChangeSkinEventSkinName:skinName];
    
    //给原生换肤
    
    callback(@[@"1"]);
    
    
  }else{
    SKLog(@"======= 没有当前皮肤");
    
    callback(@[@"0"]);
  }
}


#pragma mark - Color bridge

RCT_EXPORT_METHOD(getColor:(NSString *)stateName color:(NSString*)colorName callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  NSDictionary * dict = [self returnColorStateDictWithStateName:stateName colorName:colorName inConfigureDict:configDict];
  callback(@[dict]);
}

RCT_EXPORT_METHOD(getColors:(NSArray*)colorNames callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  NSInteger length = [colorNames count];
  for (NSInteger index = 0; index < length; index ++) {
    [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:colorNames[index] colorName:colorNames[index] inConfigureDict:configDict]];
  }
  callback(@[dict]);
}

RCT_EXPORT_METHOD(getColors:(NSArray *)states color:(NSArray*)colorNames callback:(RCTResponseSenderBlock)callback){

  
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  
  if ([states count] == [colorNames count]) {
     NSInteger length = [colorNames count];
     NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
    for (NSInteger index = 0; index < length; index ++) {
      [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:states[index] colorName:colorNames[index] inConfigureDict:configDict]];
    }
    SKLog(@"返回批量色值（数组）%@",dict);
    callback(@[dict]);
  }
}

RCT_EXPORT_METHOD(getColorsWithDict:(NSDictionary *)stateAndColorNameDict callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  
  NSArray *keys = [stateAndColorNameDict allKeys];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  for (NSUInteger index = 0; index < [keys count]; index++) {
    NSString *state = keys[index];
    NSString *colorName = [stateAndColorNameDict objectForKey:state];
    [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:state colorName:colorName inConfigureDict:configDict]];
  }
  SKLog(@"返回批量色值（字典）%@",dict);
  callback(@[dict]);
}


//返回颜色的state和名字的字典
- (NSDictionary *)returnColorStateDictWithStateName:(NSString *)stateName colorName:(NSString *)colorName inConfigureDict:(NSDictionary *)configDict{
  
  NSString *current_skin = [[SkinManager sharedManager] getCurrentSkin];
  NSArray *keys = [configDict allKeys];
  NSString *colorValue = nil;
  
  //找到当前主题的配置
  if ([keys containsObject:current_skin]) {
    colorValue = [[configDict objectForKey:current_skin] objectForKey:colorName];
    NSString *defaultColorValue = [[configDict objectForKey:current_skin] objectForKey:@"color_1"];
    
    if (colorValue.length == 0) {
      if (defaultColorValue.length > 0) {
        SKLog(@"有设置主题，但是当前颜色名取不到对应的色值，取当前主题默认色值");
        colorValue = defaultColorValue;
      }else{
        SKLog(@"有设置主题，但是当前颜色名取不到对应的色值，而且没有主题默认色值，则取默认主题的默认色值");
        colorValue = @"#FB5C89";
      }
    }
    
  }else{
    SKLog(@"没有设置主题，取当前主题默认色值");
    colorValue = @"#FB5C89";
  }
  
  
  NSDictionary *stateColorDict = @{stateName:colorValue};
  SKLog(@"返回色值%@",stateColorDict);
  
  return stateColorDict;
}


#pragma mark - Image bridge

RCT_EXPORT_METHOD(getImage:(NSString *)stateName imageName:(NSString*)imageName callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  NSDictionary *dict = [self returnImageStateDictWithStateName:stateName imageName:imageName inConfigureDict:configDict];
  callback(@[dict]);
}

RCT_EXPORT_METHOD(getImages:(NSArray *)imageNames callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict =  [SkinUtils generateSandboxSkinConfigDict];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  NSUInteger length = [imageNames count];
  for (NSUInteger index = 0; index < length;index++) {
    
    [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:imageNames[index] imageName:imageNames[index] inConfigureDict:configDict]];
  }
  callback(@[dict]);
}


RCT_EXPORT_METHOD(getImages:(NSArray *)stateNames imageName:(NSArray *)imageNames callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict =  [SkinUtils generateSandboxSkinConfigDict];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  if ([stateNames count] == [imageNames count]) {
    NSUInteger length = [stateNames count];
    for (NSUInteger index = 0; index < length;  index++) {
      
      [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:stateNames[index] imageName:imageNames[index] inConfigureDict:configDict]];
    }
  }
  
  callback(@[dict]);
}

RCT_EXPORT_METHOD(getImagesDict:(NSDictionary *)stateAndColorNameDict callback:(RCTResponseSenderBlock)callback){
  
  NSMutableDictionary *configDict =  [SkinUtils generateSandboxSkinConfigDict];
  NSArray *keys = [stateAndColorNameDict allKeys];
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
 
    for (NSUInteger index = 0; index < [keys count];  index++) {
      NSString *state = keys[index];
      NSString *imageName = [stateAndColorNameDict objectForKey:state];
      [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:state imageName:imageName inConfigureDict:configDict]];
    }
  
  callback(@[dict]);
}



- (NSDictionary *)returnImageStateDictWithStateName:(NSString *)stateName imageName:(NSString *)imageName inConfigureDict:(NSDictionary *)configDict{

  NSString *current_skin = [[SkinManager sharedManager] getCurrentSkin];
  NSString *skinFolderPath = [SkinUtils generateSkinFolderPathWithSkinName:current_skin];
  NSArray *keys = [configDict allKeys];
  NSString *imagePath = nil;
  
  //找到当前主题的配置
  if ([keys containsObject:current_skin]) {
    
    //查看是内置的还是在沙盒中
    NSDictionary *currentSkinDict = [configDict objectForKey:current_skin];
    NSString *localPath = [currentSkinDict objectForKey:@"local_path"];
    
    idfsdfsdfsdf (localPath.length == 0) {
      
      SKLog(@"localPath为空，无法获取图片");
      imagePath = @"";
      
    }else if ([localPath isEqualToString:@"bundle"]){
      SKLog(@"即将获取bundle的皮肤资源");
      imagePath = [NSString stringWithFormat:@"%@",imageName];
      
      
    }else if ([localPath isEqualToString:skinFolderPath]){
      
      SKLog(@"即将获取沙盒中的皮肤资源");
      imagePath = [NSString stringWithFormat:@"%@/%@",skinFolderPath,[NSString stringWithFormat:@"%@",imageName]];
      
    }else{
      
      SKLog(@"localPath内容不支持，无法获取图片");
      imagePath = @"no_image";
    }
    
  }else{
    
    SKLog(@"不存在当前要设定的，无法获取图片");
    imagePath = @"no_image";
    
  }

  NSDictionary *stateImageDict = @{stateName:imagePath};
  SKLog(@"返回图片%@",stateImageDict);
  return stateImageDict;
  
}

RCT_EXPORT_METHOD(getColorImageList:(NSArray *)colorList imageList:(NSArray *)imageList callback:(RCTResponseSenderBlock)callback){
  
  
  NSMutableDictionary *dict = [[NSMutableDictionary alloc] initWithCapacity:3];
  NSMutableDictionary *configDict = [SkinUtils generateSandboxSkinConfigDict];
  
  if ([colorList count]>0) {
    NSInteger length_1 = [colorList count];
    for (NSInteger index = 0; index < length_1; index ++) {
      [dict addEntriesFromDictionary:[self returnColorStateDictWithStateName:colorList[index] colorName:colorList[index] inConfigureDict:configDict]];
    }
  }
  
  if ([imageList count] > 0) {
    NSUInteger length_2 = [imageList count];
    for (NSUInteger index = 0; index < length_2; index++) {
      
      [dict addEntriesFromDictionary:[self returnImageStateDictWithStateName:imageList[index] imageName:imageList[index] inConfigureDict:configDict]];
    }
  }
  
  callback(@[dict]);
}


@end
