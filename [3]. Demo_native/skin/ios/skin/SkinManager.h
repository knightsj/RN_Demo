//
//  SkinManager.h
//  skin
//
//  Created by Sun Shijie on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void(^SkinZipDownloadSuccess)();
typedef void(^SkinZipDownloadProgress)(NSProgress *progress);
typedef void(^SkinZipDownloadFailure)(NSError *error);


@interface SkinManager : NSObject

@property (nonatomic, copy) NSString *lastSkin;

+ (instancetype)sharedManager;

- (void)downloadSkin:(NSString *)skinName
                 url:(NSString *)url
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock;

- (NSString *)getLastSkin;

//- (NSString *)getCurrentSkin;

@end
