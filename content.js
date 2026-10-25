/*
  Edit this file to add or update showcase items.
  Supported types: text, image, video, youtube, audio.

  Local media paths are relative to index.html:
  images/example.jpg
  videos/example.mp4
  audio/example.mp3
*/

window.showcaseItems = [
  {
    type: "text",
    title: "Learning HTML",
    description: "HTML provides the structure of a web page. I am practicing semantic elements and organizing content so it is clear and accessible.",
    points: [
      "Use meaningful headings and sections.",
      "Build links and forms with labels.",
      "Keep page structure organized."
    ]
  },
  {
    type: "text",
    title: "Learning JavaScript",
    description: "JavaScript adds behavior to a website. I am practicing events, DOM updates, and small interactive features.",
    points: [
      "Respond to button clicks.",
      "Update page content with the DOM.",
      "Keep scripts organized and readable."
    ]
  }
  /*
  To add an IMAGE, place the file in the images folder and uncomment/edit:
  ,
  {
    type: "image",
    title: "My project screenshot",
    description: "A screenshot of a real project I built.",
    src: "images/project-screenshot.png",
    alt: "Screenshot of my project interface"
  }

  To add a VIDEO, place an MP4 file in the videos folder:
  ,
  {
    type: "video",
    title: "Project demo",
    description: "A short demonstration of my project.",
    src: "videos/project-demo.mp4"
  }

  To add a YOUTUBE video, replace VIDEO_ID with the ID from the YouTube URL:
  Example URL: https://www.youtube.com/watch?v=abc123XYZ
  The video ID is abc123XYZ.
  ,
  {
    type: "youtube",
    title: "My tutorial",
    description: "A helpful tutorial related to my learning.",
    videoId: "VIDEO_ID"
  }

  To add AUDIO, place an MP3 file in the audio folder:
  ,
  {
    type: "audio",
    title: "Audio example",
    description: "A short audio example.",
    src: "audio/example.mp3"
  }
  */
];
