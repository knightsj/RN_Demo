//
//  SkinUtils.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinUtils.h"

@implementation SkinUtils


+ (NSString *)generateSkinFolderPathWithSkinName:(NSString *)skinName{
  return [NSString stringWithFormat:@"~/Documents/skin/%@",skinName];
}


+ (NSString *)generateSkinColorJSONPathWithSkinName:(NSString *)skinName{
  return [NSString stringWithFormat:@"~/Documents/skin/%@/color.json",skinName];
}


+ (NSString *)generateSkinConfigFilePath{
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  return filePath;
}

+ (NSMutableDictionary *)generateSkinConfigDict{
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  NSMutableDictionary *configDict = [[NSMutableDictionary alloc] initWithContentsOfFile:filePath];
  return configDict;
}


@end
