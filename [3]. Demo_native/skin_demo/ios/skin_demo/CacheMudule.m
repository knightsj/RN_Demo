//
//  CacheMudule.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/27.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CacheMudule.h"


#ifndef NSFoundationVersionNumber_iOS_8_0
#define NSFoundationVersionNumber_With_QoS_Available 1140.11
#else
#define NSFoundationVersionNumber_With_QoS_Available NSFoundationVersionNumber_iOS_8_0
#endif


static dispatch_queue_t wso_cache_io_queue() {
  
  static dispatch_queue_t queue;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    dispatch_queue_attr_t attr = DISPATCH_QUEUE_SERIAL;
    if (NSFoundationVersionNumber >= NSFoundationVersionNumber_With_QoS_Available) {
      attr = dispatch_queue_attr_make_with_qos_class(attr, QOS_CLASS_BACKGROUND, 0);
    }
    queue = dispatch_queue_create("com.wso.caching.io", attr);
  });
  
  return queue;
}

@implementation CacheMudule

- (void)clearAllCacheWithCompletionBlock:(WSOClearCacheCompletionBlock _Nullable)completionBlock{
  
  dispatch_async(wso_cache_io_queue(), ^{
    
    NSFileManager *fileManager = [[NSFileManager alloc] init];
    
    NSError *removeCacheFolderError = nil;
    NSError *createCacheFolderError = nil;
    [_fileManager removeItemAtPath:_cacheBasePath error:&removeCacheFolderError];
    
    if (!removeCacheFolderError) {
      
      [_fileManager createDirectoryAtPath:_cacheBasePath
              withIntermediateDirectories:YES
                               attributes:nil
                                    error:&createCacheFolderError];
      
      if (!createCacheFolderError) {
        
        if (_isDebugMode) {
          WSOLog(@"=========== Clearing cache succeed");
        }
        if (completionBlock) {
          dispatch_async(dispatch_get_main_queue(), ^{
            completionBlock(YES);
            return;
          });
        }
      }else{
        
        if (_isDebugMode) {
          WSOLog(@"=========== Clearing cache error: Failed to create cache folder after removing it");
        }
        if(completionBlock) {
          dispatch_async(dispatch_get_main_queue(), ^{
            completionBlock(NO);
            return;
          });
        }
      }
    }else{
      
      if (_isDebugMode) {
        WSOLog(@"=========== Clearing cache error: Failed to remove cache folder");
      }
      if (completionBlock) {
        dispatch_async(dispatch_get_main_queue(), ^{
          completionBlock(NO);
          return;
        });
      }
      
    };
  });
}

@end
