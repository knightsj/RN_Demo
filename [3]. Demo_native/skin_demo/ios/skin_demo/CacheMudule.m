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


RCT_EXPORT_METHOD(calculateCacheSizeWithCompletionBlock:(RCTResponseSenderBlock)callback){
  
  NSURL *diskCacheURL = [NSURL fileURLWithPath:[self getCahcePath] isDirectory:YES];
  
  dispatch_async(iwant_cache_io_queue(), ^{
    
    NSUInteger fileCount = 0;
    NSUInteger totalSize = 0;
    
    NSFileManager *fileManager = [[NSFileManager alloc] init];
    
    NSDirectoryEnumerator *fileEnumerator = [fileManager enumeratorAtURL:diskCacheURL
                                               includingPropertiesForKeys:@[NSFileSize]
                                                                  options:NSDirectoryEnumerationSkipsHiddenFiles
                                                             errorHandler:NULL];
    
    for (NSURL *fileURL in fileEnumerator) {
      NSNumber *fileSize;
      [fileURL getResourceValue:&fileSize forKey:NSURLFileSizeKey error:NULL];
      totalSize += fileSize.unsignedIntegerValue;
      fileCount += 1;
    }
    
    NSString *sizeStr = nil;
    if (totalSize <10000) {
      sizeStr = [NSString stringWithFormat:@"%f kb",(totalSize * 1.0/1024)];
    }else{
      sizeStr = [NSString stringWithFormat:@"%f mb",totalSize * 1.0/(1024 *1024)];
    }
    if (callback) {
      dispatch_async(dispatch_get_main_queue(), ^{
        callback(@[totalSize]);
      });
    }
  });
  
}

- (NSString *)getCahcePath{
  
  NSArray* paths =NSSearchPathForDirectoriesInDomains(NSCachesDirectory,NSUserDomainMask,YES);
  
  NSString* cachesDirectory = [paths objectAtIndex:0];
  
  return cachesDirectory;

}

@end
