//
//  ViewController.m
//  rn_into_ios
//
//  Created by Sun Shijie on 2017/9/12.
//  Copyright © 2017年 Shijie. All rights reserved.
//

#import "ViewController.h"
#import <React/RCTRootView.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)jumpToRNPage:(UIButton *)sender {
    
    NSLog(@"跳转到RN页面");
    
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://192.168.1.18:8081/index.ios.bundle?platform=ios"];
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBundleURL : jsCodeLocation
                         moduleName        : @"DetailPage"
                         initialProperties : nil
                         launchOptions     : nil];
    UIViewController *vc = [[UIViewController alloc] init];
    vc.view = rootView;
    [self presentViewController:vc animated:YES completion:nil];
}


@end
