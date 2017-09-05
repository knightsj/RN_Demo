//
//  LogHelper.h
//  ios_native_demo
//
//  Created by Sun Shijie on 2017/9/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@interface LogHelper : NSObject<RCTBridgeModule>

- (void)logMessage:(NSString *)message;

@end
