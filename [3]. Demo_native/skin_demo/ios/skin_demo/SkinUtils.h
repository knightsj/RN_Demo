//
//  SkinUtils.h
//  skin_demo
//
//  Created by Sun Shijie on 2017/10/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SkinUtils : NSObject

//获取皮肤包的路径
+ (NSString *)generateSkinFolderPathWithSkinName:(NSString *)skinName;

//获取皮肤包里的颜色配置文件路径（color.json）
+ (NSString *)generateSkinColorJSONPathWithSkinName:(NSString *)skinName;

//获取Bundle中皮肤的plist文件路径(skin.plist)
+ (NSString *)generateBundelSkinConfigFilePath;

//获取沙盒中皮肤的plist文件路径(skin.plist)
+ (NSString *)generateSandboxSkinConfigFilePath;

//获取皮肤的plist字典(skin.plist -> NSDictionary)
+ (NSMutableDictionary *)generateBundleSkinConfigDict;

+ (NSMutableDictionary *)generateSandboxSkinConfigDict;


@end
