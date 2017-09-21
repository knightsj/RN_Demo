//
//  SkinViewController.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/21.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinViewController.h"
#import "SkinManagerModule.h"

@interface SkinViewController ()

@property (nonatomic, strong) SkinManagerModule *skinModule;
@end

@implementation SkinViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
  self.skinModule = [[SkinManagerModule alloc] init];
  
  
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)blueSkin:(UIButton *)sender {
    
    //更换为蓝色皮肤
  [self.skinModule changeSkinWithName:@"blue"];
  
  
}


- (IBAction)redSkin:(UIButton *)sender {
    
  //更换为红色皮肤
  [self.skinModule changeSkinWithName:@"red"];
  
    
}


@end
