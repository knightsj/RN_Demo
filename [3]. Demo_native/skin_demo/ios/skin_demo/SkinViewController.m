//
//  SkinViewController.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "SkinManager.h"

@interface SkinViewController ()
@end

@implementation SkinViewController

- (void)viewDidLoad {
    [super viewDidLoad];
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Route"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.view = rootView;
//  [self presentViewController:vc animated:YES completion:nil];
  
  

}

- (IBAction)downloadSkin:(UIButton *)sender {
  
  [[SkinManager sharedManager] downloadSkin:@"purple" url:@"http://oih3a9o4n.bkt.clouddn.com/purple.zip"  success:^(id object) {
    
  } progress:^(NSProgress *progress) {
    
  } falure:^(NSError *error) {
    
  }];
  
}

//点击弹出RN界面
- (IBAction)jumpToSkinSettingPage:(UIButton *)sender {
  
  NSURL *jsCodeLocation;
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Route"
                                               initialProperties:nil
                                                   launchOptions:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  UIViewController *vc = [[UIViewController alloc] init];
  vc.view = rootView;
  [self presentViewController:vc animated:YES completion:nil];
  
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}



@end
