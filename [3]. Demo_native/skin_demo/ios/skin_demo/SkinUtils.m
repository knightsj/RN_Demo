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
  return [NSString stringWithFormat:@"%@/skin/%@",[self documentFolderPath],skinName];
}


+ (NSString *)generateSkinColorJSONPathWithSkinName:(NSString *)skinName{
  
  return [NSString stringWithFormat:@"%@/skin/%@/color.json",[self documentFolderPath],skinName];
}


+ (NSString *)generateSkinConfigFilePath{
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
  return filePath;
}

+ (NSMutableDictionary *)generateSkinConfigDict{
  
  NSMutableDictionary *configDict = [[NSMutableDictionary alloc] initWithContentsOfFile:[self generateSkinConfigFilePath]];
  return configDict;
}

+ (NSString *)documentFolderPath{
  NSArray *documentsPathArr = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentPath = [documentsPathArr lastObject];
  return documentPath;
}

@end
