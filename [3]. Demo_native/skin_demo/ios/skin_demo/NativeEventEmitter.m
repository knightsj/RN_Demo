//
//  NativeEventEmitter.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "NativeEventEmitter.h"

@implementation NativeEventEmitter

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"RNChangeSkin"];//有几个就写几个
}

-(void)emittChangeSkinEventSkinName:(NSString*)skinName
{
  [self sendEventWithName:@"RNChangeSkin"
                     body:@{@"skinName": skinName}];
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}



@end
