//
//  SkinUtils.h
//  skin_demo
//
//  Created by Sun Shijie on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SkinUtils : NSObject

//获取颜色包的路径
+ (NSString *)generateSkinFolderPathWithSkinName:(NSString *)skinName;

//获取颜色包里的配置文件路径
+ (NSString *)generateSkinColorJSONPathWithSkinName:(NSString *)skinName;

//获取皮肤的plist文件路径
+ (NSString *)generateSkinConfigFilePath;

//获取皮肤的plist字典
+ (NSMutableDictionary *)generateSkinConfigDict;


@end
