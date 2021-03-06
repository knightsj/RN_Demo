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
  return [NSString stringWithFormat:@"%@/Caches/Theme/Skin/%@",[self documentFolderPath],skinName];
}


+ (NSString *)generateSkinColorJSONPathWithSkinName:(NSString *)skinName{
  return [NSString stringWithFormat:@"%@/Caches/Theme/Skin/%@/color.json",[self documentFolderPath],skinName];
}

+ (NSString *)generateBundelSkinConfigFilePath{
  return [[NSBundle mainBundle] pathForResource:@"skin" ofType:@"plist"];
}

+ (NSString *)generateSandboxSkinConfigFilePath{
  return [NSString stringWithFormat:@"%@/skin/skin.plist",[self documentFolderPath]];
}


+ (NSMutableDictionary *)generateBundleSkinConfigDict{
  
  NSMutableDictionary *configDict = [[NSMutableDictionary alloc] initWithContentsOfFile:[self generateBundelSkinConfigFilePath]];
  return configDict;
}

+ (NSMutableDictionary *)generateSandboxSkinConfigDict{
//  NSMutableDictionary *configDict = [[NSMutableDictionary alloc] initWithContentsOfFile:[self generateSandboxSkinConfigFilePath]];
  NSDictionary *configDict = [[NSUserDefaults standardUserDefaults] objectForKey:@"skin_config"];
  return [configDict mutableCopy];
}



+ (NSString *)documentFolderPath{
  NSArray *documentsPathArr = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentPath = [documentsPathArr lastObject];
  return documentPath;
}

@end
