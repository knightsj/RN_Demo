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


static dispatch_queue_t iwant_cache_io_queue() {
  
  static dispatch_queue_t queue;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    dispatch_queue_attr_t attr = DISPATCH_QUEUE_SERIAL;
    if (NSFoundationVersionNumber >= NSFoundationVersionNumber_With_QoS_Available) {
      attr = dispatch_queue_attr_make_with_qos_class(attr, QOS_CLASS_BACKGROUND, 0);
    }
    queue = dispatch_queue_create("com.iwant.caching.io", attr);
  });
  
  return queue;
}

@implementation CacheMudule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(clearAllCache:(RCTResponseSenderBlock)callback){
  
  dispatch_async(iwant_cache_io_queue(), ^{
    
    NSFileManager *fileManager = [[NSFileManager alloc] init];
    
    NSError *removeCacheFolderError = nil;
    NSError *createCacheFolderError = nil;
    NSString *cachePath = [self getCahcePath];
    [fileManager removeItemAtPath:cachePath error:&removeCacheFolderError];
    
    if (!removeCacheFolderError) {
      
      [fileManager createDirectoryAtPath:cachePath
              withIntermediateDirectories:YES
                               attributes:nil
                                    error:&createCacheFolderError];
      
      if (!createCacheFolderError) {
        
        if (callback) {
            callback(@[@1]);
        }
      }else{
        
        if(callback) {
            callback(@[@0]);
            return;
        }
      }
    }else{

      if (callback) {
          callback(@[@0]);
          return;
      }
      
    };
  });
}

- (NSString *)getCahcePath{
  
  NSArray* paths =NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES);
  
  NSString* cachesDirectory = [paths objectAtIndex:0];
  
  return cachesDirectory;

}

@end
