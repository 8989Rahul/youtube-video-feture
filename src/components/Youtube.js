import React, { Component } from "react";
import axios from "axios";

/* https://www.googleapis.com/youtube/v3/search?key=AIzaSyDjql58JhCS2hoOZaIifZvMxq685fV0Iq8&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet */

const API_KEY = "AIzaSyDjql58JhCS2hoOZaIifZvMxq685fV0Iq8";
const channelId = "UCXgGY0wkgOzynnHvSEVmE3A";
const result = 10;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${result}`;

export default class Youtube extends Component {
  state = {
    videoId: []
  };
  clicked = () => {
    fetch(finalURL)
      .then(response => response.json())
      .then(responseJson => {
        var videoId = responseJson.items.map(
          obj => "https://www.youtube.com/embed/" + obj.id.videoId
        );
        this.setState({ videoId });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.clicked}>Fetch Youtub Video</button>
        {this.state.videoId.map((link, i) => {
          var frame = (
            <div key={i} className="youtube">
              <iframe
                width="560"
                height="315"
                src={link}
                frameBorder="0"
                allowFullScreen
              />
            </div>
          );
          return frame;
        })}
        {this.frame}
      </div>
    );
  }
}
