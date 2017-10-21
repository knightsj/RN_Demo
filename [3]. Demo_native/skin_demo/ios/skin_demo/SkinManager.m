//
//  SkinManager.m
//  skin_demo
//
//  Created by Sun Shijie on 2017/9/26.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "SkinManager.h"
#import "ZipArchive.h"
#import "SkinUtils.h"


#if __has_include(<AFNetworking/AFNetworking.h>)
#import <AFNetworking/AFNetworking.h>
#else
#import "AFNetworking.h"
#endif

//Log输出
#ifdef DEBUG
#define SKLog(...) NSLog(@"%s 第%d行 \n %@\n\n",__func__,__LINE__,[NSString stringWithFormat:__VA_ARGS__])
#else
#define SKLog(...)
#endif

@interface SkinManager()

@property (nonatomic, strong) NSURLSessionDownloadTask *downloadTask;

@end


@implementation SkinManager

+ (instancetype)sharedManager
{
  static SkinManager *_manager = nil;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    _manager = [[[self class] alloc] init];
  });
  return _manager;
}

- (void)downloadSkin:(NSString *)skinName
                 url:(NSString *)url
             success:(SkinZipDownloadSuccess)successBlock
            progress:(SkinZipDownloadProgress)progressBlock
              falure:(SkinZipDownloadFailure)failureBlock{

  //download url
  NSURL *download_url = [NSURL URLWithString:url];
  
  //zip file url
  NSString *cachesPath = [NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES) lastObject];
  NSString *zip_path = [cachesPath stringByAppendingPathComponent:download_url.lastPathComponent];
  NSURL *zip_url = [NSURL fileURLWithPath:zip_path];
  
  //unachive folder url
  NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString *documentPath = ([paths count] > 0) ? [paths objectAtIndex:0] : nil;
  NSString *folder_path = [documentPath stringByAppendingPathComponent:[NSString stringWithFormat:@"skin/%@",skinName]];
  
  
  SKLog(@"======= zip包即将下载。\nskin名称：%@ \n下载url：%@ \nzip包下载目标地址：%@",skinName,url,zip_path);
  
  //默认配置
  NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];
  
  //AFN3.0+基于封住URLSession的句柄
  AFURLSessionManager *manager = [[AFURLSessionManager alloc] initWithSessionConfiguration:configuration];
  //请求
  NSURLRequest *request = [NSURLRequest requestWithURL:download_url];
  
  //下载Task操作
  _downloadTask = [manager downloadTaskWithRequest:request progress:^(NSProgress * _Nonnull downloadProgress) {
    
    // 下载进度
    if (progressBlock) {
          SKLog(@"======= zip包正在下载。\n进度：%@ \nskin名称：%@ \nzip包下载目标地址：%@",downloadProgress, skinName,zip_path);
          progressBlock(downloadProgress);
    }
    
  } destination:^NSURL * _Nonnull(NSURL * _Nonnull targetPath, NSURLResponse * _Nonnull response) {
    
    //- block的返回值, 要求返回一个URL, 返回的这个URL就是文件的位置的路径
    return zip_url;
    
  } completionHandler:^(NSURLResponse * _Nonnull response, NSURL * _Nullable filePath, NSError * _Nullable error) {
    
    //设置下载完成操作
    // filePath就是你下载文件的位置，你可以解压，也可以直接拿来使用
    NSString *zip_path = [filePath path];// 将NSURL转成NSString
    SKLog(@"======= zip包下载完成，还未解压。\nskin名称：%@ \nzip包地址：%@",skinName,zip_path);
    
    ZipArchive* zip = [[ZipArchive alloc] init];
    if( [zip UnzipOpenFile:zip_path] ){
      BOOL result = [zip UnzipFileTo:folder_path overWrite:YES];
      if( NO==result ){
        //解压缩失败
        SKLog(@"======= zip包下载完成，但是解压缩失败。\nskin名称：%@ \nzip包位置：%@",skinName, zip_path);
        
      }
      [zip UnzipCloseFile];
      SKLog(@"======= zip包下载完成 并解压完毕。\nskin名称：%@：\nzip包地址：%@ \n解压后文件夹位置：%@",skinName,zip_path,folder_path);
      
      [self updateSkinInfoOfSkinName:skinName];
      
    }else{
        SKLog(@"======= zip包下载完成，但是解压缩失败。\nskin名称：%@ \nzip包位置：%@",skinName, zip_path);
    }
  }];
  
  [_downloadTask resume];
}


//更新skin的plist配置文件
- (void)updateSkinInfoOfSkinName:(NSString *)skinName{
  
  //拿到skin之后自动去皮肤包文件夹里查找json文件，获取信息，写入plist文件
  NSData *jsonData = [NSData dataWithContentsOfFile:[SkinUtils generateSkinColorJSONPathWithSkinName:skinName]];
  
  NSError *error;
  NSDictionary *dict = [NSJSONSerialization JSONObjectWithData:jsonData
                                                       options:NSJSONReadingMutableContainers
                                                         error:&error];
  if(error) {
     //返回失败
  }
  
  NSMutableDictionary *skin_info = [dict mutableCopy];
  [skin_info addEntriesFromDictionary:@{@"name":skinName,
                                         @"local_path":[SkinUtils generateSkinFolderPathWithSkinName:skinName]}];
  //更新配置字典
  NSMutableDictionary * configDict = [SkinUtils generateSkinConfigDict];
  [configDict setObject:skin_info forKey:skinName];
  
  //把更新后的配置字典写入plist文件
  [configDict writeToFile:[SkinUtils generateSkinConfigFilePath] atomically:YES];
  
  
}

- (NSString *)getLastSkin{
  
  return _lastSkin;
  
}


@end
