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
  constructor(private _videoService:VideoService) { }
  onSelectVideo(video:any){
    this.selectedVideo=video;
    console.log(this.selectedVideo);
  }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe(resVideoData=>this.videos=resVideoData);
  }

}
