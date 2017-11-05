//
//  SkinManager.h
//  skin
//
//  Created by Sun Shijie on 2017/10/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SkinUtils.h"

//Log输出
#ifdef DEBUG
#define SKLog(...) NSLog(@"%s 第%d行 \n %@\n",__func__,__LINE__,[NSString stringWithFormat:__VA_ARGS__])
#else
#define SKLog(...)
#endif


typedef void(^SkinZipDownloadSuccess)(id object);
typedef void(^SkinZipDownloadProgress)(NSProgress *progress);
typedef void(^SkinZipDownloadFailure)(NSError *error);


@interface SkinManager : NSObject

//获取单例
+ (instancetype)sharedManager;


/**
 *  下载某个皮肤
 *
 *  @param skin               皮肤名称或者ID
 *  @param url                皮肤包zip下载地址
 *  @param successBlock       success callback
 *  @param progress           progress callback
 *  @param failureBlock       failure callback
 *
 */
- (void)downloadSkin:(NSString *)skin
                 url:(NSString *)url
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock;

/**
 *  下载某个皮肤
 *
 *  @param skin               皮肤名称或者ID
 *  @param url                皮肤包zip下载地址
 *  @param info               皮肤的其他信息
 *  @param successBlock       success callback
 *  @param progress           progress callback
 *  @param failureBlock       failure callback
 *
 */
- (void)downloadSkin:(NSString *)skin
                 url:(NSString *)url
                info:(NSDictionary *)dict
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock;


/**
 *  记录当前的皮肤
 *
 *  @param currentSkin              当前的皮肤名称或者ID
 */
- (void)setCurrentSkin:(NSString *)currentSkin;


/**
 *  记录上一个皮肤
 *
 *  @param currentSkin              上一个皮肤名称或者ID
 */
- (void)setLastSkin:(NSString *)lastSkin;


/**
 *  获取当前使用的皮肤
 */
- (NSString *)getCurrentSkin;

/**
 *  获取上一个使用的皮肤
 */
- (NSString *)getLastSkin;


/**
 *  是否包含当前皮肤
 *
 *  @param skin              需要查询的皮肤名称或者ID
 */
- (BOOL)containsSkin:(NSString *)skin;


/**
 *  打印当前可以使用的所有皮肤的信息
 *
 */
- (void)logSkinInfo;

@end

