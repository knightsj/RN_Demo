//
//  SkinManager.h
//  skin
//
//  Created by Sun Shijie on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkinUtils.h"

typedef void(^SkinZipDownloadSuccess)(id object);
typedef void(^SkinZipDownloadProgress)(NSProgress *progress);
typedef void(^SkinZipDownloadFailure)(NSError *error);


@interface SkinManager : NSObject

//获取单例
+ (instancetype)sharedManager;

//下载某个皮肤
- (void)downloadSkin:(NSString *)skinName
                 url:(NSString *)url
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock;

//获取当前使用的皮肤
- (NSString *)getCurrentSkin;

//获取上一个使用的皮肤
- (NSString *)getLastSkin;

//获取当前可以使用的所有皮肤
- (NSArray *)availableSkins;

@end

