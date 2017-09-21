//
//  SkinManagerModule.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinManagerModule.h"

@implementation SkinManagerModule

- (void)changeSkinWithName:(NSString *)skinName{
  
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
  }else{
    NSLog(@"没有当前皮肤");
  }
  
}

@end
