import {VideoService} from './../video.service';
import { Component, OnInit } from '@angular/core';
import {Video} from './../video';

@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.css'],
  providers:[VideoService]
})
export class VideoComponentComponent implements OnInit {


  videos:Array<Video>;
  selectedVideo:Video;
  private hiddenewVideo:boolean=true;
  constructor(private _videoService:VideoService) { }
  onSelectVideo(video:any){
    this.selectedVideo=video;
    this.hiddenewVideo=true;
    console.log(this.selectedVideo);
  }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData=>this.videos=resVideoData);
  }
  onSubmitAddVideo(video:Video){
    this._videoService.addVideo(video)
    .subscribe(resNewVideo=>{
      this.videos.push(resNewVideo);
      this.hiddenewVideo=true;
      this.selectedVideo=resNewVideo;
    });
  }
  newVideo(){
    this.hiddenewVideo=false;
  }
  onUpdateVideoEvent(video:any){
    this._videoService.updateVideo(video)
    .subscribe(resUpdatedVideo =>video=resUpdatedVideo);
    this.selectedVideo=null;
  }
  onDeleteVideoEvent(video:any){
    let videoArray=this.videos;
    this._videoService.deleteVideo(video)
    .subscribe(resDeletedVideo=>{
      for(let i=0;i<videoArray.length;i++)
      {
        if(videoArray[i]._id===video._id)
        {
          videoArray.splice(i,1);
        }
      }
    });
    this.selectedVideo=null;
  };
}
