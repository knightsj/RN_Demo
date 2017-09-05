//
//  LogHelper.m
//  ios_native_demo
//
//  Created by Sun Shijie on 2017/9/5.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "LogHelper.h"

@implementation LogHelper

RCT_EXPORT_MODULE();

//- (void)logMessage:(NSString *)message{
//     NSLog(@"==========%@",message);
//}

RCT_EXPORT_METHOD(logMessage:(NSString *)message){
    NSLog(@"==========%@",message);
}
@end
