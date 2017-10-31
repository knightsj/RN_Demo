//
//  SkinManager.h
//  skin
//
//  Created by Sun Shijie on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkinUtils.h"


#if __has_include(<AFNetworking/AFNetworking.h>)
#import <AFNetworking/AFNetworking.h>
#else
#import "AFNetworking.h"
#endif


typedef void(^SkinZipDownloadSuccess)(id object);
typedef void(^SkinZipDownloadProgress)(NSProgress *progress);
typedef void(^SkinZipDownloadFailure)(NSError *error);


@interface SkinManager : NSObject


+ (instancetype)sharedManager;

- (void)downloadSkin:(NSString *)skinName
                 url:(NSString *)url
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock;

- (void)setCurrentSkin:(NSString *)currentSkin;
- (void)setLastSkin:(NSString *)lastSkin;

- (NSString *)getCurrentSkin;
- (NSString *)getLastSkin;

- (NSArray *)availableSkins;

@end

