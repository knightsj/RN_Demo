//
//  NativeEventEmitter.h
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/25.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@interface NativeEventEmitter : RCTEventEmitter

-(void)emittChangeSkinEventSkinName:(NSString*)skinName;

@end
