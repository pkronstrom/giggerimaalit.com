import React from 'react';
import VideoContainer from 'components/videocontainer';
import VideoList from 'components/videolist';

export default React.createClass({

  getInitialState: function() {
    return {
      selectedVideo: "",
      videoList: []
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get("/api/videos", function (result) {
      var videolist = result;
      this.setState({videoList: videolist});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  selectVideo: function (vid) {
    this.setState({selectedVideo: vid});
  },

  render: function () {

    var videoContainer = this.state.selectedVideo ? 
      (<VideoContainer video={this.state.selectedVideo}/>) :
      (<div><img className="hand" src="/static/img/pointinghand.svg"></img></div>) ;

    return (
      <div>
        <div className="container justify-center">
          <div className="col-6 header">
            <div className="title">
              <img src="/static/img/gofore-g.svg" width="80px"></img>iggermaalit<span className="small">.com</span>
            </div>
          </div>
        </div>
        <div className="container justify-center">
          <div className="col-2 sidebar">
            <VideoList videos={this.state.videoList} selectVideo={this.selectVideo} />
          </div>
          <div className="col-6 videocontainer">
            {videoContainer}
          </div>
        </div>
      </div>
    );
  }
});
